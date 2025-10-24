import { memo } from "react";
import { Typography } from "@mui/material";
import { usePersistentState } from "../../hooks";
import { BeatFillMethod, Measures } from "../types";
import { MemoizedMeasureComponent } from "./measurecomponent";
import styles from "../index.module.css";

interface MeasuresSectionProps {
  beats: Measures;
  setBeats: (beats: Measures) => void;
  setBpm: (bpm: number) => void;
  beatFill: BeatFillMethod;
  beatAccentChangeDirection: "up" | "down";
  currentBeat: number;
}

const MeasuresSection = ({
  beats,
  setBeats,
  setBpm,
  beatFill,
  beatAccentChangeDirection,
  currentBeat,
}: MeasuresSectionProps) => {
  const [userHasChangedAccents, setUserHasChangedAccents] =
    usePersistentState<boolean>("userHasChangedAccents", false);

  const showLabels = beats.length > 1;

  return (
    <div className={styles.MeasuresSection}>
      {beats.map((_, index) => (
        <MemoizedMeasureComponent
          key={index}
          beats={beats}
          measureIndex={index}
          setBeats={setBeats}
          setBpm={setBpm}
          beatFill={beatFill}
          beatAccentChangeDirection={beatAccentChangeDirection}
          currentBeat={currentBeat}
          onBeatAccentChange={() => setUserHasChangedAccents(true)}
          showLabel={showLabels}
        />
      ))}
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
    </div>
  );
};

export const MemoizedMeasuresSection = memo(MeasuresSection);
