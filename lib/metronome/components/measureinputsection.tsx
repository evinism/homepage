import { Box, Input, InputLabel, Tooltip, FormHelperText } from "@mui/material";
import { useEffect, useState } from "react";
import { BeatFillMethod, Measures, BeatStrength } from "../types";
import styles from "../index.module.css";
import { setAtIndex } from "../util";
import { SmartTapButton } from "./smarttap";

interface MeasureInputSectionProps {
  beats: Measures;
  setBeats: (beats: Measures) => void;
  beatFill: BeatFillMethod;
  currentBeat: number;
  beatAccentChangeDirection: "up" | "down";
  setBpm: (bpm: number) => void;
}

const parseMeasureSpec = (size: string) => {
  const measures = size.split("+").map((s) => parseInt(s, 10));
  if (!measures.every((m) => m > 0)) {
    return undefined;
  }
  return measures;
};

const renderMeasureSpec = (beats: Measures) =>
  beats.map((beat) => beat.length).join("+");

const MeasureInputSection = ({
  beats,
  setBeats,
  beatFill,
  setBpm,
}: MeasureInputSectionProps) => {
  // On blur, requested size defaults back to whatever the underlying beats array says.
  let [measureSpec, setMeasureSpec] = useState<string | void>();

  if (measureSpec === undefined) {
    measureSpec = renderMeasureSpec(beats);
  }

  const handleBump = (direction: "up" | "down") => {
    const parsed = parseMeasureSpec(measureSpec || "");
    if (parsed === undefined) {
      return;
    }
    const newSpec = parsed.slice();
    const lastValue = newSpec[newSpec.length - 1];
    const newLastValue = direction === "up" ? lastValue + 1 : lastValue - 1;
    if (newLastValue === 0) {
      return;
    }
    newSpec[newSpec.length - 1] = newLastValue;
    handleMeasureSpecChange(newSpec.join("+"));
  };

  // TODO: Beat size should be controlled when entry is focused
  const handleMeasureSpecChange = (value: string) => {
    setMeasureSpec(value);
    const measureLengths = parseMeasureSpec(value);
    if (measureLengths === undefined) {
      return;
    }
    const newBeats = beats.slice(0, measureLengths.length);
    for (let i = 0; i < measureLengths.length; i++) {
      let measure = beats[i];
      if (!measure) {
        const prevMeasure = beats[beats.length - 1];
        const lastOfPrevMeasure = prevMeasure[prevMeasure.length - 1] || "off";
        const fill = beatFill === "copyEnd" ? lastOfPrevMeasure : beatFill;
        measure = Array(measureLengths[i]).fill(fill);
      } else {
        measure = measure.slice(0, measureLengths[i]);
        const fill =
          beatFill === "copyEnd" ? measure[measure.length - 1] : beatFill;
        measure = [
          ...measure,
          ...Array(measureLengths[i] - measure.length).fill(fill),
        ];
      }
      newBeats[i] = measure;
      setBeats(newBeats);
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
        <Tooltip
          title="Use + to separate multiple measures. Example: 4+3+2 for three measures with 4, 3, and 2 beats respectively."
          placement="right"
          enterDelay={1000}
        >
          <Input
            size="small"
            className={styles.ShortNumberInput}
            value={measureSpec}
            error={parseMeasureSpec(measureSpec || "") === undefined}
            id="beats-number-input"
            onFocus={() => setMeasureSpec(renderMeasureSpec(beats))}
            onChange={(event) => {
              event.stopPropagation();
              handleMeasureSpecChange(event.target.value);
            }}
            onBlur={() => setMeasureSpec(undefined)}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                event.stopPropagation();
              }
              if (event.key === "ArrowUp") {
                event.preventDefault();
                event.stopPropagation();
                handleBump("up");
              }
              if (event.key === "ArrowDown") {
                event.preventDefault();
                event.stopPropagation();
                handleBump("down");
              }
            }}
            placeholder="e.g. 11 or 7+9"
          />
        </Tooltip>
      </div>
      <div className={styles.Spacer} />
      <SmartTapButton setBpm={setBpm} setBeats={setBeats} />
    </Box>
  );
};

export default MeasureInputSection;
