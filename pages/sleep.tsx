import { useEffect, useRef, useState } from "react";
import { load, toggleActivate } from "../lib/faust/sleep.js";

const Sleep = () => {
  const audioContext = useRef<AudioContext | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // literally just for the rerenders
  const [_, setIsActivated] = useState(false);
  useEffect(() => {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    audioContext.current = new AudioCtx({ latencyHint: 0.00001 });

    load(audioContext.current).then(() => {
      setIsLoading(false);
    });
  }, []);
  return <>
    <h1>Sleep Noise Machine</h1>
    <button
      disabled={isLoading}
      onClick={async () => {
        if (audioContext.current){
          const isActivated = await toggleActivate(audioContext.current);
          setIsActivated(isActivated);
        }
      }}
    >
      {audioContext.current?.state === "running" ? "Deactivate" : "Activate"}
    </button>
  </>
}

export default Sleep;