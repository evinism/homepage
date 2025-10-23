export type BeatStrength = "strong" | "weak" | "off";

export type Beat = {
  strength: BeatStrength;
};

export type Measure = Beat[];
export type Measures = Measure[];
export type BeatFillMethod = BeatStrength | "copyEnd";
