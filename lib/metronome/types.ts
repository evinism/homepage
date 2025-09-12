import { BeatStrength } from "./metronome";

export type Measure = BeatStrength[];
export type Measures = Measure[];
export type BeatFillMethod = BeatStrength | "copyEnd";