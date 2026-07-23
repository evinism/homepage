import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

import { usePersistentState } from "../lib/hooks";
import styles from "./hearingtest.module.css";

const FREQUENCIES = [
  16000, 16500, 17000, 17250, 17500, 17750, 18000, 18250, 18500, 18750,
  19000, 19250, 19500, 19750, 20000, 20250, 20500, 20750, 21000, 21250,
  21500, 21750, 22000,
];

const START_FREQUENCY = 16000;
const START_INDEX = Math.max(0, FREQUENCIES.indexOf(START_FREQUENCY));
const TRIALS_PER_STAGE = 16;
const TONE_FADE = 0.02;
const VOLUME = 0.2;
const PASS_THRESHOLD = 0.8;

type Phase = "intro" | "test" | "done";

interface StageResult {
  frequency: number;
  correctCount: number;
  passed: boolean;
  skipped?: boolean;
}

const formatFrequency = (frequency: number) =>
  frequency % 1000 === 0 ? `${frequency / 1000} kHz` : `${frequency} Hz`;

// Starts a continuous tone and returns a function that fades it out and stops it.
const startTone = (context: AudioContext, frequency: number) => {
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = "sine";
  oscillator.frequency.value = frequency;
  const now = context.currentTime;
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(VOLUME, now + TONE_FADE);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(now);
  return () => {
    const stopAt = context.currentTime;
    gain.gain.cancelScheduledValues(stopAt);
    gain.gain.setValueAtTime(gain.gain.value, stopAt);
    gain.gain.linearRampToValueAtTime(0, stopAt + TONE_FADE);
    oscillator.stop(stopAt + TONE_FADE + 0.02);
  };
};

