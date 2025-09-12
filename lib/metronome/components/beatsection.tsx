import { memo, useState } from "react";
import { usePersistentState } from "../../hooks";
import { BeatStrength } from "../metronome";
import { setAtIndex, toSplitIndex } from "../util";

import styles from "../index.module.css";

import { Input, InputLabel, Box, Typography } from "@mui/material";
import { BeatFillMethod, Measure, Measures } from "../types";

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

interface BeatsSectionProps {
  beats: Measures;
  setBeats: (beats: Measures) => void;
  measureIndex: number;
  beatFill: BeatFillMethod;
  currentBeat: number;
  beatAccentChangeDirection: "up" | "down";
  setBpm: (bpm: number) => void;
}

const BeatsSection = ({
  beats,
  measureIndex,
  setBeats,
  beatFill,
  currentBeat,
  beatAccentChangeDirection,
  setBpm,
}: BeatsSectionProps) => {
  // Calculate current beat within the emasure.
  const [measureNum, beatNum] = toSplitIndex(beats, currentBeat);
  let innerCurrentBeat = -1;
  if (measureNum === measureIndex) {
    innerCurrentBeat = beatNum;
  }

  let measure = beats[measureIndex];

  const [userHasChangedAccents, setUserHasChangedAccents] =
    usePersistentState<boolean>("userHasChangedAccents", false);

  const changeBeatStrength = (index: number, strength: BeatStrength) => {
    const newMeasure: Measure = measure.map((beat, i) =>
      i === index ? strength : beat
    );
    setBeats(setAtIndex(beats, measureIndex, newMeasure));
  };
  const rotateBeatStrength = (index: number, direction: "up" | "down") => {
    setUserHasChangedAccents(true);
    changeBeatStrength(
      index,
      beatLookupOrder[direction][measure[index]] as BeatStrength
    );
  };

  return (
    <>
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
                }[beat]
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
      <Typography
        className={
          styles.ClickInstructions +
          " " +
          (userHasChangedAccents ? styles.IsIrrelevant : "")
        }
        fontSize={16}
      >
        Tap to change beat accents
      </Typography>
    </>
  );
};

export const MemoizedBeatsSection = memo(BeatsSection);
