import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

type BeatStrength = "strong" | "weak" | "off";

type MetronomeSpec = {
  bpm: number;
  beats: BeatStrength[];
};


class Metronome {
  audioContext: AudioContext;
  spec: MetronomeSpec;
  _nextScheduledBeatTime: number;
  _startDelay: number = 0.01;
  _currentBeatIndex: number = 0; // This is a weirdly named item
  _schedulerInterval: number = 0.005;
  _schedulerId: NodeJS.Timer | null = null;

  // Source of truth for what beats have played is the audioContext,
  // which is outside of the scheduler loop (and we probably shouldn't
  // poll it) so we need to keep track of what beats have played ourselves
  _beatNotifierId: NodeJS.Timer | null = null;
  _latestNotifiedBeat: number = -1;

  constructor(spec: MetronomeSpec) {
    this.spec = spec;
    this.audioContext = new AudioContext({
      latencyHint: "interactive",
    });
  }

  getBeat() {
    return this._latestNotifiedBeat;
  }

  nextBeatDueToBeScheduled() {
    const currentTime = this.audioContext.currentTime;
    return this._nextScheduledBeatTime < currentTime;
  }

  play() {
    this.audioContext = new AudioContext({
      latencyHint: "interactive",
    });
    this._nextScheduledBeatTime =
      this.audioContext.currentTime + this._startDelay - 60 / this.spec.bpm;
    this._currentBeatIndex = 0;
    this.audioContext.resume();
    this.handleScheduler();
    this._schedulerId = setInterval(
      () => this.handleScheduler(),
      this._schedulerInterval * 1000
    );
  }

  stop() {
    if (this._schedulerId) {
      clearInterval(this._schedulerId);
      this._schedulerId = null;
    }
    if (this._beatNotifierId) {
      clearTimeout(this._beatNotifierId);
      this._beatNotifierId = null;
    }
    this.audioContext.close();
  }

  handleScheduler() {
    const currentTime = this.audioContext.currentTime;
    if (this.nextBeatDueToBeScheduled()) {
      this._nextScheduledBeatTime += 60 / this.spec.bpm;
      this.scheduleClick(
        this.spec.beats[this._currentBeatIndex % this.spec.beats.length],
        this._nextScheduledBeatTime
      );
      const beatToNotify = this._currentBeatIndex;
      this._beatNotifierId = setTimeout(
        () => this._notifyBeatHit(beatToNotify),
        (this._nextScheduledBeatTime - currentTime) * 1000
      );

      this._currentBeatIndex =
        (this._currentBeatIndex + 1) % this.spec.beats.length;
    }
  }

  scheduleClick = (strength: BeatStrength, time: number) => {
    console.log("scheduling beat", time);
    console.log("current time", this.audioContext.currentTime);
    if (strength === "off") {
      return;
    }

    const oscillator = this.audioContext.createOscillator();
    oscillator.frequency.value = strength === "strong" ? 880 : 440;
    oscillator.connect(this.audioContext.destination);
    oscillator.start(time);
    oscillator.stop(time + 0.05);
  };

  _notifyBeatHit = (beatNumber: number) => {
    console.log("beat", beatNumber);
    this._latestNotifiedBeat = beatNumber;
  };
}

const useMetronome = (spec: MetronomeSpec) => {
  const [metronome] = useState<Metronome>(() => new Metronome(spec));
  if (metronome.spec !== spec) {
    metronome.spec = spec;
  }
  return metronome;
};

const App = () => {
  const [metronomeSpec, setMetronomeSpec] = useState<MetronomeSpec>({
    bpm: 120,
    beats: ["strong", "weak", "weak", "weak"],
  });

  const updateBpm = (bpm: number) => {
    setMetronomeSpec({ ...metronomeSpec, bpm });
  };

  const updateBeats = (beats: BeatStrength[]) => {
    setMetronomeSpec({ ...metronomeSpec, beats });
  };

  const metronome = useMetronome(metronomeSpec);

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

  const NumOfBeatsControl = () => {
    return (
      <input
        type="number"
        value={metronomeSpec.beats.length}
        onChange={(event) => {
          const newLength = parseInt(event.target.value);
          if (newLength < 1) {
            return;
          }
          if (newLength > metronomeSpec.beats.length) {
            const newBeats = [
              ...metronomeSpec.beats,
              ...Array(newLength - metronomeSpec.beats.length).fill("weak"),
            ];
            setMetronomeSpec({ ...metronomeSpec, beats: newBeats });
          } else {
            const newBeats = metronomeSpec.beats.slice(0, newLength);
            setMetronomeSpec({ ...metronomeSpec, beats: newBeats });
          }
        }}
      />
    );
  };

  return (
    <div>
      <h1>Metronome</h1>
      <input
        type="number"
        value={metronomeSpec.bpm}
        onChange={(event) => updateBpm(parseInt(event.target.value))}
      />
      <NumOfBeatsControl />
      <button onClick={() => metronome.play()}>Play</button>
      <button onClick={() => metronome.stop()}>Stop</button>
    </div>
  );
};

export default dynamic(() => Promise.resolve(App), { ssr: false });
