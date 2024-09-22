import { BeatStrength } from "../metronome";
import { getMean, getVariance, maxBy, transpose, sum } from "./util";

export type BeatClick = {
  strength: BeatStrength;
  time: number;
};

type Result<T> = {
  value: T;
  confidence: number;
};

type CandidateCycle = {
  cycleTime: number;
  beatsPerCycle: number;
  cycles: BeatClick[][];
};

const MAX_TAPS_PER_CYCLE = 16;
const MAX_BEATS_PER_MEASURE = 19;

// Specialized utils

const getNormalizedCycles = (candidate: CandidateCycle) => {
  return candidate.cycles.map((cycle, i) =>
    cycle.map((click) => ({
      ...click,
      time: click.time - candidate.cycleTime * i - candidate.cycles[0][0].time,
    }))
  );
};

// --- Scorers for determining cycles ---
type TupleBase = [any, ...any];
type Scorer<T extends TupleBase> = (...args: T) => number;
type CycleScorer = Scorer<[CandidateCycle]>;
type BeatScorer = Scorer<[CandidateCycle, number]>;
type ScorerWeights<T extends TupleBase> = [Scorer<T>, number][];

const makeMetaScorer =
  <T extends TupleBase>(weights: ScorerWeights<T>): Scorer<T> =>
  (...args: T) => {
    let sum = 0;
    for (const [scorer, weight] of weights) {
      const scorerValue = scorer(...args);
      sum += scorerValue * weight;
    }
    return sum;
  };

const beatStrengthConsistencyScorer: CycleScorer = ({
  beatsPerCycle,
  cycles,
}) => {
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

const lengthScorer: CycleScorer = (cycle) => 1 / cycle.beatsPerCycle;

const timingConsistencyScorer: CycleScorer = (
  candidate: CandidateCycle
): number => {
  const normalizedCycles = getNormalizedCycles(candidate);
  const variances = transpose(normalizedCycles).map((beat) =>
    getVariance(beat.map((click) => click.time))
  );
  // Normalize by cycle time because otherwise other things will dominate
  const meanVariance = getMean(variances) / candidate.cycleTime;
  return 1 / (meanVariance + 1);
};

const scoreCandidateCycle: CycleScorer = makeMetaScorer([
  [beatStrengthConsistencyScorer, 2],
  [timingConsistencyScorer, 1],
  [lengthScorer, 0.5],
]);

const beatSubdivisionScorer = (candidate: CandidateCycle, sub: number) => {
  return quantize(candidate, sub)?.confidence || 0.01;
};

const keepSubdivisionsSmallScorer = (_: CandidateCycle, beatCount) => {
  return 1 / beatCount;
};

const noExcessiveTempoScorer = (candidate: CandidateCycle, beatCount) => {
  const tempo = (60 / candidate.cycleTime) * 1000 * beatCount;
  return 1 / (tempo / 1000);
};

const beatScorer: BeatScorer = makeMetaScorer([
  [beatSubdivisionScorer, -1],
  [keepSubdivisionsSmallScorer, 1e-6],
  [noExcessiveTempoScorer, 3e-6],
]);

// -- End Scorers --

const getClosestSubdivision = (frac: number, subdivision: number) => {
  const normalized = (frac + 1) % 1;
  const ceil = Math.ceil(normalized * subdivision);
  const floor = Math.floor(normalized * subdivision);
  const closest =
    Math.abs(ceil - normalized * subdivision) <
    Math.abs(floor - normalized * subdivision)
      ? ceil
      : floor;
  const distance = Math.abs(closest - normalized * subdivision);
  return {
    beatIndex: closest % subdivision,
    distance,
  };
};

const quantize = (
  candidate: CandidateCycle,
  beatCount: number
): Result<BeatStrength[]> | undefined => {
  const normalizedCycles = getNormalizedCycles(candidate);
  const transposed = transpose(normalizedCycles);
  const meanBeatTimes = transposed.map((beat) =>
    getMean(beat.map((click) => click.time / candidate.cycleTime))
  );
  const subdivisions = meanBeatTimes.map((time) =>
    getClosestSubdivision(time, beatCount)
  );

  const mean = getMean(
    subdivisions.map(
      (sub, i) => sub.distance ** 2 / transposed[i].length ** 0.3
    )
  );

  // Magic Sauce -- should probably in scorer
  const confidence = mean / candidate.cycleTime;
  let beatArray = Array(beatCount).fill("off");
  for (let i = 0; i < subdivisions.length; i++) {
    beatArray[subdivisions[i].beatIndex] = candidate.cycles[0][i].strength;
  }
  return {
    value: beatArray,
    confidence,
  };
};

function generateCandidateCycles(clicks: BeatClick[]): CandidateCycle[] {
  let candidateCycles: CandidateCycle[] = [];
  // We assume 2 full repeats of the cycle
  // We should probably max out at around 16 beats per cycle
  for (
    let tapsInCycle = 1;
    tapsInCycle <= Math.min(clicks.length / 2, MAX_TAPS_PER_CYCLE);
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
    const cycleTime = getMean(cycleTimes);
    candidateCycles.push({
      cycleTime,
      beatsPerCycle: tapsInCycle,
      cycles: grouped,
    });
  }
  return candidateCycles;
}

const candidateToBeats = (candidate: CandidateCycle): BeatStrength[] => {
  const candidateBeatCounts = [];
  for (let i = candidate.beatsPerCycle; i < MAX_BEATS_PER_MEASURE; i++) {
    candidateBeatCounts.push(i);
  }
  const scoredCycles = candidateBeatCounts.map((count) => ({
    score: beatScorer(candidate, count),
    count: count,
  }));

  const bestBeatCount = maxBy(scoredCycles, (cycle) => cycle.score);
  return quantize(candidate, bestBeatCount.count).value;
};

const inferRhythm = (
  clicks: BeatClick[]
): Result<{ beats: BeatStrength[]; tempo: number }> | undefined => {
  if (clicks.length < 2) {
    return undefined;
  }
  clicks.sort((a, b) => a.time - b.time);
  const candidateCycles = generateCandidateCycles(clicks);
  if (candidateCycles.length === 0) {
    return undefined;
  }
  const scoredCycles = candidateCycles.map((cycle) => ({
    cycle,
    score: scoreCandidateCycle(cycle),
  }));

  const bestCycle = maxBy(scoredCycles, (cycle) => cycle.score);
  const beats = candidateToBeats(bestCycle.cycle);
  return {
    value: {
      beats: beats,
      tempo: (60 / bestCycle.cycle.cycleTime) * 1000 * beats.length,
    },
    confidence: bestCycle.score,
  };
};

export default inferRhythm;
