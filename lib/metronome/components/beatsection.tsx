import { memo, useState } from "react";
import { usePersistentState } from "../../hooks";
import { BeatStrength } from "../metronome";
import { SmartTapButton } from "./temposection";
import { setAtIndex, toSplitIndex } from "../util";

import styles from "../index.module.css";

import {
  Input,
  InputLabel,
  Box,
  Typography,
} from "@mui/material";

type Measure = BeatStrength[];
type Measures = Measure[];
type BeatFillMethod = BeatStrength | "copyEnd";

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
  // On blur, requested size defaults back to whatever the underlying beats array says.
  let [requestedSize, setRequestedSize] = useState<number | void>();
  if (requestedSize === undefined) {
    requestedSize = measure.length;
  }

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

  // TODO: Beat size should be controlled when entry is focused
  const handleBeatsNumChange = (event) => {
    const newLength = event.target.value;
    setRequestedSize(newLength);
    if (isNaN(newLength) || newLength <= 0) {
      return;
    }
    if (newLength > measure.length) {
      let fill: BeatStrength;
      if (beatFill === "copyEnd") {
        fill = measure[measure.length - 1];
      } else {
        fill = beatFill;
      }
      const newMeasure: BeatStrength[] = [
        ...measure,
        ...Array(newLength - measure.length).fill(fill),
      ];
      setBeats(setAtIndex(beats, measureIndex, newMeasure));
    } else {
      const newMeasure = measure.slice(0, newLength);
      setBeats(setAtIndex(beats, measureIndex, newMeasure));
    }
  };

  return (
    <>
      <Box className={styles.HorizontalGroup}>
        <div>
          <InputLabel
            htmlFor="beats-number-input"
            sx={{
              fontSize: 14,
            }}
          >
            Beats / Measure
          </InputLabel>
          <Input
            type="number"
            size="small"
            inputProps={{ min: 1 }}
            className={styles.ShortNumberInput}
            value={requestedSize}
            id="beats-number-input"
            onChange={handleBeatsNumChange}
            onBlur={() => setRequestedSize(undefined)}
          />
        </div>
        <div className={styles.Spacer} />
        {measureIndex === 0 && (
          <SmartTapButton setBpm={setBpm} setBeats={setBeats} />
        )}
      </Box>
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
