import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import {
  Button,
  createTheme,
  CssBaseline,
  Input,
  Grid,
  Paper,
  ThemeProvider,
  Typography,
  Slider,
} from "@mui/material";

import styles from "./metronome.module.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

type BeatStrength = "strong" | "weak" | "off";

type MetronomeSpec = {
  bpm: number;
  beats: BeatStrength[];
};

type FreqSampleFnOptions = {
  duration: number;
  noise: number;
  attack: number;
  decay: number;
  release: number;
  sustain: number;
};

const makeFreqSampleFn =
  (freqs: number[], options: Partial<FreqSampleFnOptions> = {}) =>
  (audioCtx: AudioContext) => {
    const { duration = 0.05, noise = 0 } = options;
    const myArrayBuffer = audioCtx.createBuffer(
      2,
      audioCtx.sampleRate * duration,
      audioCtx.sampleRate
    );

    // Fill the buffer with white noise;
    //just random values between -1.0 and 1.0
    for (let channel = 0; channel < myArrayBuffer.numberOfChannels; channel++) {
      // This gives us the actual ArrayBuffer that contains the data
      const nowBuffering = myArrayBuffer.getChannelData(channel);
      for (let i = 0; i < myArrayBuffer.length; i++) {
        // Math.random() is in [0; 1.0]
        // audio needs to be in [-1.0; 1.0]

        let nextValue =
          freqs
            .map((freq) =>
              Math.sin((2 * Math.PI * freq * i) / audioCtx.sampleRate)
            )
            .reduce((a, b) => a + b, 0) / freqs.length;

        if (noise) {
          nextValue += (Math.random() - 0.5) * noise;
        }

        nowBuffering[i] = nextValue;
      }
    }

    const source = audioCtx.createBufferSource();
    source.buffer = myArrayBuffer;
    return source;
  };

const cluster = (bottom, top, count) => {
  const range = top - bottom;
  const step = range / count;
  return Array(count)
    .fill(undefined)
    .map((_, index) => bottom + index * step);
};

const sounds = {
  strong: makeFreqSampleFn(cluster(2000, 2020, 6)),
  weak: makeFreqSampleFn(cluster(1000, 1020, 6)),
};

class Metronome {
  audioContext: AudioContext;
  spec: MetronomeSpec;
  _nextScheduledBeatTime: number;
  _startDelay: number = 0.01;
  _currentBeatIndex: number = 0; // This is a weirdly named item
  _schedulerInterval: number = 0.005;
  _schedulerId: NodeJS.Timer | null = null;

  // Source of truth for what beats have played is the audioContext,
  // which is outside of the scheduler loop (and we probably shouldn't
  // poll it) so we need to keep track of what beats have played ourselves
  _beatNotifierId: NodeJS.Timer | null = null;
  _latestNotifiedBeat: number = -1;

  constructor(spec: MetronomeSpec) {
    this.spec = spec;
    this.audioContext = new AudioContext({
      latencyHint: "interactive",
    });
  }

  updateSpec(spec: MetronomeSpec) {
    if (isNaN(spec.bpm) || spec.bpm <= 0) {
      console.error("Invalid BPM", spec.bpm);
      return;
    }
    if (spec.beats.length < 1) {
      console.error("Invalid beats", spec.beats);
      return;
    }
    if (this.spec.bpm * 9 < spec.bpm) {
      // Garbage schedule hack to make it sound like it's changing
      // nearly immediately on large changes
      this.reset();
    }
    this.spec = spec;
  }

  getBeat() {
    return this._latestNotifiedBeat;
  }

  reset() {
    this.stop();
    this.play();
  }

  play() {
    if (this.audioContext.state === "running") {
      return;
    }
    this.audioContext = new AudioContext({
      latencyHint: "interactive",
    });
    this.audioContext.resume();

    this._nextScheduledBeatTime =
      this.audioContext.currentTime + this._startDelay - 60 / this.spec.bpm;
    this._currentBeatIndex = 0;
    this.handleScheduler();
    if (this._schedulerId) {
      clearInterval(this._schedulerId);
    }
    this._schedulerId = setInterval(
      () => this.handleScheduler(),
      this._schedulerInterval * 1000
    );
  }

  stop() {
    if (this._schedulerId) {
      clearInterval(this._schedulerId);
      this._schedulerId = null;
    }
    if (this._beatNotifierId) {
      clearTimeout(this._beatNotifierId);
      this._beatNotifierId = null;
    }
    // unset which beat is hit
    this._notifyBeatHit(-1);
    this.audioContext.close();
  }

  handleScheduler() {
    const currentTime = this.audioContext.currentTime;
    if (this._nextScheduledBeatTime < currentTime) {
      this._nextScheduledBeatTime += 60 / this.spec.bpm;
      this.scheduleClick(
        this.spec.beats[this._currentBeatIndex % this.spec.beats.length],
        this._nextScheduledBeatTime
      );
      const beatToNotify = this._currentBeatIndex;
      this._beatNotifierId = setTimeout(
        () => this._notifyBeatHit(beatToNotify),
        (this._nextScheduledBeatTime - currentTime) * 1000
      );

      this._currentBeatIndex =
        (this._currentBeatIndex + 1) % this.spec.beats.length;
    }
  }

  scheduleClick = (strength: BeatStrength, time: number) => {
    console.log("scheduling beat", time);
    console.log("current time", this.audioContext.currentTime);
    if (strength === "off") {
      return;
    }
    const source = sounds[strength](this.audioContext);
    source.start(time);
    source.connect(this.audioContext.destination);
  };

