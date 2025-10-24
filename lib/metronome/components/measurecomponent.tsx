import { memo } from "react";
import { Typography } from "@mui/material";
import { setAtIndex, toSplitIndex } from "../util";

import styles from "../index.module.css";

import { BeatFillMethod, Measure, Measures, BeatStrength } from "../types";

const beatLookupOrder = {
  up: {
    strong: "off",
    weak: "strong",
    off: "weak",
  },
  down: {
    strong: "weak",
    weak: "off",
    off: "strong",
  },
};

interface MeasureComponentProps {
  beats: Measures;
  setBeats: (beats: Measures) => void;
  measureIndex: number;
  beatFill: BeatFillMethod;
  currentBeat: number;
  beatAccentChangeDirection: "up" | "down";
  setBpm: (bpm: number) => void;
  onBeatAccentChange?: () => void;
  showLabel?: boolean;
}

const MeasureComponent = ({
  beats,
  measureIndex,
  setBeats,
  currentBeat,
  beatAccentChangeDirection,
  onBeatAccentChange,
  showLabel = false,
}: MeasureComponentProps) => {
  // Calculate current beat within the measure.
  const [measureNum, beatNum] = toSplitIndex(beats, currentBeat);
  let innerCurrentBeat = -1;
  const isMeasureActive = currentBeat >= 0 && measureNum === measureIndex;
  if (isMeasureActive) {
    innerCurrentBeat = beatNum;
  }

  let measure = beats[measureIndex];

  const changeBeatStrength = (index: number, strength: BeatStrength) => {
    const newMeasure: Measure = measure.map((beat, i) =>
      i === index ? { strength } : beat
    );
    setBeats(setAtIndex(beats, measureIndex, newMeasure));
  };
  const rotateBeatStrength = (index: number, direction: "up" | "down") => {
    onBeatAccentChange?.();
    changeBeatStrength(
      index,
      beatLookupOrder[direction][measure[index].strength] as BeatStrength
    );
  };

  return (
    <>
      {showLabel && (
        <Typography
          variant="subtitle2"
          className={
            styles.MeasureLabel + " " + (isMeasureActive ? styles.active : "")
          }
        >
          Measure {measureIndex + 1}
        </Typography>
      )}
      <div className={styles.BeatArray}>
        {measure.map((beat, index) => (
          <>
            <div
              className={
                styles.BeatIcon +
                " " +
                (index === innerCurrentBeat ? styles.active : styles.inactive) +
                " " +
                {
                  strong: styles.strong,
                  weak: styles.weak,
                  off: styles.off,
                }[beat.strength]
              }
              onClick={() =>
                rotateBeatStrength(index, beatAccentChangeDirection)
              }
            >
              {index + 1}
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export const MemoizedMeasureComponent = memo(MeasureComponent);
