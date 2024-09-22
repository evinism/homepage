import { memo, useEffect, useState } from "react";
import { usePersistentState } from "../../hooks";
import { MetronomeSpec, BeatStrength, Metronome } from "../metronome";
import { SoundPackId, soundPacks } from "../soundpacks";

import styles from "../index.module.css";

import {
  Button,
  Input,
  Grid,
  Paper,
  Typography,
  Slider,
  IconButton,
  Divider,
  Select,
  MenuItem,
  Modal,
  ListItem,
  List,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import { defaultPresetStore, PresetStore } from "../presetstore";
import inferRhythm from "../smarttap/smarttap";
import GlobalKeydownListener from "./globalkeydownlistener";

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
// Okay let's rip stuff out of the render step.

const defaultBeats: BeatStrength[] = ["weak", "weak", "weak", "weak"];
const beatLookupOrder = {
  up: {
    strong: "off",
    weak: "strong",
    off: "weak",
  },
  down: {
    strong: "weak",
    weak: "off",
    off: "strong",
  },
};

const TempoSection = ({ bpm, setBpm }) => {
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
        <GlobalKeydownListener onKeyDown={handleTapTempoClick} keyFilter=" " />
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
  );
};

const MemoizedTempoSection = memo(TempoSection);

const SmartTapButton = ({ setBpm, setBeats }) => {
  const [taps, setTaps] = useState<{ strength: BeatStrength; time: number }[]>(
    []
  );
  const handleSmartTap = (strength: BeatStrength) => () => {
    console.log(taps);

    const now = new Date().getTime();
    let newTaps = taps.slice();
    if (taps.length > 0 && now - taps[taps.length - 1].time > 2000) {
      newTaps = [];
    }
    newTaps.push({ strength, time: now });
    const inferredRhythm = inferRhythm(newTaps);

    if (inferredRhythm) {
      setBeats(inferredRhythm.value.beats);
      setBpm(inferredRhythm.value.tempo);
    }
    setTaps(newTaps);
  };

  return (
    <>
      <Button onClick={handleSmartTap("weak")}>Smart Tap (Beta)</Button>
      <GlobalKeydownListener
        onKeyDown={handleSmartTap("strong")}
        keyFilter=","
      />
      <GlobalKeydownListener onKeyDown={handleSmartTap("weak")} keyFilter="." />
    </>
  );
};

const BeatsSection = ({
  beats,
  setBeats,
  beatFill,
  beatArrayWrapping,
  currentBeat,
  beatAccentChangeDirection,
}) => {
  let [requestedSize, setRequestedSize] = useState<number | void>(beats.length);

  const [userHasChangedAccents, setUserHasChangedAccents] =
    useState<boolean>(false);

  const changeBeatStrength = (index: number, strength: BeatStrength) => {
    const newBeats = beats.map((beat, i) => (i === index ? strength : beat));
    setBeats(newBeats);
  };
  const rotateBeatStrength = (index: number, direction: "up" | "down") => {
    setUserHasChangedAccents(true);
    changeBeatStrength(
      index,
      beatLookupOrder[direction][beats[index]] as BeatStrength
    );
  };

  // TODO: Beat size should be controlled when entry is focused
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

  // Smart Tap
  return (
    <>
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
              onClick={() =>
                rotateBeatStrength(index, beatAccentChangeDirection)
              }
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
    </>
  );
};

const MemoizedBeatsSection = memo(BeatsSection);

const MetronomeComponent = () => {
  const [beats, setBeats] = useState<BeatStrength[]>(defaultBeats);
  const [bpm, setBpm] = useState<number>(120);
  const [volume, setVolume] = usePersistentState<number>("volume", 1);
  const [soundPack, setSoundPack] = useState<SoundPackId>("default");
  const [beatAccentChangeDirection, setBeatAccentChangeDirection] =
    usePersistentState<"up" | "down">("beatAccentChangeDirection", "up");

  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [presetsOpen, setPresetsOpen] = useState<boolean>(false);

  const [freqMultiplier, setFreqMultiplier] = useState<number>(1);
  const [userPresetStore, setUserPresetStore] = useState<PresetStore>({});
  const presetStore = Object.assign({}, userPresetStore, defaultPresetStore);

  let [beatArrayWrappingInput, setBeatArrayWrappingInput] = useState<
    string | void
  >();
  const [beatFill, setBeatFill] = usePersistentState<BeatStrength>(
    "beatStrength",
    "weak"
  );

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
  const clear = () => {
    if (window.confirm("Are you sure you want to clear all beats?")) {
      setBeats(Array(beats.length).fill("off"));
    }
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
            onClick={() => setPresetsOpen(!presetsOpen)}
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
              <Grid item xs={3}>
                Beat Accent Change Direction
              </Grid>
              <Grid item xs={3}>
                <Select
                  value={beatAccentChangeDirection}
                  onChange={(event) =>
                    setBeatAccentChangeDirection(
                      event.target.value as "up" | "down"
                    )
                  }
                >
                  <MenuItem value="up">Up</MenuItem>
                  <MenuItem value="down">Down</MenuItem>
                </Select>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
      <Divider className={settingsOpen ? styles.Invisible : ""} />
      <MemoizedTempoSection bpm={bpm} setBpm={setBpm} />
      <Divider />
      <MemoizedBeatsSection
        beats={beats}
        setBeats={setBeats}
        setBpm={setBpm}
        beatFill={beatFill}
        beatArrayWrapping={beatArrayWrapping}
        beatAccentChangeDirection={beatAccentChangeDirection}
        currentBeat={currentBeat}
      />
      <div className={styles.ButtonGroup}>
        <Button onClick={() => metronome.play()}>Play</Button>
        <Button onClick={() => metronome.stop()}>Stop</Button>
        <div className={styles.Spacer} />
        <SmartTapButton setBpm={setBpm} setBeats={setBeats} />
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
      {presetsOpen && (
        <Modal open={presetsOpen} onClose={() => setPresetsOpen(false)}>
          <Paper className={styles.PresetDialog}>
            <Typography variant="h5">Presets</Typography>
            <List>
              {Object.entries(presetStore).map(([name, spec]) => (
                <ListItem>
                  <Button
                    onClick={() => {
                      setBeats(spec.beats);
                      setBpm(spec.bpm);
                      setPresetsOpen(false);
                    }}
                  >
                    Load
                  </Button>
                  <Typography>{name}</Typography>
                </ListItem>
              ))}
            </List>
            <>
              <Divider />
              <Button
                onClick={() => {
                  const name = window.prompt("Name your preset");
                  if (!name) {
                    return;
                  }
                  setUserPresetStore({
                    ...userPresetStore,
                    [name]: {
                      beats,
                      bpm,
                    },
                  });
                }}
              >
                Save Current
              </Button>
              <Button
                onClick={() => {
                  if (
                    confirm(
                      "Are you sure you want to clear all user-made presets?"
                    )
                  ) {
                    setUserPresetStore({});
                  }
                }}
              >
                Reset to Default
              </Button>
            </>
          </Paper>
        </Modal>
      )}
    </Paper>
  );
};

export default MetronomeComponent;
