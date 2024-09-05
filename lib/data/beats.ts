type BeatStrength = "strong" | "weak" | "off";
type BeatPattern = {
  name: string;
  beats: BeatStrength[];
  group?: string;
};

const library: BeatPattern[] = [
  {
    name: "Rachenitsa",
    beats: ["strong", "off", "strong", "off", "strong", "off", "off", "weak"],
    group: "Bulgarian",
  },
  {
    name: "Paidushko",
    beats: ["strong", "off", "strong", "off", "off"],
    group: "Bulgarian",
  },
  {
    name: "Pravo",
    beats: ["strong", "off", "strong", "off", "strong", "off", "strong", "off"],
    group: "Bulgarian",
  },
];
