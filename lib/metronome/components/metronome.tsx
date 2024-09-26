import { memo, useEffect, useState } from "react";
import { usePersistentState } from "../../hooks";
import { BeatStrength } from "../metronome";
import { SoundPackId, soundPacks } from "../soundpacks";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import HelpIcon from "@mui/icons-material/Help";

import ScienceIcon from "@mui/icons-material/Science";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

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
  Box,
  CircularProgress,
  InputLabel,
  Tooltip,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import PresetModal from "./presetmodal";
import inferRhythm from "../smarttap";
import GlobalKeydownListener from "./globalkeydownlistener";
import dynamic from "next/dynamic";
import { setAtIndex, toSplitIndex } from "../util";
import useMetronome from "../usemetronome";
import Keybinds from "./keybindsmodal";

type Measure = BeatStrength[];
type Measures = Measure[];

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
// Okay let's rip stuff out of the render step.

const defaultBeats: Measures = [["weak", "weak", "weak", "weak"]];
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

const ttConfig = {
  enterDelay: 500,
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

const MemoizedTempoSection = memo(TempoSection);

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

interface BeatsSectionProps {
  beats: Measures;
  setBeats: (beats: Measures) => void;
  measureIndex: number;
  beatFill: BeatStrength;
  currentBeat: number;
  beatAccentChangeDirection: "up" | "down";
  setBpm: (bpm: number) => void;
}

const BeatsSection = ({
  beats,
  measureIndex,
  setBeats,
  beatFill,
  currentBeat,
  beatAccentChangeDirection,
  setBpm,
}: BeatsSectionProps) => {
  // Calculate current beat within the emasure.
  const [measureNum, beatNum] = toSplitIndex(beats, currentBeat);
  let innerCurrentBeat = -1;
  if (measureNum === measureIndex) {
    innerCurrentBeat = beatNum;
  }

  let measure = beats[measureIndex];
  // On blur, requested size defaults back to whatever the underlying beats array says.
  let [requestedSize, setRequestedSize] = useState<number | void>();
  if (requestedSize === undefined) {
    requestedSize = measure.length;
  }

  const [userHasChangedAccents, setUserHasChangedAccents] =
    usePersistentState<boolean>("userHasChangedAccents", false);

  const changeBeatStrength = (index: number, strength: BeatStrength) => {
    const newMeasure: Measure = measure.map((beat, i) =>
      i === index ? strength : beat
    );
    setBeats(setAtIndex(beats, measureIndex, newMeasure));
  };
  const rotateBeatStrength = (index: number, direction: "up" | "down") => {
    setUserHasChangedAccents(true);
    changeBeatStrength(
      index,
      beatLookupOrder[direction][measure[index]] as BeatStrength
    );
  };

  // TODO: Beat size should be controlled when entry is focused
  const handleBeatsNumChange = (event) => {
    const newLength = event.target.value;
    setRequestedSize(newLength);
    if (isNaN(newLength) || newLength <= 0) {
      return;
    }
    if (newLength > measure.length) {
      const newMeasure: BeatStrength[] = [
        ...measure,
        ...Array(newLength - measure.length).fill(beatFill),
      ];
      setBeats(setAtIndex(beats, measureIndex, newMeasure));
    } else {
      const newMeasure = measure.slice(0, newLength);
      setBeats(setAtIndex(beats, measureIndex, newMeasure));
    }
  };

  return (
    <>
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
        {measureIndex === 0 && (
          <SmartTapButton setBpm={setBpm} setBeats={setBeats} />
        )}
      </Box>
      <div className={styles.BeatArray}>
        {measure.map((beat, index) => (
          <>
            <div
              className={
                styles.BeatIcon +
                " " +
                (index === innerCurrentBeat ? styles.active : styles.inactive) +
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
  const [beats, setBeats] = useState<BeatStrength[][]>(defaultBeats);
  const [bpm, setBpm] = useState<number>(120);
  const [volume, setVolume] = usePersistentState<number>("volume", 1);
  const [soundPack, setSoundPack] = useState<SoundPackId>("default");
  const [beatAccentChangeDirection, setBeatAccentChangeDirection] =
    usePersistentState<"up" | "down">("beatAccentChangeDirection", "up");

  // Visual Sliders and Modals
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [presetsOpen, setPresetsOpen] = useState<boolean>(false);
  const [keybindsOpen, setKeybindsOpen] = useState<boolean>(false);

  const [freqMultiplier, setFreqMultiplier] = useState<number>(1);
  const [beatFill, setBeatFill] = usePersistentState<BeatStrength>(
    "beatStrength",
    "weak"
  );

  const { metronome, beat: currentBeat } = useMetronome({
    bpm,
    beats: beats, // TODO: Support 2d beats
    sound: {
      volume,
      soundPack,
      playbackRate: 1,
      generatorParameters: {
        freqMultiplier,
      },
    },
  });

  const togglePlaying = () => {
    if (metronome.isPlaying()) {
      metronome.stop();
    } else {
      metronome.play();
    }
  };

  const setNumberOfMeasures = (newLength: number) => {
    console.log("newLength", newLength);
    if (newLength < 1 || newLength > 10 || isNaN(newLength)) {
      return;
    }
    const newBeats = beats.slice(0, newLength);
    if (newLength > newBeats.length) {
      for (let i = beats.length; i < newLength; i++) {
        newBeats.push(beats[beats.length - 1].slice());
      }
    }
    setBeats(newBeats);
  };

  const clear = () => {
    if (
      window.confirm(
        "Are you sure you want to clear the emphasis on all beats?"
      )
    ) {
      setBeats(beats.map((subBeats) => Array(subBeats.length).fill("off")));
    }
  };

  return (
    <Paper className={styles.AppInner} elevation={4}>
      <div className={styles.TitleLine}>
        <div>
          <Typography variant="h5" className={styles.Title}>
            TacoTacoBurrito
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
              <Grid item xs={6}>
                <Button onClick={() => setKeybindsOpen(true)}>
                  Show Keybinds
                </Button>
              </Grid>
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
              <Grid item xs={3}>
                Frequency Multiplier
              </Grid>
              <Grid item xs={3}>
                <Input
                  type="number"
                  className={styles.ShortNumberInput}
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
                Number of Measures
              </Grid>
              <Grid item xs={3}>
                <Input
                  className={styles.ShortNumberInput}
                  type="number"
                  inputProps={{ min: 1, max: 10 }}
                  value={beats.length}
                  onChange={(event) => {
                    setNumberOfMeasures(parseInt(event.target.value, 10));
                  }}
                />
                <ScienceIcon />
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
            </Grid>
          </div>
        </div>
      </div>
      <Divider className={settingsOpen ? styles.Invisible : ""} />
      <MemoizedTempoSection bpm={bpm} setBpm={setBpm} />
      <Divider />

      {beats.map((_, index) => (
        <MemoizedBeatsSection
          beats={beats}
          measureIndex={index}
          setBeats={setBeats}
          setBpm={setBpm}
          beatFill={beatFill}
          beatAccentChangeDirection={beatAccentChangeDirection}
          currentBeat={currentBeat}
        />
      ))}

      <div className={styles.ButtonGroup}>
        <Button onClick={togglePlaying}>
          {metronome.isPlaying() ? "Stop" : "Play"}
        </Button>
        <GlobalKeydownListener onKeyDown={togglePlaying} keyFilter=" " />
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
      {presetsOpen && (
        <PresetModal
          close={() => setPresetsOpen(false)}
          setBpm={setBpm}
          setBeats={setBeats}
          beats={beats}
          bpm={bpm}
        />
      )}
      {keybindsOpen && <Keybinds close={() => setKeybindsOpen(false)} />}
    </Paper>
  );
};

export default dynamic(() => Promise.resolve(MetronomeComponent), {
  ssr: false,
});