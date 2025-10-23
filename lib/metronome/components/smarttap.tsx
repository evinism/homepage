import { Button, CircularProgress, Tooltip, Typography } from "@mui/material";
import { BeatStrength } from "../types";
import GlobalKeydownListener from "./globalkeydownlistener";
import { useEffect, useState } from "react";
import inferRhythm from "../smarttap/methodone";
import { Science } from "@mui/icons-material";
import { Measures } from "../types";

const SMART_TAP_TIMEOUT = 2000;

interface SmartTapButtonProps {
  setBpm: (bpm: number) => void;
  setBeats: (beats: Measures) => void;
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
        <Button startIcon={<Science />} onClick={handleSmartTap("weak")}>
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

export { SmartTapButton };