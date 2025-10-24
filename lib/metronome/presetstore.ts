import { Rhythm } from "./metronome";
import { Beat } from "./types";

export type PresetStore = {
  // Grouped by Topic
  [key: string]: {
    [key: string]: Rhythm;
  };
};

const strong = (): Beat => ({ strength: "strong" });
const weak = (): Beat => ({ strength: "weak" });
const off = (): Beat => ({ strength: "off" });

export const defaultPresetStore: PresetStore = {
  Basic: {
    "4/4": {
      beats: [[strong(), weak(), weak(), weak()]],
      bpm: 120,
    },
    "3/4": {
      beats: [[strong(), weak(), weak()]],
      bpm: 90,
    },
    "6/8": {
      beats: [[strong(), weak(), weak(), strong(), weak(), weak()]],
      bpm: 180,
    },
  },
  "Pan-Balkan": {
    "Syrtos (4/4)": {
      beats: [[strong(), off(), off(), weak(), strong(), off(), weak(), off()]],
      bpm: 250,
    },
    "Chiftetelli (4/4)": {
      beats: [
        [strong(), weak(), off(), weak(), strong(), off(), weak(), off()],
      ],
      bpm: 250,
    },
    "Paidusko (5/8)": {
      beats: [[strong(), off(), strong(), off(), weak()]],
      bpm: 340,
    },
    "Kalamatianos (7/8)": {
      beats: [[strong(), weak(), weak(), strong(), weak(), weak(), weak()]],
      bpm: 120,
    },
    "Mandilatos (7/16)": {
      beats: [[strong(), off(), weak(), off(), strong(), off(), weak()]],
      bpm: 240,
    },
    "Karsilamas (9/8)": {
      beats: [
        [
          strong(),
          off(),
          weak(),
          off(),
          strong(),
          off(),
          weak(),
          off(),
          weak(),
        ],
      ],
      bpm: 280,
    },
    "Agir Roman (9/16)": {
      beats: [
        [
          strong(),
          off(),
          weak(),
          weak(),
          strong(),
          off(),
          weak(),
          weak(),
          strong(),
          off(),
          weak(),
          strong(),
          off(),
          weak(),
          strong(),
          off(),
          weak(),
          weak(),
        ],
      ],
      bpm: 350,
    },
    "Kopanitsa (11/8)": {
      beats: [
        [
          strong(),
          off(),
          weak(),
          off(),
          strong(),
          off(),
          weak(),
          strong(),
          off(),
          weak(),
          off(),
        ],
      ],
      bpm: 340,
    },
    "Leventikos (9/8 + 7/8)": {
      beats: [
        [
          strong(),
          off(),
          weak(),
          off(),
          weak(),
          off(),
          weak(),
          off(),
          off(),
        ],
        [
          strong(),
          off(),
          weak(),
          off(),
          weak(),
          off(),
          off(),
        ],
      ],
      bpm: 250,
    },
    "Berance (7/8 + 5/8)": {
      beats: [
        [
          strong(),
          off(),
          weak(),
          off(),
          weak(),
          off(),
          off(),
        ],
        [
          strong(),
          off(),
          weak(),
          off(),
          off(),
        ],
      ],
      bpm: 200,
    },
  },
};
