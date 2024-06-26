import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Head from "next/head";

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
  IconButton,
  Divider,
  Select,
  MenuItem,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

import styles from "./metronome.module.css";
import { usePersistentState } from "../lib/hooks";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

type BeatStrength = "strong" | "weak" | "off";


// Intentionally vague. Params passed to the generator.
type GeneratorParameters = {
  [key: string]: any;
};

type MetronomeSpec = {
  bpm: number;
  beats: BeatStrength[];
  sound: {
    volume: number;
    soundPack: SoundPackId;
    playbackRate: number;
    generatorParameters: GeneratorParameters;
  };
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
  (freqSpec: number[], options: Partial<FreqSampleFnOptions> = {}) =>
  (audioCtx: AudioContext, generatorsParams: GeneratorParameters) => {
    const { duration = 0.05, noise = 0 } = options;
    const { freqMultiplier = 1 } = generatorsParams;

    const freqs = freqSpec.map((freq) => freq * freqMultiplier);

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

type SoundConstructor = (
  audioCtx: AudioContext,
  audioGenParams?: any
) => AudioScheduledSourceNode;

type SoundPack = {
  strong: SoundConstructor;
  weak: SoundConstructor;
};

type SoundPackId = keyof typeof soundPacks;

const defaultSoundPack: SoundPack = {
  strong: makeFreqSampleFn(cluster(2093, 2113, 6)),
  weak: makeFreqSampleFn(cluster(1046, 1066, 6)),
};

// TODO: Make it so we might be able to adjust the base frequency
// within a sound pack, rather than having to make a new sound pack
const soundPacks = {
  default: defaultSoundPack,
  inverted: {
    strong: makeFreqSampleFn(cluster(1000, 1020, 6)),
    weak: makeFreqSampleFn(cluster(2000, 2020, 6)),
  },
};

// --- METRONOME CLASS ---
class Metronome {
  audioContext: AudioContext;
  spec: MetronomeSpec;
  _nextScheduledBeatTime: number;
  _startDelay: number = 0.01;
  _currentBeatIndex: number = 0; // This is a weirdly named item
  _schedulerInterval: number = 0.005;
  _schedulerId: NodeJS.Timer | null = null;
  _gainNode: GainNode;

  // Source of truth for what beats have played is the audioContext,
  // which is outside of the scheduler loop (and we probably shouldn't
  // poll it) so we need to keep track of what beats have played ourselves
  _beatNotifierId: NodeJS.Timer | null = null;
  _latestNotifiedBeat: number = -1;

  constructor(spec: MetronomeSpec) {
    this.spec = spec;
    const { audioContext, gainNode } = this.makeAudioContext(spec);
    this.audioContext = audioContext;
    this._gainNode = gainNode;
  }

  makeAudioContext(spec: MetronomeSpec) {
    const audioContext = new AudioContext({
      latencyHint: "interactive",
    });
    const gainNode = audioContext.createGain();
    gainNode.gain.value = spec.sound.volume;
    gainNode.connect(audioContext.destination);
    return { audioContext, gainNode };
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
    this._gainNode.gain.value = spec.sound.volume;
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
    const { audioContext, gainNode } = this.makeAudioContext(this.spec);
    this.audioContext = audioContext;
    this._gainNode = gainNode;

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
    if (strength === "off") {
      return;
    }
    const source = soundPacks[this.spec.sound.soundPack][strength](
      this.audioContext,
      this.spec.sound.generatorParameters
    );
    source.start(time);
    source.connect(this._gainNode);
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

// --- REACT COMPONENTS ---

const useMetronome = (spec: MetronomeSpec) => {
  const [metronome] = useState<Metronome>(() => new Metronome(spec));
  metronome.updateSpec(spec);

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
  const [beats, setBeats] = useState<BeatStrength[]>([
    "strong",
    "weak",
    "weak",
    "weak",
  ]);
  const [bpm, setBpm] = useState<number>(120);
  const [volume, setVolume] = usePersistentState<number>("volume", 1);
  const [soundPack, setSoundPack] = useState<SoundPackId>("default");

  const [tapTimeHistory, setTapTimeHistory] = useState<number[]>([]);
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [freqMultiplier, setFreqMultiplier] = useState<number>(1);

  let [beatArrayWrappingInput, setBeatArrayWrappingInput] = useState<
    string | void
  >();
  const [beatFill, setBeatFill] = usePersistentState<BeatStrength>(
    "beatStrength",
    "weak"
  );

  const [requestedSize, setRequestedSize] = useState<number | void>(
    beats.length
  );

  const [userHasChangedAccents, setUserHasChangedAccents] =
    useState<boolean>(false);

  const { metronome, beat: currentBeat } = useMetronome({
    bpm,
    beats,
    sound: {
      volume,
      soundPack,
      playbackRate: 1,
      generatorParameters: {
        freqMultiplier,
      },
    },
  });

  let beatArrayWrapping = parseInt(beatArrayWrappingInput || "");
  if (isNaN(beatArrayWrapping) || beatArrayWrapping < 0) {
    beatArrayWrapping = 0;
  }

  const handleBeatsNumChange = (event) => {
    const newLength = event.target.value;
    setRequestedSize(newLength);
    if (isNaN(newLength) || newLength <= 0) {
      return;
    }
    if (newLength > beats.length) {
      const newBeats = [
        ...beats,
        ...Array(newLength - beats.length).fill(beatFill),
      ];
      setBeats(newBeats);
    } else {
      const newBeats = beats.slice(0, newLength);
      setBeats(newBeats);
    }
  };

  const clear = () => {
    if (window.confirm("Are you sure you want to clear all beats?")) {
      setBeats(Array(beats.length).fill("off"));
    }
  };

  const changeBeatStrength = (index: number, strength: BeatStrength) => {
    const newBeats = beats.map((beat, i) => (i === index ? strength : beat));
    setBeats(newBeats);
  };
  const rotateBeatStrength = (index: number) => {
    setUserHasChangedAccents(true);
    changeBeatStrength(
      index,
      {
        strong: "weak",
        weak: "off",
        off: "strong",
      }[beats[index]] as BeatStrength
    );
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setBpm(newValue as number);
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
      setBpm(newBpm);
    }
    setTapTimeHistory(recentTaps);
  };

  return (
    <>
      <Head>
        <title>🌮🌮🌯</title>
        <meta
          name="description"
          content="A simple metronome for not-so-simple times"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CssBaseline />
      <ThemeProvider theme={darkTheme}>
        <div className={styles.App}>
          <div className={styles.Background} />
          <Paper className={styles.AppInner} elevation={4}>
            <div className={styles.TitleLine}>
              <div>
                <Typography variant="h5" className={styles.Title}>
                  🌮 🌮 🌯
                </Typography>
                <Typography variant="body1" className={styles.SubTitle}>
                  a simple metronome for not-so-simple times
                </Typography>
              </div>
              <div className={styles.SettingsIconWrapper}>
                <IconButton
                  aria-label="Settings"
                  onClick={() => setSettingsOpen(!settingsOpen)}
                >
                  <SettingsIcon />
                </IconButton>
              </div>
            </div>
            <div
              className={
                styles.SettingsGridWrapper +
                " " +
                (settingsOpen ? styles.Open : styles.Closed)
              }
            >
              <div
                className={
                  styles.Settings +
                  " " +
                  (settingsOpen ? styles.Open : styles.Closed)
                }
              >
                <div
                  className={
                    styles.SettingsInner +
                    " " +
                    (settingsOpen ? styles.Closed : styles.Open)
                  }
                >
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={3}>
                      Volume
                    </Grid>
                    <Grid item xs={3}>
                      <Slider
                        min={0}
                        max={1}
                        step={0.01}
                        value={volume}
                        onChange={(event, newValue) => {
                          setVolume(newValue as number);
                        }}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      Sound Pack
                    </Grid>
                    <Grid item xs={3}>
                      <Select
                        value={soundPack || "default"}
                        onChange={(event) => {
                          setSoundPack(event.target.value as SoundPackId);
                        }}
                      >
                        {Object.keys(soundPacks).map((soundPackKey) => (
                          <MenuItem value={soundPackKey}>
                            {soundPackKey}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                    <Grid item xs={3}>
                      Beats per Row
                    </Grid>
                    <Grid item xs={3}>
                      <Input
                        type="number"
                        inputProps={{ min: 0, max: 32 }}
                        value={beatArrayWrappingInput}
                        onChange={(event) =>
                          setBeatArrayWrappingInput(event.target.value)
                        }
                      />
                    </Grid>
                    <Grid item xs={3}>
                      New Beat Fill
                    </Grid>
                    <Grid item xs={3}>
                      <Select
                        value={beatFill}
                        onChange={(event) =>
                          setBeatFill(event.target.value as BeatStrength)
                        }
                      >
                        <MenuItem value="strong">Strong</MenuItem>
                        <MenuItem value="weak">Weak</MenuItem>
                        <MenuItem value="off">Off</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={3}>
                      Frequency Multiplier
                    </Grid>
                    <Grid item xs={3}>
                      <Input
                        type="number"
                        inputProps={{ min: 0.1, max: 10, step: 0.01 }}
                        value={freqMultiplier}
                        onChange={(event) =>
                          setFreqMultiplier(parseFloat(event.target.value))
                        }
                      />
                    </Grid>
                    <Grid item xs={3}>
                      Click Note
                    </Grid>
                    <Grid item xs={3}>
                      <Select
                        value={freqMultiplier}
                        onChange={(event) =>
                          setFreqMultiplier(event.target.value as number)
                        }
                      >
                        <MenuItem value={1}>C</MenuItem>
                        <MenuItem value={1.0595}>C#</MenuItem>
                        <MenuItem value={1.1225}>D</MenuItem>
                        <MenuItem value={1.1892}>D#</MenuItem>
                        <MenuItem value={1.2599}>E</MenuItem>
                        <MenuItem value={1.3348}>F</MenuItem>
                        <MenuItem value={1.4142}>F#</MenuItem>
                        <MenuItem value={0.7491}>G</MenuItem>
                        <MenuItem value={0.7937}>G#</MenuItem>
                        <MenuItem value={0.8409}>A</MenuItem>
                        <MenuItem value={0.8909}>A#</MenuItem>
                        <MenuItem value={0.9439}>B</MenuItem>
                      </Select>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </div>
            <Divider className={settingsOpen ? styles.Invisible : ""} />
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={2}>
                BPM
              </Grid>
              <Grid item xs={2}>
                <Input
                  type="number"
                  inputProps={{ min: 1 }}
                  value={bpm}
                  onChange={(event) => setBpm(parseInt(event.target.value))}
                />
              </Grid>
              <Grid item xs={6}>
                <Slider
                  min={20}
                  max={500}
                  value={bpm}
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
            <div className={styles.BeatArray}>
              {beats.map((beat, index) => (
                <>
                  <div
                    className={
                      styles.BeatIcon +
                      " " +
                      (index === currentBeat
                        ? styles.active
                        : styles.inactive) +
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
                  {(beatArrayWrapping >= 0 &&
                    (index + 1) % beatArrayWrapping === 0 && <br />) ||
                    null}
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
            <div className={styles.ButtonGroup}>
              <Button onClick={() => metronome.play()}>Play</Button>
              <Button onClick={() => metronome.stop()}>Stop</Button>
              <div className={styles.Spacer} />
              <Button onClick={clear}>Clear</Button>
            </div>
            <footer className={styles.Footer}>
              <Typography variant="body2" color="textSecondary" align="center">
                <a href="https://github.com/evinism/homepage">GitHub</a>
              </Typography>
              <Typography variant="body2" color="textSecondary" align="center">
                <a href="https://github.com/evinism/homepage/issues">
                  Report a bug
                </a>
              </Typography>
            </footer>
          </Paper>
        </div>
      </ThemeProvider>
    </>
  );
};

export default dynamic(() => Promise.resolve(App), { ssr: false });
