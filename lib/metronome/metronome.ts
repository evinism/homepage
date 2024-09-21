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

type FreqSampleFnOptions = {
  duration: number;
  noise: number;
  attack: number;
  decay: number;
  release: number;
  sustain: number;
};

const makeFreqSampleFn =
  (freqSpec: number[], options: Partial<FreqSampleFnOptions> = {}) =>
  (audioCtx: AudioContext, generatorsParams: GeneratorParameters) => {
    const { duration = 0.05, noise = 0 } = options;
    const { freqMultiplier = 1 } = generatorsParams;

    const freqs = freqSpec.map((freq) => freq * freqMultiplier);

    const myArrayBuffer = audioCtx.createBuffer(
      2,
      audioCtx.sampleRate * duration,
      audioCtx.sampleRate
    );

    // Fill the buffer with white noise;
    //just random values between -1.0 and 1.0
    for (let channel = 0; channel < myArrayBuffer.numberOfChannels; channel++) {
      // This gives us the actual ArrayBuffer that contains the data
      const nowBuffering = myArrayBuffer.getChannelData(channel);
      for (let i = 0; i < myArrayBuffer.length; i++) {
        // Math.random() is in [0; 1.0]
        // audio needs to be in [-1.0; 1.0]

        let nextValue =
          freqs
            .map((freq) =>
              Math.sin((2 * Math.PI * freq * i) / audioCtx.sampleRate)
            )
            .reduce((a, b) => a + b, 0) / freqs.length;

        if (noise) {
          nextValue += (Math.random() - 0.5) * noise;
        }

        nowBuffering[i] = nextValue;
      }
    }

    const source = audioCtx.createBufferSource();
    source.buffer = myArrayBuffer;
    return source;
  };

const cluster = (bottom, top, count) => {
  const range = top - bottom;
  const step = range / count;
  return Array(count)
    .fill(undefined)
    .map((_, index) => bottom + index * step);
};

type SoundConstructor = (
  audioCtx: AudioContext,
  audioGenParams?: any
) => AudioScheduledSourceNode;

export type SoundPack = {
  strong: SoundConstructor;
  weak: SoundConstructor;
};

export type SoundPackId = keyof typeof soundPacks;

export const defaultSoundPack: SoundPack = {
  strong: makeFreqSampleFn(cluster(2093, 2113, 6)),
  weak: makeFreqSampleFn(cluster(1046, 1066, 6)),
};

// TODO: Make it so we might be able to adjust the base frequency
// within a sound pack, rather than having to make a new sound pack
export const soundPacks = {
  default: defaultSoundPack,
  inverted: {
    strong: makeFreqSampleFn(cluster(1000, 1020, 6)),
    weak: makeFreqSampleFn(cluster(2000, 2020, 6)),
  },
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
