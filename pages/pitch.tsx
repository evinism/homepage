import { useState } from "react";
import styles from "./pitch.module.css";

type Pitch = {
  note: string;
  octave: number;
};

const noteToFrequency = {
  C: 261.63,
  "C#": 277.18,
  D: 293.66,
  "D#": 311.13,
  E: 329.63,
  F: 349.23,
  "F#": 369.99,
  G: 392.0,
  "G#": 415.3,
  A: 440.0,
  "A#": 466.16,
  B: 493.88,
};

const pitchToFrequency = (pitch: Pitch) => {
  return noteToFrequency[pitch.note] * Math.pow(2, pitch.octave - 4);
};

const randomPitch = () => {
  const notes = Object.keys(noteToFrequency);
  const octaves = [3, 4, 5, 6];
  const randomNote = notes[Math.floor(Math.random() * notes.length)];
  const randomOctave = octaves[Math.floor(Math.random() * octaves.length)];
  return { note: randomNote, octave: randomOctave };
};

const selectRandom = <T extends unknown>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const playPitch = (pitch: Pitch) => {
  const context = new AudioContext();
  const oscillator = context.createOscillator();
  oscillator.type = selectRandom(["sine", "square", "sawtooth", "triangle"]);
  oscillator.frequency.value = pitchToFrequency(pitch);
  oscillator.connect(context.destination);
  oscillator.start();
  setTimeout(() => oscillator.stop(), 1000);
};

const PitchTrainer = () => {
  const [pitch, setPitch] = useState<Pitch | undefined>();
  const handleNewPitch = () => {
    const newPitch = randomPitch();
    setPitch(newPitch);
    playPitch(newPitch);
  };

  return (
    <div className={styles.trainer}>
      <h1>Pitch Trainer</h1>
      <button onClick={handleNewPitch}>New Pitch</button>
      {pitch && <div className={styles.secret}>{pitch.note}</div>}
    </div>
  );
};

export default PitchTrainer;
