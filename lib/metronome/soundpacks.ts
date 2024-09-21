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
