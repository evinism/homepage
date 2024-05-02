import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

type BeatStrength = "strong" | "weak" | "off";

type MetronomeSpec = {
  bpm: number;
  beats: BeatStrength[];
};

const scheduleBeat = (
  audioContext: AudioContext,
  strength: BeatStrength,
  time: number
) => {
  console.log("scheduling beat", time);
  console.log("current time", audioContext.currentTime);
  if (strength === "off") {
    return;
  }

  const oscillator = audioContext.createOscillator();
  oscillator.frequency.value = strength === "strong" ? 880 : 440;
  oscillator.connect(audioContext.destination);
  oscillator.start(time);
  oscillator.stop(time + 0.05);
};

const useMetronome = (spec: MetronomeSpec, _audioContext: AudioContext) => {
  const { bpm, beats } = spec;
  const secondsPerBeat = 60 / bpm;
  const [beatScheduledCount, setBeatScheduledCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext>(_audioContext);
  const [audioStartTime, setAudioStartTime] = useState(0);

  const schedulerPeriod = 0.1; // how often to call scheduler (in seconds)
  const initialDelay = audioContext.baseLatency + 0.1; // how long to wait before starting the metronome

  const play = () => {
    const audioContext = new AudioContext({
      latencyHint: "interactive",
    });
    setAudioContext(audioContext);
    setAudioStartTime(audioContext.currentTime + initialDelay);
    setBeatScheduledCount(-1);
    setIsPlaying(true);
  };
  const stop = () => {
    setIsPlaying(false);
  };

  const scheduleBeatNumber = (beatNumber: number) => {
    console.log("scheduling beat number", beatNumber);
    const time = audioStartTime + beatNumber * secondsPerBeat;
    const strength = beats[beatNumber % beats.length];
    scheduleBeat(audioContext, strength, time);
  };
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        const currentTime = audioContext.currentTime;
        const currentBeat = (currentTime - audioStartTime) / secondsPerBeat;
        if (currentBeat + 1 > beatScheduledCount) {
          scheduleBeatNumber(beatScheduledCount + 1);
          setBeatScheduledCount(beatScheduledCount + 1);
        }
      }, schedulerPeriod * 1000);

      return () => clearInterval(interval);
    }
  }, [isPlaying, beatScheduledCount]);
  return { isPlaying, play, stop };
};

const App = () => {
  const audioContext = new AudioContext({
    latencyHint: "interactive",
  });
  const [metronomeSpec, setMetronomeSpec] = useState<MetronomeSpec>({
    bpm: 120,
    beats: ["strong", "weak", "weak", "off"],
  });

  const updateBpm = (bpm: number) => {
    setMetronomeSpec({ ...metronomeSpec, bpm });
  };

  const updateBeats = (beats: BeatStrength[]) => {
    setMetronomeSpec({ ...metronomeSpec, beats });
  };

  const { play, stop } = useMetronome(metronomeSpec, audioContext);

  const BPMInput = () => {
    return (
      <input
        type="number"
        value={metronomeSpec.bpm}
        onChange={(event) => updateBpm(parseInt(event.target.value))}
      />
    );
  };

  const BeatInput = () => {
    return (
      <input
        type="text"
        value={metronomeSpec.beats.join(",")}
        onChange={(event) =>
          updateBeats(
            event.target.value
              .split(",")
              .map((beat) => beat.trim() as BeatStrength)
          )
        }
      />
    );
  };

  return (
    <div>
      <h1>Metronome</h1>
      <p>Coming soon...</p>
      <BPMInput />
      <BeatInput />
      <button onClick={play}>Play</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
};

export default dynamic(() => Promise.resolve(App), { ssr: false });
