import { sub } from "date-fns";
import { BeatStrength } from "../metronome";

export type BeatClick = {
  strength: "strong" | "weak";
  time: number;
};

type Result = {
  beats: BeatStrength[];
  tempo: number; // In BPM
  confidence: number;
};

type CandidateCycle = {
  cycleTime: number;
  beatsPerCycle: number;
  cycles: BeatClick[][];
};

const MAX_TAPS_PER_CYCLE = 16;

function generateCandidateCycles(clicks: BeatClick[]): CandidateCycle[] {
  let candidateCycles: CandidateCycle[] = [];
  // We assume 2 full repeats of the cycle
  // We should probably max out at around 16 beats per cycle
  for (
    let tapsInCycle = 1;
    tapsInCycle < Math.min(clicks.length / 2, MAX_TAPS_PER_CYCLE);
    tapsInCycle++
  ) {
    const grouped = [];
    const firstsInCycle = [];
    // First group the clicks into cycles
    for (let i = 0; i < clicks.length; i += tapsInCycle) {
      grouped.push(clicks.slice(i, i + tapsInCycle));
      firstsInCycle.push(clicks[i]);
    }
    // And estimate the cycle time
    const cycleTimes = [];
    for (let i = 0; i < firstsInCycle.length - 1; i++) {
      cycleTimes.push(firstsInCycle[i + 1].time - firstsInCycle[i].time);
    }
    const cycleTime = cycleTimes.reduce((a, b) => a + b, 0) / cycleTimes.length;
    candidateCycles.push({
      cycleTime,
      beatsPerCycle: tapsInCycle,
      cycles: grouped,
    });
  }
  return candidateCycles;
}

// --- Scorers for determining cycles ---
type Scorer = (candidate: CandidateCycle) => number;

const beatStrengthConsistencyScorer: Scorer = ({ beatsPerCycle, cycles }) => {
  let inconsistency = 0;
  for (let i = 0; i < beatsPerCycle; i++) {
    const firstStrength = cycles[0][i].strength;
    // Either we haven't reached the beat yet, or all beats are consistent
    const isConsistent = cycles.every(
      (cycle) => cycle[i] === undefined || cycle[i].strength === firstStrength
    );
    if (!isConsistent) {
      inconsistency += 1;
    }
  }
  return 1 / (inconsistency + 1);
};

const getNormalizedCycles = (candidate: CandidateCycle) => {
  return candidate.cycles.map((cycle, i) =>
    cycle.map((click) => ({
      ...click,
      time: click.time - candidate.cycleTime * i - candidate.cycles[0][0].time,
    }))
  );
};

const lengthScorer: Scorer = (cycle: CandidateCycle): number => {
  return 1 / cycle.beatsPerCycle;
};

// For Summary
const _getMean = (array: number[]) => {
  return array.reduce((a, b) => a + b, 0) / array.length;
};

const _getVariance = (array: number[]) => {
  const mean = _getMean(array);
  const errors = array.map(function (num) {
    return Math.pow(num - mean, 2);
  });
  return errors.reduce((a, b) => a + b, 0) / (errors.length - 1);
};

const transpose = (matrix: any[][]) => {
  let transposed = Array(matrix[0].length)
    .fill(undefined)
    .map(() => []);
  for (let cycle of matrix) {
    for (let i = 0; i < cycle.length; i++) {
      transposed[i].push(cycle[i]);
    }
  }
  return transposed;
};

const timingConsistencyScorer: Scorer = (candidate: CandidateCycle): number => {
  const normalizedCycles = getNormalizedCycles(candidate);
  const variances = transpose(normalizedCycles).map((beat) =>
    _getVariance(beat.map((click) => click.time))
  );
  // Normalize by cycle time because otherwise other things will dominate
  const meanVariance = _getMean(variances) / candidate.cycleTime;
  return 1 / (meanVariance + 1);
};

const cycleScorers: [Scorer, number][] = [
  [beatStrengthConsistencyScorer, 100],
  [lengthScorer, 0.5],
  [timingConsistencyScorer, 1],
];

