import { useState } from "react";
import { SoundPackId, soundPacks } from "../soundpacks";
import Keybinds from "./keybindsmodal";

import styles from "../index.module.css";

import { Button, Input, Grid, Slider, Select, MenuItem } from "@mui/material";
import { BeatFillMethod } from "../types";

interface SettingsPanelProps {
  settingsOpen: boolean;
  setSettingsOpen: (open: boolean) => void;
  volume: number;
  setVolume: (volume: number) => void;
  beatFill: BeatFillMethod;
  setBeatFill: (fill: BeatFillMethod) => void;
  beatAccentChangeDirection: "up" | "down";
  setBeatAccentChangeDirection: (direction: "up" | "down") => void;
  freqMultiplier: number;
  setFreqMultiplier: (multiplier: number) => void;
  beats: string[][];
  setNumberOfMeasures: (length: number) => void;
  soundPack: SoundPackId;
  setSoundPack: (pack: SoundPackId) => void;
}

const SettingsPanel = ({
  settingsOpen,
  setSettingsOpen,
  volume,
  setVolume,
  beatFill,
  setBeatFill,
  beatAccentChangeDirection,
  setBeatAccentChangeDirection,
  freqMultiplier,
  setFreqMultiplier,
  beats,
  setNumberOfMeasures,
  soundPack,
  setSoundPack,
}: SettingsPanelProps) => {
  const [keybindsOpen, setKeybindsOpen] = useState<boolean>(false);

  return (
    <>
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
                    setBeatFill(event.target.value as BeatFillMethod)
                  }
                >
                  <MenuItem value="strong">Strong</MenuItem>
                  <MenuItem value="weak">Weak</MenuItem>
                  <MenuItem value="off">Off</MenuItem>
                  <MenuItem value="copyEnd">Copy End</MenuItem>
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
                    <MenuItem key={soundPackKey} value={soundPackKey}>
                      {soundPackKey}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
      {keybindsOpen && <Keybinds close={() => setKeybindsOpen(false)} />}
    </>
  );
};

export default SettingsPanel;
