import { useEffect, useState } from "react";
import { usePersistentState } from "../../hooks";
import { BeatStrength, Rhythm } from "../metronome";
import { SoundPackId } from "../soundpacks";
import { BeatFillMethod, Measures } from "../types";

import styles from "../index.module.css";

import {
  Button,
  Paper,
  Typography,
  IconButton,
  Divider,
  Tooltip,
  Snackbar,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import ShareIcon from "@mui/icons-material/Share";
import PresetModal from "./presetmodal";
import GlobalKeydownListener from "./globalkeydownlistener";
import dynamic from "next/dynamic";
import useMetronome from "../usemetronome";
import { MemoizedTempoSection } from "./temposection";
import { MemoizedBeatsSection } from "./beatsection";
import SettingsPanel from "./settings";
import MeasureInputSection from "./measureinputsection";

const defaultBeats: Measures = [["weak", "weak", "weak", "weak"]];

const ttConfig = {
  enterDelay: 500,
};

// Utility functions for sharing rhythm specs
const serializeRhythm = (rhythm: Rhythm): string => {
  return btoa(JSON.stringify(rhythm));
};

const deserializeRhythm = (base64: string): Rhythm | null => {
  try {
    const json = atob(base64);
    return JSON.parse(json) as Rhythm;
  } catch (error) {
    console.error("Failed to deserialize rhythm:", error);
    return null;
  }
};

const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
    return false;
  }
};

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
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const [freqMultiplier, setFreqMultiplier] = useState<number>(1);
  const [beatFill, setBeatFill] = usePersistentState<BeatFillMethod>(
    "beatFillMethod",
    "copyEnd"
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

  // Load rhythm from URL hash on component mount
  useEffect(() => {
    const hash = window.location.hash.slice(1); // Remove the # character
    if (hash && hash.startsWith("rhythm-")) {
      const base64 = hash.slice(7); // Remove the 'rhythm-' prefix
      const rhythm = deserializeRhythm(base64);
      if (rhythm) {
        setBpm(rhythm.bpm);
        setBeats(rhythm.beats);
        setSnackbarMessage("Rhythm loaded from URL");
      }
    }
  }, []);

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
    if (window.confirm("Are you sure you want to clear all beat emphases?")) {
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
          <Tooltip title="Share rhythm pattern" {...ttConfig}>
            <IconButton
              aria-label="Share"
              onClick={async () => {
                const rhythm: Rhythm = {
                  bpm,
                  beats,
                };
                const base64 = serializeRhythm(rhythm);
                const url = `${window.location.origin}${window.location.pathname}#rhythm-${base64}`;
                const success = await copyToClipboard(url);
                if (success) {
                  setSnackbarMessage("Rhythm URL copied to clipboard");
                }
              }}
            >
              <ShareIcon />
            </IconButton>
          </Tooltip>
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
      <SettingsPanel
        settingsOpen={settingsOpen}
        setSettingsOpen={setSettingsOpen}
        volume={volume}
        setVolume={setVolume}
        beatFill={beatFill}
        setBeatFill={setBeatFill}
        beatAccentChangeDirection={beatAccentChangeDirection}
        setBeatAccentChangeDirection={setBeatAccentChangeDirection}
        freqMultiplier={freqMultiplier}
        setFreqMultiplier={setFreqMultiplier}
        beats={beats}
        setNumberOfMeasures={setNumberOfMeasures}
        soundPack={soundPack}
        setSoundPack={setSoundPack}
      />
      <Divider className={settingsOpen ? styles.Invisible : ""} />
      <MemoizedTempoSection bpm={bpm} setBpm={setBpm} />
      <Divider />
      <MeasureInputSection
        beats={beats}
        setBeats={setBeats}
        beatFill={beatFill}
        currentBeat={currentBeat}
        beatAccentChangeDirection={beatAccentChangeDirection}
        setBpm={setBpm}
      />
      <div className={styles.Spacer} />
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
      <Snackbar
        open={snackbarMessage !== ""}
        autoHideDuration={2000}
        onClose={() => setSnackbarMessage("")}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Paper>
  );
};

export default dynamic(() => Promise.resolve(MetronomeComponent), {
  ssr: false,
});
