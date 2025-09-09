import { useEffect, useRef, useState } from "react";
import { load, toggleActivate } from "../lib/sleep/sleep.js";
import { Slider } from "@mui/material";
import styles from "../styles/Sleep.module.css";

type FaustNode = any;

const minCutoff = 100;
const maxCutoff = 5000;
// Exponential scale from 0 to 1000
const scaleCutoff = (value: number) =>
  minCutoff * Math.exp((value * Math.log(maxCutoff / minCutoff)) / 1000);

const invScaleCutoff = (value: number) =>
  (Math.log(value / minCutoff) / Math.log(maxCutoff / minCutoff)) * 1000;

const Sleep = () => {
  const audioContext = useRef<AudioContext | null>(null);
  const faustNode = useRef<FaustNode | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cutoff, setCutoff] = useState<number>(500);

  // literally just for the rerenders
  const [isActivated, setIsActivated] = useState(false);
  useEffect(() => {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    audioContext.current = new AudioCtx({ latencyHint: 0.00001 });
    audioContext.current.suspend();

    load(audioContext.current).then((faustNode_) => {
      faustNode.current = faustNode_;
      const cutoff = faustNode.current?.getParamValue("/sleep/freq");
      setCutoff(cutoff);
      setIsLoading(false);
    });
  }, []);
  return (
    <>
      <h1>Sleep Noise Machine</h1>
      <button
        disabled={isLoading}
        onClick={async () => {
          if (audioContext.current) {
            const isActivated = await toggleActivate(audioContext.current);
            setIsActivated(isActivated);
          }
        }}
      >
        {isActivated ? "Deactivate" : "Activate"}
      </button>
      <Slider
        min={0}
        max={1000}
        value={invScaleCutoff(cutoff)}
        onChange={(e, v: number) => {
          setCutoff(scaleCutoff(v));
          faustNode.current?.setParamValue("/sleep/freq", scaleCutoff(v));
        }}
      />
    </>
  );
};



export default Sleep;