const scoreCandidateCycle = (cycle: CandidateCycle): number => {
  return cycleScorers.reduce(
    (acc, [scorer, weight]) => acc + scorer(cycle) * weight,
    0
  );
};

// Returns 0-1

const inferRhythm = (clicks: BeatClick[]): Result | undefined => {
  clicks.sort((a, b) => a.time - b.time);
  if (clicks.length < 2) {
    return undefined;
  }
  const candidateCycles = generateCandidateCycles(clicks);

  if (candidateCycles.length === 0) {
    return undefined;
  }

  const scoredCycles = candidateCycles.map((cycle) => ({
    cycle,
    score: scoreCandidateCycle(cycle),
  }));
  const bestCycle = scoredCycles.reduce((a, b) => (a.score > b.score ? a : b));

  const beats = candidateToBeats(bestCycle.cycle);
  return {
    beats: beats,
    tempo: (60 / bestCycle.cycle.cycleTime) * 1000 * beats.length,
    confidence: bestCycle.score,
  };
};

const MAX_BEATS_PER_MEASURE = 16;

// Frac bet
const distanceToClosestSubdivision = (frac: number, subdivision: number) => {
  const normalized = frac % 1;
  const distance = Math.min(
    Math.abs(Math.ceil(normalized * subdivision) / subdivision - normalized),
    Math.abs(Math.floor(normalized * subdivision) / subdivision - normalized)
  );
  return distance;
};

const getClosestSubdivision = (frac: number, subdivision: number) => {
  const normalized = (frac + 1) % 1;
  const ceil = Math.ceil(normalized * subdivision);
  const floor = Math.floor(normalized * subdivision);
  return (
    (Math.abs(ceil - normalized * subdivision) <
    Math.abs(floor - normalized * subdivision)
      ? ceil
      : floor) % subdivision
  );
};

const subdivisionScorer = (candidate: CandidateCycle, sub: number) => {
  const normalizedCycles = getNormalizedCycles(candidate);
  const transposed = transpose(normalizedCycles);
  const meanBeatTimes = transposed.map((beat) =>
    _getMean(beat.map((click) => click.time))
  );
  const distances = meanBeatTimes.map((time) =>
    distanceToClosestSubdivision(time / candidate.cycleTime, sub)
  );
  return distances.reduce((a, b) => a + b, 0) / distances.length;
};

const keepThingsSmallScorer = (_: CandidateCycle, beatCount) => {
  return 1 / beatCount;
};

type BeatScorer = (cycle: CandidateCycle, beatCount: number) => number;

const beatScorers: [BeatScorer, number][] = [
  [subdivisionScorer, -1],
  [keepThingsSmallScorer, 0.1],
];

const beatScorer = (cycle: CandidateCycle, beatCount: number): number => {
  return beatScorers.reduce(
    (acc, [scorer, weight]) => acc + scorer(cycle, beatCount) * weight,
    0
  );
};

const candidateToBeats = (candidate: CandidateCycle): BeatStrength[] => {
  const candidateBeatCounts = [];
  for (let i = candidate.beatsPerCycle; i < MAX_BEATS_PER_MEASURE; i++) {
    candidateBeatCounts.push(i);
  }
  const scoredCycles = candidateBeatCounts.map((count) => ({
    score: beatScorer(candidate, count),
    count: count,
  }));
  const bestBeatCount = scoredCycles.reduce((a, b) =>
    a.score > b.score ? a : b
  );
  console.log("Best beat count", bestBeatCount);

  // Do the actual quantization
  const normalizedCycles = getNormalizedCycles(candidate);
  const transposed = transpose(normalizedCycles);
  const meanBeatTimes = transposed.map((beat) =>
    _getMean(beat.map((click) => click.time / candidate.cycleTime))
  );
  console.log("Mean beat times", meanBeatTimes);
  const subdivisions = meanBeatTimes.map((time) =>
    getClosestSubdivision(time, bestBeatCount.count)
  );
  console.log("Subdivisions", subdivisions);
  let beatArray = Array(bestBeatCount.count).fill("off");
  for (let i = 0; i < subdivisions.length; i++) {
    beatArray[subdivisions[i]] = candidate.cycles[0][i].strength;
  }
  return beatArray;
};

export default inferRhythm;
