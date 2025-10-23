import { SoundPackId, soundPacks, GeneratorParameters } from "./soundpacks";
import { multiLength, multiIndex } from "./util";
import { BeatStrength, Measures } from "./types";

// Intentionally vague. Params passed to the generator.

export type Rhythm = {
  beats: Measures;
  bpm: number;
};

export type MetronomeSpec = Rhythm & {
  sound: {
    volume: number;
    soundPack: SoundPackId;
    playbackRate: number;
    generatorParameters: GeneratorParameters;
  };
};

// --- METRONOME CLASS ---
export class Metronome {
  audioContext: AudioContext;
  spec: MetronomeSpec;
  _nextScheduledBeatTime: number;
  _startDelay: number = 0.01;
  _currentBeatIndex: number = 0; // This is a weirdly named item
  _schedulerInterval: number = 0.005;
  _schedulerId: NodeJS.Timeout | null = null;
  _gainNode: GainNode;

  // Source of truth for what beats have played is the audioContext,
  // which is outside of the scheduler loop (and we probably shouldn't
  // poll it) so we need to keep track of what beats have played ourselves
  _beatNotifierId: NodeJS.Timeout | null = null;
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
    audioContext.suspend();
    return { audioContext, gainNode };
  }

  // Batching for insane tempos
  // Metronomes shouldn't go this high, but I guess we'll support it
  getSchedulingBatchSize() {
    return Math.max(1, Math.floor(this.spec.bpm / 3000));
  }

  updateSpec(spec: MetronomeSpec) {
    if (isNaN(spec.bpm) || spec.bpm <= 0) {
      console.error("Invalid BPM", spec.bpm);
      return;
    }
    if (multiLength(spec.beats) < 1) {
      console.error("Invalid beats", spec.beats);
      return;
    }
    if (this.spec.bpm * 9 < spec.bpm && this.audioContext.state === "running") {
      // Garbage schedule hack to make it sound like it's changing
      // nearly immediately on large changes
      this.reset();
    }
    if (!this._shouldNotifyBeatHit()) {
      // Clear the beat notifier, because beat notification is kind of useless
      // at insane tempos.
      //this._notifyBeatHit(-1);
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

  isPlaying() {
    return this.audioContext.state === "running";
  }

  play() {
    if (this.isPlaying()) {
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
    if (!this.isPlaying()) {
      return;
    }
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
    const batchSize = this.getSchedulingBatchSize();
    const horizon = currentTime + (60 / this.spec.bpm) * (batchSize - 1);
    while (this._nextScheduledBeatTime < horizon) {
      this._nextScheduledBeatTime += 60 / this.spec.bpm;
      this.scheduleClick(
        multiIndex(
          this.spec.beats,
          this._currentBeatIndex % multiLength(this.spec.beats)
        ).strength,
        this._nextScheduledBeatTime
      );
      const beatToNotify = this._currentBeatIndex;
      if (this._shouldNotifyBeatHit()) {
        this._beatNotifierId = setTimeout(
          () => this._notifyBeatHit(beatToNotify),
          (this._nextScheduledBeatTime - currentTime) * 1000
        );
      }
      this._currentBeatIndex =
        (this._currentBeatIndex + 1) % multiLength(this.spec.beats);
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
    document.dispatchEvent(new CustomEvent("beat", { detail: beatNumber }));
    this._latestNotifiedBeat = beatNumber;
  };

  _shouldNotifyBeatHit() {
    return this.spec.bpm < 10000;
  }

  subscribeToBeat(callback: (event: CustomEvent) => void) {
    (document as any).addEventListener("beat", callback);
  }

  unsubscribeFromBeat(callback: (event: CustomEvent) => void) {
    (document as any).removeEventListener("beat", callback);
  }
}