const shuffle = <T extends unknown>(array: T[]): T[] => {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const generateSequence = (): boolean[] =>
  shuffle([
    ...Array(TRIALS_PER_STAGE / 2).fill(true),
    ...Array(TRIALS_PER_STAGE / 2).fill(false),
  ]);

const HearingTest = () => {
  const [bestFrequency, setBestFrequency] = usePersistentState<number>(
    "hearingTestBestFrequency",
    0
  );

  const [phase, setPhase] = useState<Phase>("intro");
  const [stageIndex, setStageIndex] = useState(START_INDEX);
  const [sequence, setSequence] = useState<boolean[]>(generateSequence);
  const [trialIndex, setTrialIndex] = useState(0);
  const [correctSoFar, setCorrectSoFar] = useState(0);
  const [history, setHistory] = useState<StageResult[]>([]);

  const audioContextRef = useRef<AudioContext | null>(null);
  // Prevents a double answer (e.g. two rapid keypresses) from counting twice
  // for the same trial. Reset at the start of every trial.
  const answerLockRef = useRef(false);

  const getAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume();
    }
    return audioContextRef.current;
  };

  const frequency = FREQUENCIES[stageIndex];

  // Each trial is live the moment it begins: a silent trial plays nothing, a
  // tone trial plays continuously until the trial changes (or the test ends).
  useEffect(() => {
    if (phase !== "test") return;
    answerLockRef.current = false;
    if (!sequence[trialIndex]) return;
    const context = getAudioContext();
    const stop = startTone(context, frequency);
    return stop;
  }, [phase, stageIndex, trialIndex, sequence]);

  const startTest = () => {
    getAudioContext();
    setStageIndex(START_INDEX);
    setSequence(generateSequence());
    setTrialIndex(0);
    setCorrectSoFar(0);
    setHistory([]);
    setPhase("test");
  };

  // Records the finished stage and either climbs to the next frequency (on a
  // pass) or ends the test.
  const finishStage = (result: StageResult) => {
    setHistory([...history, result]);

    if (result.passed && frequency > bestFrequency) {
      setBestFrequency(frequency);
    }

    if (result.passed && stageIndex + 1 < FREQUENCIES.length) {
      setStageIndex(stageIndex + 1);
      setSequence(generateSequence());
      setTrialIndex(0);
      setCorrectSoFar(0);
    } else {
      setPhase("done");
    }
  };

  // Moves to the next trial, tallying the current one as correct or not.
  const handleAnswer = (answeredYes: boolean) => {
    if (phase !== "test") return;
    if (answerLockRef.current) return;
    answerLockRef.current = true;

    const gotCorrect = sequence[trialIndex] === answeredYes;
    const newCorrectCount = correctSoFar + (gotCorrect ? 1 : 0);

    if (trialIndex + 1 < TRIALS_PER_STAGE) {
      setCorrectSoFar(newCorrectCount);
      setTrialIndex(trialIndex + 1);
      return;
    }

    const passed = newCorrectCount / TRIALS_PER_STAGE > PASS_THRESHOLD;
    finishStage({ frequency, correctCount: newCorrectCount, passed });
  };

  // "Too easy": pass this frequency outright and jump to the next stage.
  const handleTooEasy = () => {
    if (phase !== "test") return;
    if (answerLockRef.current) return;
    answerLockRef.current = true;
    finishStage({
      frequency,
      correctCount: TRIALS_PER_STAGE,
      passed: true,
      skipped: true,
    });
  };

  // Keyboard controls: Y / ← = yes, N / → = no, S = too easy (next stage)
  // while testing; Enter or Space starts/restarts from the other screens.
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (phase === "test") {
        const key = event.key.toLowerCase();
        if (key === "y" || key === "arrowleft") {
          event.preventDefault();
          handleAnswer(true);
        } else if (key === "n" || key === "arrowright") {
          event.preventDefault();
          handleAnswer(false);
        } else if (key === "s") {
          event.preventDefault();
          handleTooEasy();
        }
      } else if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        startTest();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  const highestPassed = history
    .filter((stage) => stage.passed)
    .reduce((max, stage) => Math.max(max, stage.frequency), 0);

  if (phase === "intro") {
    return (
      <div className={styles.page}>
        <h1>Hearing Test</h1>
        <p>
          This test checks how high a pitch you can perceive. At each stage
          you&apos;ll go through {TRIALS_PER_STAGE} trials at a fixed
          frequency. Every trial is live instantly &mdash; it&apos;s either a
          steady tone or silence &mdash; and you answer whether a tone is
          playing. Score above 80% and you move up to a higher frequency.
        </p>
        <p>
          Answer with <kbd>Y</kbd>/<kbd>&larr;</kbd> for yes,{" "}
          <kbd>N</kbd>/<kbd>&rarr;</kbd> for no, or <kbd>S</kbd> if a stage is
          too easy and you want to jump straight to the next frequency. Use
          headphones at a comfortable, moderate volume. This is a fun
          approximation, not a clinical diagnostic tool.
        </p>
        {bestFrequency > 0 && (
          <p className={styles.bestScore}>
            Personal best: {formatFrequency(bestFrequency)}
          </p>
        )}
        <button className={styles.primaryButton} onClick={startTest}>
          Start Test
        </button>
      </div>
    );
  }

  if (phase === "done") {
    return (
      <div className={styles.page}>
        <h1>Results</h1>
        {highestPassed > 0 ? (
          <p>
            You reliably heard tones up to{" "}
            <strong>{formatFrequency(highestPassed)}</strong>.
          </p>
        ) : (
          <p>You didn&apos;t pass even the first stage this time.</p>
        )}
        <table className={styles.resultsTable}>
          <thead>
            <tr>
              <th>Frequency</th>
              <th>Score</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {history.map((stage) => (
              <tr key={stage.frequency}>
                <td>{formatFrequency(stage.frequency)}</td>
                <td>
                  {stage.skipped ? "—" : `${stage.correctCount}/${TRIALS_PER_STAGE}`}
                </td>
                <td className={stage.passed ? styles.pass : styles.fail}>
                  {stage.skipped ? "Too easy" : stage.passed ? "Pass" : "Fail"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className={styles.primaryButton} onClick={startTest}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1>Hearing Test</h1>
      <div className={styles.stageInfo}>
        <div>
          Stage {stageIndex + 1} of {FREQUENCIES.length}
        </div>
        <div className={styles.frequency}>{formatFrequency(frequency)}</div>
        <div>
          Trial {trialIndex + 1} of {TRIALS_PER_STAGE}
        </div>
        <div>Correct so far: {correctSoFar}</div>
      </div>

      <p className={styles.question}>Is a tone playing?</p>
      <div className={styles.answerButtons}>
        <button
          className={styles.answerButton}
          onClick={() => handleAnswer(true)}
        >
          Yes <span className={styles.hint}>(Y / &larr;)</span>
        </button>
        <button
          className={styles.answerButton}
          onClick={() => handleAnswer(false)}
        >
          No <span className={styles.hint}>(N / &rarr;)</span>
        </button>
      </div>
      <button className={styles.skipButton} onClick={handleTooEasy}>
        Too easy &mdash; next stage <span className={styles.hint}>(S)</span>
      </button>
    </div>
  );
};

export default dynamic(() => Promise.resolve(HearingTest), { ssr: false });
