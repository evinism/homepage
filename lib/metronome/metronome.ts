import { SoundPackId, soundPacks } from "./soundpacks";

export type BeatStrength = "strong" | "weak" | "off";

// Intentionally vague. Params passed to the generator.
type GeneratorParameters = {
  [key: string]: any;
};

export type MetronomeSpec = {
  bpm: number;
  beats: BeatStrength[];
  sound: {
    volume: number;
    soundPack: SoundPackId;
    playbackRate: number;
    generatorParameters: GeneratorParameters;
  };
};

type SoundConstructor = (
  audioCtx: AudioContext,
  audioGenParams?: any
) => AudioScheduledSourceNode;

export type SoundPack = {
  strong: SoundConstructor;
  weak: SoundConstructor;
};

// --- METRONOME CLASS ---
export class Metronome {
  audioContext: AudioContext;
  spec: MetronomeSpec;
  _nextScheduledBeatTime: number;
  _startDelay: number = 0.01;
  _currentBeatIndex: number = 0; // This is a weirdly named item
  _schedulerInterval: number = 0.005;
  _schedulerId: NodeJS.Timer | null = null;
  _gainNode: GainNode;

  // Source of truth for what beats have played is the audioContext,
  // which is outside of the scheduler loop (and we probably shouldn't
  // poll it) so we need to keep track of what beats have played ourselves
  _beatNotifierId: NodeJS.Timer | null = null;
  _latestNotifiedBeat: number = -1;

  constructor(spec: MetronomeSpec) {
    this.spec = spec;
    const { audioContext, gainNode } = this.makeAudioContext(spec);
    this.audioContext = audioContext;
    this._gainNode = gainNode;
  }

  makeAudioContext(spec: MetronomeSpec) {
    const audioContext = new AudioContext({
      latencyHint: "interactive",
    });
    const gainNode = audioContext.createGain();
    gainNode.gain.value = spec.sound.volume;
    gainNode.connect(audioContext.destination);
    return { audioContext, gainNode };
  }

  updateSpec(spec: MetronomeSpec) {
    if (isNaN(spec.bpm) || spec.bpm <= 0) {
      console.error("Invalid BPM", spec.bpm);
      return;
    }
    if (spec.beats.length < 1) {
      console.error("Invalid beats", spec.beats);
      return;
    }
    if (this.spec.bpm * 9 < spec.bpm) {
      // Garbage schedule hack to make it sound like it's changing
      // nearly immediately on large changes
      this.reset();
    }
    this.spec = spec;
    this._gainNode.gain.value = spec.sound.volume;
  }

  getBeat() {
    return this._latestNotifiedBeat;
  }

  reset() {
    this.stop();
    this.play();
  }

  play() {
    if (this.audioContext.state === "running") {
      return;
    }
    const { audioContext, gainNode } = this.makeAudioContext(this.spec);
    this.audioContext = audioContext;
    this._gainNode = gainNode;

    this.audioContext.resume();

    this._nextScheduledBeatTime =
      this.audioContext.currentTime + this._startDelay - 60 / this.spec.bpm;
    this._currentBeatIndex = 0;
    this.handleScheduler();
    if (this._schedulerId) {
      clearInterval(this._schedulerId);
    }
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
    // unset which beat is hit
    this._notifyBeatHit(-1);
    this.audioContext.close();
  }

  handleScheduler() {
    const currentTime = this.audioContext.currentTime;
    if (this._nextScheduledBeatTime < currentTime) {
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
    if (strength === "off") {
      return;
    }
    const source = soundPacks[this.spec.sound.soundPack][strength](
      this.audioContext,
      this.spec.sound.generatorParameters
    );
    source.start(time);
    source.connect(this._gainNode);
  };

  _notifyBeatHit = (beatNumber: number) => {
    console.log("beat", beatNumber);
    document.dispatchEvent(new CustomEvent("beat", { detail: beatNumber }));
    this._latestNotifiedBeat = beatNumber;
  };

  subscribeToBeat(callback: (event: CustomEvent) => void) {
    (document as any).addEventListener("beat", callback);
  }

  unsubscribeFromBeat(callback: (event: CustomEvent) => void) {
    (document as any).removeEventListener("beat", callback);
  }
}