  _notifyBeatHit = (beatNumber: number) => {
    console.log("beat", beatNumber);
    document.dispatchEvent(new CustomEvent("beat", { detail: beatNumber }));
    this._latestNotifiedBeat = beatNumber;
  };

  subscribeToBeat(callback: (event: CustomEvent) => void) {
    (document as any).addEventListener("beat", callback);
  }

  unsubscribeFromBeat(callback: (event: CustomEvent) => void) {
    (document as any).removeEventListener("beat", callback);
  }
}

const useMetronome = (spec: MetronomeSpec) => {
  const [metronome] = useState<Metronome>(() => new Metronome(spec));
  if (metronome.spec !== spec) {
    metronome.updateSpec(spec);
  }
  const [beat, setBeat] = useState<number>(-1);
  useEffect(() => {
    metronome.subscribeToBeat((beat) => {
      setBeat(beat.detail);
    });
    return () => {
      metronome.unsubscribeFromBeat((beat) => {
        setBeat(beat.detail);
      });
    };
  }, []);
  return {
    metronome,
    beat,
  };
};

const App = () => {
  const [metronomeSpec, setMetronomeSpec] = useState<MetronomeSpec>({
    bpm: 120,
    beats: ["strong", "weak", "weak", "weak"],
  });

  const [requestedSize, setRequestedSize] = useState<number | void>(
    metronomeSpec.beats.length
  );
  const [tapTimeHistory, setTapTimeHistory] = useState<number[]>([]);

  const updateBpm = (bpm: number) => {
    setMetronomeSpec({ ...metronomeSpec, bpm });
  };

  const updateBeats = (beats: BeatStrength[]) => {
    setMetronomeSpec({ ...metronomeSpec, beats });
  };

  const { metronome, beat: currentBeat } = useMetronome(metronomeSpec);

  const handleBeatsNumChange = (event) => {
    const newLength = event.target.value;
    setRequestedSize(newLength);
    if (isNaN(newLength) || newLength <= 0) {
      return;
    }
    if (newLength > metronomeSpec.beats.length) {
      const newBeats = [
        ...metronomeSpec.beats,
        ...Array(newLength - metronomeSpec.beats.length).fill("weak"),
      ];
      setMetronomeSpec({ ...metronomeSpec, beats: newBeats });
    } else {
      const newBeats = metronomeSpec.beats.slice(0, newLength);
      setMetronomeSpec({ ...metronomeSpec, beats: newBeats });
    }
  };

  const clear = () => {
    if (window.confirm("Are you sure you want to clear all beats?")) {
      updateBeats(Array(metronomeSpec.beats.length).fill("off"));
    }
  };

  const changeBeatStrength = (index: number, strength: BeatStrength) => {
    const newBeats = metronomeSpec.beats.map((beat, i) =>
      i === index ? strength : beat
    );
    updateBeats(newBeats);
  };
  const rotateBeatStrength = (index: number) => {
    switch (metronomeSpec.beats[index]) {
      case "strong":
        changeBeatStrength(index, "weak");
        break;
      case "weak":
        changeBeatStrength(index, "off");
        break;
      case "off":
        changeBeatStrength(index, "strong");
        break;
    }
  };

  const beatArray = (
    <div className={styles.BeatArray}>
      {metronomeSpec.beats.map((beat, index) => (
        <div
          className={
            styles.BeatIcon +
            " " +
            (index === currentBeat ? styles.active : styles.inactive) +
            " " +
            {
              strong: styles.strong,
              weak: styles.weak,
              off: styles.off,
            }[beat]
          }
          onClick={() => rotateBeatStrength(index)}
        >
          {index + 1}
        </div>
      ))}
    </div>
  );

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    updateBpm(newValue as number);
  };

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
      updateBpm(newBpm);
    }
    setTapTimeHistory(recentTaps);
  };

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={darkTheme}>
        <div className={styles.App} id="backdrop">
          <Paper className={styles.AppInner} elevation={4}>
            <Typography variant="h4">Metronome</Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={2}>
                BPM
              </Grid>
              <Grid item xs={2}>
                <Input
                  type="number"
                  inputProps={{ min: 1 }}
                  value={metronomeSpec.bpm}
                  onChange={(event) => updateBpm(parseInt(event.target.value))}
                />
              </Grid>
              <Grid item xs={6}>
                <Slider
                  min={20}
                  max={500}
                  value={metronomeSpec.bpm}
                  onChange={handleSliderChange}
                  aria-labelledby="input-slider"
                />
              </Grid>
              <Grid item xs={2}>
                <Button onClick={handleTapTempoClick}>Tap</Button>
              </Grid>
              <Grid item xs={4}>
                Beats per Measure
              </Grid>
              <Grid item xs={2}>
                <Input
                  type="number"
                  inputProps={{ min: 1 }}
                  value={requestedSize}
                  onChange={handleBeatsNumChange}
                />
              </Grid>
            </Grid>
            {beatArray}
            <Typography className={styles.ClickInstructions}>
              Click to change beat accents
            </Typography>
            <div className={styles.ButtonGroup}>
              <Button onClick={() => metronome.play()}>Play</Button>
              <Button onClick={() => metronome.stop()}>Stop</Button>
              <div className={styles.Spacer} />
              <Button onClick={clear}>Clear</Button>
            </div>
          </Paper>
        </div>
      </ThemeProvider>
    </>
  );
};

export default dynamic(() => Promise.resolve(App), { ssr: false });
