// Intentionally vague. Params passed to the generator.
export type GeneratorParameters = {
  [key: string]: any;
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
  (
    sampleRate: number,
    audioCtx: AudioContext,
    generatorsParams: GeneratorParameters
  ): AudioBuffer => {
    const { duration = 0.05, noise = 0 } = options;
    const { freqMultiplier = 1 } = generatorsParams;

    const freqs = freqSpec.map((freq) => freq * freqMultiplier);

    const myArrayBuffer = audioCtx.createBuffer(
      2,
      sampleRate * duration,
      sampleRate
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
            .map((freq) => Math.sin((2 * Math.PI * freq * i) / sampleRate))
            .reduce((a, b) => a + b, 0) / freqs.length;

        if (noise) {
          nextValue += (Math.random() - 0.5) * noise;
        }

        nowBuffering[i] = nextValue;
      }
    }

    return myArrayBuffer;
  };

const cluster = (bottom, top, count) => {
  const range = top - bottom;
  const step = range / count;
  return Array(count)
    .fill(undefined)
    .map((_, index) => bottom + index * step);
};

type BufferConstructor = (
  sampleRate: number,
  audioCtx: AudioContext,
  audioGenParams: GeneratorParameters
) => AudioBuffer;

export type SoundPack = {
  strong: BufferConstructor;
  weak: BufferConstructor;
};

export type SoundPackId = keyof typeof soundPacks;

// Memoize buffer constructors to avoid regenerating buffers on every beat
function memoizeBufferConstructor(
  constructor: BufferConstructor
): BufferConstructor {
  const cache = new Map<string, AudioBuffer>();

  return (
    sampleRate: number,
    audioCtx: AudioContext,
    params: GeneratorParameters
  ): AudioBuffer => {
    // Key by sample rate and parameters
    const key = `${sampleRate}-${JSON.stringify(params)}`;

    if (!cache.has(key)) {
      cache.set(key, constructor(sampleRate, audioCtx, params));
    }

    return cache.get(key)!;
  };
}

export const defaultSoundPack: SoundPack = {
  strong: memoizeBufferConstructor(makeFreqSampleFn(cluster(2093, 2113, 6))),
  weak: memoizeBufferConstructor(makeFreqSampleFn(cluster(1046, 1066, 6))),
};

// TODO: Make it so we might be able to adjust the base frequency
// within a sound pack, rather than having to make a new sound pack
export const soundPacks = {
  default: defaultSoundPack,
  inverted: {
    strong: defaultSoundPack.weak,
    weak: defaultSoundPack.strong,
  },
  dirac: {
    strong: memoizeBufferConstructor(
      (
        sampleRate: number,
        audioCtx: AudioContext,
        _: GeneratorParameters
      ): AudioBuffer => {
        const buffer = audioCtx.createBuffer(1, 1, sampleRate);
        buffer.getChannelData(0)[0] = 1;
        return buffer;
      }
    ),
    weak: memoizeBufferConstructor(
      (
        sampleRate: number,
        audioCtx: AudioContext,
        _: GeneratorParameters
      ): AudioBuffer => {
        const buffer = audioCtx.createBuffer(1, 1, sampleRate);
        buffer.getChannelData(0)[0] = 0.5;
        return buffer;
      }
    ),
  },
};
