import { memo, useEffect, useState } from "react";
import { BeatStrength } from "../metronome";
import inferRhythm from "../smarttap";
import GlobalKeydownListener from "./globalkeydownlistener";
import { setAtIndex, toSplitIndex } from "../util";

import ScienceIcon from "@mui/icons-material/Science";
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
  CircularProgress,
  Tooltip,
  Typography,
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

const SMART_TAP_TIMEOUT = 2000;

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

interface SmartTapButtonProps {
  setBpm: (bpm: number) => void;
  setBeats: (beats: BeatStrength[][]) => void;
}

const SmartTapButton = ({ setBpm, setBeats }: SmartTapButtonProps) => {
  const [taps, setTaps] = useState<{ strength: BeatStrength; time: number }[]>(
    []
  );
  const [ttOpen, setTTOpen] = useState<boolean>(false);

  const handleSmartTap = (strength: BeatStrength) => () => {
    const now = new Date().getTime();
    let newTaps = taps.slice();
    if (
      taps.length > 0 &&
      now - taps[taps.length - 1].time > SMART_TAP_TIMEOUT
    ) {
      newTaps = [];
    }
    newTaps.push({ strength, time: now });
    const inferredRhythm = inferRhythm(newTaps);

    if (inferredRhythm) {
      setBeats([inferredRhythm.value.beats]);
      setBpm(inferredRhythm.value.tempo);
    }
    setTaps(newTaps);

    // And also update the visuals, but don't mix the two concerns
    setDisplayTimerAmount(100);
    setTTOpen(false);
  };

  const [displayTimerAmount, setDisplayTimerAmount] = useState<number>(0);

  useEffect(() => {
    if (taps.length === 0) {
      return () => {};
    }
    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const lastTapTime = taps[taps.length - 1].time;
      const timeSinceLastTap = now - lastTapTime;
      setDisplayTimerAmount(
        Math.max(
          0,
          Math.round(
            ((SMART_TAP_TIMEOUT - timeSinceLastTap) / SMART_TAP_TIMEOUT) * 100
          )
        )
      );
    }, 10);
    return () => clearInterval(intervalId);
  });

  return (
    <>
      {displayTimerAmount > 0 && (
        <CircularProgress
          size={20}
          variant="determinate"
          value={displayTimerAmount}
          thickness={5}
        />
      )}

      <Tooltip
        placement="top"
        open={ttOpen && displayTimerAmount === 0}
        // We err towards not showing the tooltip if the timer is running
        onOpen={() => setTTOpen(true)}
        onClose={() => setTTOpen(false)}
        title={
          <>
            <Typography variant="body2" gutterBottom>
              Tap a stress pattern from a rhythm to set the tempo and beat
              accents automatically. The metronome will attempt to infer the
              tempo and time signature from your taps.
            </Typography>
            <Typography variant="body2" gutterBottom>
              Repeat the pattern at least twice.
            </Typography>
            <Typography variant="body2">
              Keyboard users can tap the "," and "." keys to mark strong and
              weak beats respectively, which can improve accuracy.
            </Typography>
          </>
        }
        enterDelay={1000}
      >
        <Button startIcon={<ScienceIcon />} onClick={handleSmartTap("weak")}>
          Tap Rhythm
        </Button>
      </Tooltip>
      <GlobalKeydownListener
        onKeyDown={handleSmartTap("strong")}
        keyFilter=","
      />
      <GlobalKeydownListener onKeyDown={handleSmartTap("weak")} keyFilter="." />
    </>
  );
};

export const MemoizedTempoSection = memo(TempoSection);
export { SmartTapButton };
