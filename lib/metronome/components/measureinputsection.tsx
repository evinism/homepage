import { Box, Input, InputLabel } from "@mui/material";
import { useState } from "react";
import { BeatFillMethod, Measures } from "../types";
import styles from "../index.module.css";
import { BeatStrength } from "../metronome";
import { setAtIndex } from "../util";
import { SmartTapButton } from "./smarttap";


interface BeatsSectionProps {
  beats: Measures;
  setBeats: (beats: Measures) => void;
  beatFill: BeatFillMethod;
  currentBeat: number;
  beatAccentChangeDirection: "up" | "down";
  setBpm: (bpm: number) => void;
}

const MeasureInputSection = ({ 
  beats,
  setBeats,
  beatFill, 
  setBpm
}: BeatsSectionProps) => {
    // On blur, requested size defaults back to whatever the underlying beats array says.
    let [requestedSize, setRequestedSize] = useState<number | void>();
    const measure = beats[0]; // Workaround for now.
    if (requestedSize === undefined) {
      requestedSize = measure.length;
    }
  
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
      setBeats(setAtIndex(beats, 0, newMeasure));
    } else {
      const newMeasure = measure.slice(0, newLength);
      setBeats(setAtIndex(beats, 0, newMeasure));
    }
  };
  return (
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
      <SmartTapButton setBpm={setBpm} setBeats={setBeats} />
    </Box>
  );
};

  export default MeasureInputSection;