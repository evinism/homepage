import { Rhythm } from "./metronome";
import { Beat } from "./types";

export type PresetStore = {
  // Grouped by Topic
  [key: string]: {
    [key: string]: Rhythm;
  };
};

const strong = (duration: number = 1): Beat => ({
  strength: "strong",
  duration,
});
const weak = (duration: number = 1): Beat => ({ strength: "weak", duration });
const off = (duration: number = 1): Beat => ({ strength: "off", duration });

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
    test: {
      beats: [[strong(1), weak(1), strong(1 / 3), weak(1 / 3), weak(1 / 3)]],
      bpm: 120,
    },
  },
  Greek: {
    "Syrtos (4/4)": {
      beats: [[strong(), off(), off(), weak(), strong(), off(), weak(), off()]],
      bpm: 250,
    },
    "Kalamatianos (7/8)": {
      beats: [[strong(), weak(), weak(), strong(), weak(), weak(), weak()]],
      bpm: 120,
    },
    "Mandilatos (7/8)": {
      beats: [[strong(), off(), weak(), off(), strong(), off(), weak()]],
      bpm: 240,
    },
    "Leventikos (9/16 + 7/16)": {
      beats: [
        [strong(), off(), weak(), off(), weak(), off(), weak(), off(), off()],
        [strong(), off(), weak(), off(), weak(), off(), off()],
      ],
      bpm: 360,
    },
    "Zebekiko (9/4)": {
      beats: [
        [
          strong(),
          off(),
          weak(),
          weak(),
          strong(),
          off(),
          weak(),
          off(),
          strong(),
          off(),
          weak(),
          weak(),
          strong(),
          off(),
          strong(),
          off(),
          strong(),
          off(),
        ],
      ],
      bpm: 160,
    },
    "Hasapiko (9/4)": {
      beats: [
        [
          strong(),
          off(),
          strong(),
          off(),
          strong(),
          off(),
          strong(),
          off(),
          weak(),
          weak(),
          strong(),
          off(),
          weak(),
          off(),
          strong(),
          off(),
          weak(),
          weak(),
        ],
      ],
      bpm: 160,
    },
  },
  "Pan-Balkan": {
    "Chiftetelli (4/4)": {
      beats: [
        [strong(), weak(), off(), weak(), strong(), off(), weak(), off()],
      ],
      bpm: 250,
    },
    "Paidusko (5/16)": {
      beats: [[strong(), off(), strong(), off(), weak()]],
      bpm: 340,
    },
    "Chetvorno (7/16)": {
      beats: [[strong(), off(), weak(), strong(), off(), weak(), off()]],
      bpm: 360,
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
    "Kopanitsa (11/16)": {
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
    "Berance (7/8 + 5/8)": {
      beats: [
        [strong(), off(), weak(), off(), weak(), off(), off()],
        [strong(), off(), weak(), off(), off()],
      ],
      bpm: 200,
    },
    "Sandansko Horo (22/16)": {
      beats: [
        [
          // ---
          strong(),
          off(),
          weak(),
          off(),
          strong(),
          off(),
          weak(),
          off(),
          off(),
          // ---
          strong(),
          off(),
          weak(),
          off(),
          strong(),
          off(),
          weak(),
          off(),
          off(),
          // ---
          weak(),
          off(),
          weak(),
          off(),
        ],
      ],
      bpm: 320,
    },
  },
  Turkish: {
    "Aksak Semai (10/8)": {
      beats: [
        [
          strong(),
          off(),
          strong(),
          weak(),
          off(),
          strong(),
          off(),
          weak(),
          off(),
          weak(),
        ],
      ],
      bpm: 120,
    },
    "Agir Roman (9/8)": {
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
  },
};
