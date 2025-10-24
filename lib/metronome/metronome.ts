import { SoundPackId, soundPacks, GeneratorParameters } from "./soundpacks";
import { multiLength, multiIndex } from "./util";
import { BeatStrength, Measures } from "./types";

export type Rhythm = {
  beats: Measures;
  bpm: number;
};

export type MetronomeSpec = Rhythm & {
  sound: {
    volume: number;
    soundPack: SoundPackId;
    playbackRate: number;
    // Intentionally vague. Params passed to the generator.
    generatorParameters: GeneratorParameters;
  };
};

export class Metronome {
  audioContext: AudioContext;
  spec: MetronomeSpec;
  _latestScheduledBeatTime: number;
  _startDelay: number = 0.01;
  _latestScheduledBeatIndex: number = -1;
  _schedulerInterval: number = 0.005;
  _schedulerHorizon: number = 0.05;
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

  updateSpec(spec: MetronomeSpec) {
    if (isNaN(spec.bpm) || spec.bpm <= 0) {
      console.error("Invalid BPM", spec.bpm);
      return;
    }
    if (multiLength(spec.beats) < 1) {
      console.error("Invalid beats", spec.beats);
      return;
    }

    if (!this._shouldNotifyBeatHit() && this._latestNotifiedBeat !== -1) {
      // Clear the beat notifier, because beat notification is kind of useless
      // at insane tempos.
      this._notifyBeatHit(-1);
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

    this._latestScheduledBeatTime =
      this.audioContext.currentTime + this._startDelay - 60 / this.spec.bpm;
    this._latestScheduledBeatIndex = -1;
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

  nextBeatToScheduleTime = () => {
    return this._latestScheduledBeatTime + 60 / this.spec.bpm;
  };

  nextBeatToScheduleIndex = () => {
    const length = multiLength(this.spec.beats);
    if (this._latestScheduledBeatIndex >= length) {
      return 0;
    }
    return (this._latestScheduledBeatIndex + 1) % length;
  };

  handleScheduler() {
    const currentTime = this.audioContext.currentTime;
    const horizon = currentTime + this._schedulerHorizon;
    while (this.nextBeatToScheduleTime() < horizon) {
      const nextBeatTime = this.nextBeatToScheduleTime();
      const nextBeatIndex = this.nextBeatToScheduleIndex();
      this.scheduleClick(
        multiIndex(this.spec.beats, nextBeatIndex).strength,
        nextBeatTime
      );
      if (this._shouldNotifyBeatHit()) {
        this._beatNotifierId = setTimeout(
          () => this._notifyBeatHit(nextBeatIndex),
          (nextBeatTime - currentTime) * 1000
        );
      }
      this._latestScheduledBeatTime = nextBeatTime;
      this._latestScheduledBeatIndex = nextBeatIndex;
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
