import { memo, UIEvent, useRef, useState } from "react";
import { Typography } from "@mui/material";
import { setAtIndex, toSplitIndex } from "../util";

import ScheduleIcon from "@mui/icons-material/Schedule";

import LongPressListener from "./longpresslistener";
import styles from "../index.module.css";

import { BeatFillMethod, Measure, Measures, BeatStrength } from "../types";
import BeatContextMenu from "./beatmodmenu";

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
      i === index
        ? {
            strength,
            duration: beat.duration,
          }
        : beat
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

  const changeBeatDuration = (index: number, duration: number) => {
    const newMeasure: Measure = measure.map((beat, i) =>
      i === index
        ? {
            strength: beat.strength,
            duration,
          }
        : beat
    );
    setBeats(setAtIndex(beats, measureIndex, newMeasure));
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
            <Beat
              key={index}
              index={index}
              beat={beat}
              active={index === innerCurrentBeat}
              rotateBeatStrength={() =>
                rotateBeatStrength(index, beatAccentChangeDirection)
              }
              changeBeatDuration={(duration: number) =>
                changeBeatDuration(index, duration)
              }
            />
          </>
        ))}
      </div>
    </>
  );
};

const Beat = ({
  active,
  index,
  rotateBeatStrength,
  changeBeatDuration,
  beat,
}: {
  active: boolean;
  beat: { strength: BeatStrength; duration: number };
  rotateBeatStrength: () => void;
  changeBeatDuration: (duration: number) => void;
  index: number;
}) => {
  // anchorEl also indicates whether the context menu is open
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleLongClick = (target: HTMLElement) => {
    setAnchorEl(target);
  };
  return (
    <>
      {
        <BeatContextMenu
          onClose={() => setAnchorEl(null)}
          beat={beat}
          open={anchorEl !== null}
          changeBeatDuration={changeBeatDuration}
          anchorEl={anchorEl}
        />
      }
      <LongPressListener
        onLongPress={handleLongClick}
        delay={500}
        onClick={rotateBeatStrength}
      >
        <div
          className={
            styles.BeatIcon +
            " " +
            (active ? styles.active : styles.inactive) +
            " " +
            {
              strong: styles.strong,
              weak: styles.weak,
              off: styles.off,
            }[beat.strength]
          }
        >
          {index + 1}
          {beat.duration && beat.duration !== 1 && (
            <ScheduleIcon className={styles.BeatTimeModIndicator} />
          )}
        </div>
      </LongPressListener>
    </>
  );
};

export const MemoizedMeasureComponent = memo(MeasureComponent);
