import styles from "./FretDiagram.module.css";

type Shape = [
  Optional<number>,
  Optional<number>,
  Optional<number>,
  Optional<number>
];

type Optional<T> = T | undefined;

const makeFretLine = (fret: Optional<number>, length = 18, noteName = "") => {
  const frets = (" ┠" + "─╂".repeat(length)).split("");
  if (fret !== undefined) {
    frets[fret * 2] = fret === 0 ? "◯" : "◯";
  }
  return noteName + "\u00A0" + frets.join("");
};

interface ChordDisplayProps {
  shape: Shape;
  flip?: boolean;
  numFrets?: number;
}

const FretDiagram = ({ shape, flip, numFrets = 18 }: ChordDisplayProps) => {
  const lenInChars = numFrets * 2 + 3;
  const nonOctaveDots = [
    "\u00A0".repeat(8),
    "•",
    "\u00A0".repeat(3),
    "•",
    "\u00A0".repeat(3),
    "•",
    "\u00A0".repeat(5),
    "•",
    "\u00A0".repeat(9),
    "•",
  ]
    .join("")
    .slice(0, lenInChars);
  const octaveDots = ("\u00A0".repeat(26) + "•").slice(0, lenInChars);

  let noteNames = ["E", "A", "D", "G"];

  if (flip) {
    shape = shape.slice().reverse() as Shape;
    noteNames = noteNames.slice().reverse();
  }

  return (
    <div className={styles.fretdiagram}>
      <div>{makeFretLine(shape[3], numFrets, noteNames[0])}</div>
      <div className={styles.noheight}>{octaveDots}</div>
      <div>{makeFretLine(shape[2], numFrets, noteNames[1])}</div>
      <div className={styles.noheight}>{nonOctaveDots}</div>
      <div>{makeFretLine(shape[1], numFrets, noteNames[2])}</div>
      <div className={styles.noheight}>{octaveDots}</div>
      <div>{makeFretLine(shape[0], numFrets, noteNames[3])}</div>
    </div>
  );
};

export default FretDiagram;