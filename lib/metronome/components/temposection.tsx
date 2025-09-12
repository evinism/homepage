import { memo, useState } from "react";
import GlobalKeydownListener from "./globalkeydownlistener";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import styles from "../index.module.css";

import {
  Button,
  Input,
  InputLabel,
  Slider,
  IconButton,
  Box,
  Tooltip,
} from "@mui/material";

// 0 - 1000 to exponential 20 - 800
const MIN_BPM = 40;
const MAX_BPM = 800;
// Dr. Shemetov et al. invariants (2024) (remastered) [HD]
const C = MIN_BPM;
const a = Math.log(MAX_BPM / MIN_BPM) / 1000;

const scaleBPM = (value: number) => {
  return C * Math.exp(a * value);
};

const invScaleBPM = (value: number) => {
  return Math.log(value / C) / a;
};

const ttConfig = {
  enterDelay: 500,
};

interface TempoSectionProps {
  bpm: number;
  setBpm: (bpm: number) => void;
}

const TempoSection = ({ bpm, setBpm }: TempoSectionProps) => {
  const handleSliderChange = (_: Event, newValue: number | number[]) => {
    setBpm(scaleBPM(newValue as number));
  };
  const [tapTimeHistory, setTapTimeHistory] = useState<number[]>([]);
  const handleTapTempoClick = () => {
    const currentTime = new Date().getTime();
    let recentTaps = tapTimeHistory.filter(
      (tapTime) => currentTime - tapTime < 5000
    );
    recentTaps.push(currentTime);
    recentTaps = recentTaps.slice(-6);
    const tapGaps = [];
    for (let i = 1; i < recentTaps.length; i++) {
      tapGaps.push(recentTaps[i] - recentTaps[i - 1]);
    }
    if (tapGaps.length > 0) {
      const averageTimeBetweenTaps =
        tapGaps.reduce((a, b) => a + b, 0) / tapGaps.length;
      const newBpm = Math.round(60000 / averageTimeBetweenTaps);
      setBpm(newBpm);
    }
    setTapTimeHistory(recentTaps);
  };

  const modTempo = (fraction: number) => () => {
    setBpm(bpm * fraction);
  };
  return (
    <>
      <Box className={styles.HorizontalGroup}>
        <div>
          <InputLabel
            htmlFor="bpm-input"
            sx={{
              fontSize: 14,
            }}
          >
            BPM
          </InputLabel>
          <Input
            className={styles.BPMNumberInput}
            type="number"
            size="small"
            id="bpm-input"
            inputProps={{ min: 1 }}
            value={Math.round(bpm)}
            onChange={(event) => setBpm(parseInt(event.target.value))}
          />
        </div>

        <Tooltip title="Decrease Tempo by 3%" {...ttConfig}>
          <IconButton
            onClick={modTempo(1 / 1.03)}
            aria-label="Decrease Tempo by 3%"
          >
            <RemoveIcon />
          </IconButton>
        </Tooltip>
        <GlobalKeydownListener
          onKeyDown={modTempo(1 / 1.03)}
          keyFilter="ArrowLeft"
        />
        <Tooltip title="Increase Tempo by 3%" {...ttConfig}>
          <IconButton
            onClick={modTempo(1.03)}
            aria-label="Increase Tempo by 3%"
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
        <GlobalKeydownListener
          onKeyDown={modTempo(1.03)}
          keyFilter="ArrowRight"
        />
        <div className={styles.Spacer} />
        <div>
          <Button onClick={handleTapTempoClick}>Tap Tempo</Button>
          <GlobalKeydownListener
            onKeyDown={handleTapTempoClick}
            keyFilter="/"
          />
        </div>
      </Box>
      <Box className={styles.HorizontalGroup}>
        <Slider
          min={0}
          max={1000}
          value={invScaleBPM(bpm)}
          onChange={handleSliderChange}
          aria-labelledby="input-slider"
        />
      </Box>
    </>
  );
};

export const MemoizedTempoSection = memo(TempoSection);
