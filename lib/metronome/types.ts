export type BeatStrength = "strong" | "weak" | "off";

export type Beat = {
  strength: BeatStrength;
  duration: number; // Normally 1.0
};

export type Measure = Beat[];
export type Measures = Measure[];
export type BeatFillMethod = BeatStrength | "copyEnd";
