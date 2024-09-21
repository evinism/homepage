import dynamic from "next/dynamic";
import Head from "next/head";

import { useEffect, useState } from "react";
import { usePersistentState } from "../hooks";
import { MetronomeSpec, BeatStrength, Metronome } from "./metronome";
import { SoundPackId, soundPacks } from "./soundpacks";

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
import BookmarksIcon from "@mui/icons-material/Bookmarks";

import styles from "./index.module.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

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

// 0 - 1000 to exponential 20 - 500
const MIN_BPM = 20;
const MAX_BPM = 500;
// Dr. Shemetov et al. invariants (2024) (remastered) [HD]
const C = MIN_BPM;
const a = Math.log(MAX_BPM / MIN_BPM) / 1000;

const scaleBPM = (value: number) => {
  return C * Math.exp(a * value);
};

const invScaleBPM = (value: number) => {
  return Math.log(value / C) / a;
};

const MetronomeComponent = () => {
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
  const [presetsOpen, setPresetsOpen] = useState<boolean>(false);

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

  const handleSliderChange = (_: Event, newValue: number | number[]) => {
    setBpm(scaleBPM(newValue as number));
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

  const modTempo = (fraction: number) => () => {
    setBpm(bpm * fraction);
  };

  return (
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
            aria-label="Presets"
            onClick={() => setSettingsOpen(!settingsOpen)}
          >
            <BookmarksIcon />
          </IconButton>
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
            styles.Settings + " " + (settingsOpen ? styles.Open : styles.Closed)
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
                    <MenuItem value={soundPackKey}>{soundPackKey}</MenuItem>
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
            value={Math.round(bpm)}
            onChange={(event) => setBpm(parseInt(event.target.value))}
          />
        </Grid>
        <Grid item xs={4}>
          <Button onClick={handleTapTempoClick}>Tap</Button>
        </Grid>
        <Grid item xs={4}>
          <Button onClick={modTempo(1 / 1.03)}>- 3%</Button>
          <Button onClick={modTempo(1.03)}>+ 3%</Button>
        </Grid>
        <Grid item xs={12}>
          <Slider
            min={0}
            max={1000}
            value={invScaleBPM(bpm)}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
      </Grid>
      <Divider />
      <Grid container spacing={2} alignItems="center">
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
          <a href="https://github.com/evinism/homepage/issues">Report a bug</a>
        </Typography>
      </footer>
    </Paper>
  );
};

const App = () => {
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
          <MetronomeComponent />
        </div>
      </ThemeProvider>
    </>
  );
};

export default dynamic(() => Promise.resolve(App), { ssr: false });
