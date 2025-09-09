import { useEffect, useRef, useState } from "react";
import { load, toggleActivate } from "../lib/sleep/sleep.js";
import {
  createTheme,
  CssBaseline,
  IconButton,
  Paper,
  Slider,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import cx from "classnames";
import styles from "./sleep.module.css";
import { Link } from "react-router-dom";
import { Air, VolumeDown, VolumeUp, Waves } from "@mui/icons-material";
import Head from "next/head.js";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

type FaustNode = any;

const minCutoff = 100;
const maxCutoff = 5000;
// Exponential scale from 0 to 100
const scaleCutoff = (value: number) =>
  minCutoff * Math.exp((value * Math.log(maxCutoff / minCutoff)) / 100);

const invScaleCutoff = (value: number) =>
  (Math.log(value / minCutoff) / Math.log(maxCutoff / minCutoff)) * 100;

const Sleep = () => {
  const audioContext = useRef<AudioContext | null>(null);
  const faustNode = useRef<FaustNode | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cutoff, setCutoff] = useState<number>(500);
  const [volume, setVolume] = useState<number>(100);

  // literally just for the rerenders
  const [isActivated, setIsActivated] = useState(false);
  useEffect(() => {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    audioContext.current = new AudioCtx({ latencyHint: 0.00001 });
    audioContext.current.suspend();

    load(audioContext.current).then((faustNode_) => {
      faustNode.current = faustNode_;
      const cutoff = faustNode.current?.getParamValue("/sleep/freq");
      const volume = faustNode.current?.getParamValue("/sleep/gain");
      setCutoff(cutoff);
      setVolume(volume * 100);
      setIsLoading(false);
    });
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <Head>
        <title>zzz Generator</title>
        <meta name="description" content="A noise generator for sleep" />
        <meta property="og:title" content="zzzmaker" />
        <meta property="og:description" content="A noise generator for sleep" />
      </Head>
      <CssBaseline />

      <main className={styles.App}>
        <div className={styles.Paper}>
          <article className={styles.MainInner}>
            <Typography variant="h5">zzzmaker</Typography>
            <Typography variant="body1" color="textSecondary">
              a noise generator for sleep
            </Typography>
            <button
              className={cx(
                styles.ActivateButton,
                isActivated && styles.Activated
              )}
              disabled={isLoading}
              onClick={async () => {
                if (audioContext.current) {
                  const isActivated = await toggleActivate(
                    audioContext.current
                  );
                  setIsActivated(isActivated);
                }
              }}
            >
              <BedtimeIcon fontSize="large" />
            </button>
            <div className={styles.Settings}>
              <Stack
                spacing={2}
                direction="row"
                sx={{ alignItems: "center", mb: 1 }}
              >
                <Waves />
                <Slider
                  value={invScaleCutoff(cutoff)}
                  onChange={(e, v: number) => {
                    setCutoff(scaleCutoff(v));
                    faustNode.current?.setParamValue(
                      "/sleep/freq",
                      scaleCutoff(v)
                    );
                  }}
                  valueLabelDisplay="auto"
                  valueLabelFormat={`${cutoff.toFixed(0)} Hz`}
                />
                <Air />
              </Stack>
              <Stack
                spacing={2}
                direction="row"
                sx={{ alignItems: "center", mb: 1 }}
              >
                <VolumeDown />
                <Slider
                  aria-label="Volume"
                  value={volume}
                  onChange={(e, v: number) => {
                    setVolume(v);
                    faustNode.current?.setParamValue("/sleep/gain", v / 100);
                  }}
                />
                <VolumeUp />
              </Stack>
            </div>
          </article>
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
          <Typography variant="body2" color="textSecondary" align="center">
            <a href="https://mynoise.net/">My Other Favorite Noise Machine</a>
          </Typography>
        </footer>
      </main>
    </ThemeProvider>
  );
};



export default Sleep;