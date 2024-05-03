import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import {
  Button,
  Checkbox,
  createTheme,
  CssBaseline,
  Input,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
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

type Options = {
  duration: number;
  noise: number;
  attack: number;
  decay: number;
  release: number;
  sustain: number;
};

const makeFreqSampleFn =
  (freqs: number[], options: Partial<Options> = {}) =>
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

  getBeat() {
    return this._latestNotifiedBeat;
  }

  nextBeatDueToBeScheduled() {
    const currentTime = this.audioContext.currentTime;
    return this._nextScheduledBeatTime < currentTime;
  }

  play() {
    if (this.audioContext.state === "running") {
      return;
    }
    this.audioContext = new AudioContext({
      latencyHint: "interactive",
    });
    this._nextScheduledBeatTime =
      this.audioContext.currentTime + this._startDelay - 60 / this.spec.bpm;
    this._currentBeatIndex = 0;
    this.audioContext.resume();
    this.handleScheduler();
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
    if (this.nextBeatDueToBeScheduled()) {
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
    metronome.spec = spec;
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
  const [metronomeSpec, setMetronomeSpecInner] = useState<MetronomeSpec>({
    bpm: 120,
    beats: ["strong", "weak", "weak", "weak"],
  });

  const updateBpm = (bpm: number) => {
    setMetronomeSpec({ ...metronomeSpec, bpm });
  };

  const updateBeats = (beats: BeatStrength[]) => {
    setMetronomeSpec({ ...metronomeSpec, beats });
  };

  const setMetronomeSpec = (newSpec: MetronomeSpec) => {
    if (newSpec.bpm < 20) {
      return;
    }
    if (newSpec.beats.length < 1) {
      return;
    }
    setMetronomeSpecInner(newSpec);
  };

  const { metronome, beat: currentBeat } = useMetronome(metronomeSpec);

  const handleBeatsNumChange = (event) => {
    const newLength = parseInt(event.target.value);
    if (newLength < 1) {
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

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={darkTheme}>
        <div className={styles.App}>
          <Paper className={styles.AppInner} elevation={4}>
            <Typography variant="h4">Metronome</Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={4}>
                BPM
              </Grid>
              <Grid item xs={2}>
                <Input
                  type="number"
                  inputProps={{ min: 20 }}
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
              <Grid item xs={4}>
                Beats per Measure
              </Grid>
              <Grid item xs={2}>
                <Input
                  type="number"
                  inputProps={{ min: 1 }}
                  value={metronomeSpec.beats.length}
                  onChange={handleBeatsNumChange}
                />
              </Grid>
            </Grid>
            {beatArray}
            <Typography className={styles.ClickInstructions}>
              Click to change beat accents
            </Typography>
            <Button onClick={() => metronome.play()}>Play</Button>
            <Button onClick={() => metronome.stop()}>Stop</Button>
          </Paper>
        </div>
      </ThemeProvider>
    </>
  );
};

export default dynamic(() => Promise.resolve(App), { ssr: false });
