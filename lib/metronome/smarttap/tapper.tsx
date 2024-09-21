import { useState } from "react";
import inferRhythm, { BeatClick } from "./smarttap";
import { Input } from "@mui/material";

const Tapper = ({ setBeatAndTempo }) => {
  const [taps, setTaps] = useState<BeatClick[]>([]);
  const inferredRhythm = inferRhythm(taps);
  return (
    <div>
      <button
        onClick={() => {
          setTaps([
            ...taps,
            {
              strength: "weak",
              time: new Date().getTime(),
            },
          ]);
        }}
      >
        Tap
      </button>
      <button
        onClick={() => {
          setTaps([]);
        }}
      >
        Clear
      </button>
      <Input
        onKeyDown={(e) => {
          let newTaps = taps;
          if (e.key === "x") {
            newTaps = [
              ...taps,
              {
                strength: "weak",
                time: new Date().getTime(),
              },
            ];
          }
          if (e.key === "z") {
            newTaps = [
              ...taps,
              {
                strength: "strong",
                time: new Date().getTime(),
              },
            ];
          }
          const res = inferRhythm(newTaps);
          if (res) {
            setBeatAndTempo(res.beats, res.tempo);
          }
          setTaps(newTaps);
        }}
      />

      <pre>{JSON.stringify(inferRhythm(taps))}</pre>
    </div>
  );
};

export default Tapper;
