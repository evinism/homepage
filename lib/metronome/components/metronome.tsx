import { memo, useEffect, useState } from "react";
import { usePersistentState } from "../../hooks";
import { MetronomeSpec, BeatStrength, Metronome } from "../metronome";
import { SoundPackId, soundPacks } from "../soundpacks";
import SpaceBarIcon from "@mui/icons-material/SpaceBar";
import DeleteIcon from "@mui/icons-material/Delete";
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
  Modal,
  ListItem,
  List,
  Box,
  CircularProgress,
  ListSubheader,
  ListItemButton,
  InputLabel,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import { defaultPresetStore, PresetStore } from "../presetstore";
import inferRhythm from "../smarttap";
import GlobalKeydownListener from "./globalkeydownlistener";
import dynamic from "next/dynamic";
import { setAtIndex, toSplitIndex } from "../util";
import { set } from "date-fns";

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
const MIN_BPM = 40;
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

const defaultBeats: BeatStrength[][] = [["weak", "weak", "weak", "weak"]];
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

const K = ({ children }) => (
  <span className={styles.KeyRepresentation}>{children}</span>
);

const KeyboardShortcuts = ({ close }: { close: () => void }) => {
  return (
    <Modal onClose={close} open={true} className={styles.KeybindsModal}>
      <Paper>
        <Typography variant="h5">Keyboard Shortcuts</Typography>
        <List>
          {[
            [<SpaceBarIcon />, "Play / Pause"],
            ["←", "Decrease Tempo"],
            ["→", "Increase Tempo"],
            ["/", "Tap Tempo"],
            [",", "Tap Rhythm (Strong Beat)"],
            [".", "Tap Rhythm (Weak Beat)"],
          ].map(([key, description]) => (
            <ListItem className={styles.KBSLine}>
              <K>{key}</K> <span>{description}</span>
            </ListItem>
          ))}
        </List>
        <Button onClick={close}>Close</Button>
      </Paper>
    </Modal>
  );
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

        <IconButton
          onClick={modTempo(1 / 1.03)}
          aria-label="Decrease Tempo by 3%"
        >
          <RemoveIcon />
        </IconButton>
        <GlobalKeydownListener
          onKeyDown={modTempo(1 / 1.03)}
          keyFilter="ArrowLeft"
        />
        <IconButton onClick={modTempo(1.03)} aria-label="Increase Tempo by 3%">
          <AddIcon />
        </IconButton>
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

const SmartTapButton = ({ setBpm, setBeats }) => {
  const [taps, setTaps] = useState<{ strength: BeatStrength; time: number }[]>(
    []
  );
  const handleSmartTap = (strength: BeatStrength) => () => {
    console.log(taps);

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
      setBeats(inferredRhythm.value.beats);
      setBpm(inferredRhythm.value.tempo);
    }
    setTaps(newTaps);

    // And also update the visuals, but don't mix the two concerns
    setDisplayTimerAmount(100);
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
      <Button startIcon={<ScienceIcon />} onClick={handleSmartTap("weak")}>
        Tap Rhythm
      </Button>
      <GlobalKeydownListener
        onKeyDown={handleSmartTap("strong")}
        keyFilter=","
      />
      <GlobalKeydownListener onKeyDown={handleSmartTap("weak")} keyFilter="." />
    </>
  );
};

interface BeatsSectionProps {
  beats: BeatStrength[];
  setBeats: (beats: BeatStrength[]) => void;
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
  // On blur, requested size defaults back to whatever the underlying beats array says.
  let [requestedSize, setRequestedSize] = useState<number | void>();
  if (requestedSize === undefined) {
    requestedSize = beats.length;
  }

  const [userHasChangedAccents, setUserHasChangedAccents] =
    usePersistentState<boolean>("userHasChangedAccents", false);

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
  const [userPresetStore, setUserPresetStore] = useState<PresetStore[string]>(
    {}
  );
  const presetStore = Object.assign(
    { "User Presets": userPresetStore },
    defaultPresetStore
  );
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

      {beats.map((_, index) => {
        const [measureNum, beatNum] = toSplitIndex(beats, currentBeat);
        let innerCurrentBeat = -1;
        if (measureNum === index) {
          innerCurrentBeat = beatNum;
        }
        return (
          <>
            <MemoizedBeatsSection
              beats={beats[index]}
              measureIndex={index}
              setBeats={(innerBeats: BeatStrength[]) => {
                setBeats(setAtIndex(beats, index, innerBeats));
              }}
              setBpm={setBpm}
              beatFill={beatFill}
              beatAccentChangeDirection={beatAccentChangeDirection}
              currentBeat={innerCurrentBeat}
            />
          </>
        );
      })}

      <div className={styles.ButtonGroup}>
        {!metronome.isPlaying() && (
          <Button onClick={() => metronome.play()}>Play</Button>
        )}
        {metronome.isPlaying() && (
          <Button onClick={() => metronome.stop()}>Stop</Button>
        )}
        <GlobalKeydownListener
          onKeyDown={() => {
            if (!metronome.isPlaying()) {
              metronome.play();
            } else {
              metronome.stop();
            }
          }}
          keyFilter=" "
        />
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
        <Modal open={presetsOpen} onClose={() => setPresetsOpen(false)}>
          <Paper className={styles.PresetDialog}>
            <Typography variant="h5">Presets</Typography>
            <List className={styles.PresetList} disablePadding>
              {Object.entries(presetStore).map(([groupName, group]) => {
                const entries = Object.entries(group);
                if (entries.length === 0) {
                  return null;
                }
                return (
                  <>
                    <ListSubheader>{groupName}</ListSubheader>
                    {entries.map(([name, spec]) => (
                      <ListItem
                        secondaryAction={
                          groupName === "User Presets" && (
                            <IconButton
                              edge="end"
                              aria-label="Delete"
                              onClick={() => {
                                if (
                                  confirm(
                                    `Are you sure you want to delete preset ${name}?`
                                  )
                                ) {
                                  const next = { ...userPresetStore };
                                  delete next[name];
                                  setUserPresetStore(next);
                                }
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          )
                        }
                      >
                        <ListItemButton
                          onClick={() => {
                            setBeats(spec.beats);
                            setBpm(spec.bpm);
                            setPresetsOpen(false);
                          }}
                        >
                          <Typography>{name}</Typography>
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </>
                );
              })}
            </List>
            <Divider />
            <Box className={styles.HorizontalGroup}>
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
              <div className={styles.Spacer} />
              <Button onClick={() => setPresetsOpen(false)}>Close</Button>
            </Box>
          </Paper>
        </Modal>
      )}
      {keybindsOpen && (
        <KeyboardShortcuts close={() => setKeybindsOpen(false)} />
      )}
    </Paper>
  );
};

export default dynamic(() => Promise.resolve(MetronomeComponent), {
  ssr: false,
});