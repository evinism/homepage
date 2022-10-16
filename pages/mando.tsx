import { useState } from "react";
import styles from "./mando.module.css";

type Optional<T> = T | undefined;

type Note =
  | "A"
  | "A#"
  | "B"
  | "C"
  | "C#"
  | "D"
  | "D#"
  | "E"
  | "F"
  | "F#"
  | "G"
  | "G#";

type Shape = [
  Optional<number>,
  Optional<number>,
  Optional<number>,
  Optional<number>
];

type Chord = {
  shape: Shape;
  base: Note;
  modifier?: "m" | "7" | "maj7" | "m7";
};

const noteOrder: Note[] = [
  "A",
  "A#",
  "B",
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
];

const knownRootChords: Chord[] = [
  {
    shape: [0, 0, 2, 3],
    base: "G",
  },
  {
    shape: [0, 0, 1, 3],
    base: "G",
    modifier: "m",
  },
  {
    shape: [0, 0, 2, 1],
    base: "G",
    modifier: "7",
  },
  {
    shape: [0, 3, 2, 3],
    base: "G",
    modifier: "7",
  },
  {
    shape: [0, 0, 1, 1],
    base: "G",
    modifier: "m7",
  },
  // ---
  {
    shape: [5, 3, 0, 1],
    base: "F",
  },
  // ---
  {
    shape: [0, 2, 3, 0],
    base: "C",
  },
  {
    shape: [0, 2, 3, 3],
    base: "C",
  },
  {
    shape: [0, 2, 1, 0],
    base: "C",
    modifier: "7",
  },
  {
    shape: [0, 1, 3, 3],
    base: "C",
    modifier: "m",
  },
  // ---
  {
    shape: [3, 0, 1, 1],
    base: "A#",
  },
  {
    shape: [4, 0, 2, 2],
    base: "B",
    modifier: "m",
  },
  // ---
  {
    shape: [2, 0, 0, 2],
    base: "D",
  },
  {
    shape: [2, 0, 3, 2],
    base: "D",
    modifier: "7",
  },
  {
    shape: [2, 0, 0, 1],
    base: "D",
    modifier: "m",
  },
  {
    shape: [2, 0, 3, 1],
    base: "D",
    modifier: "m7",
  },
  // ---
  {
    shape: [2, 2, 4, 0],
    base: "A",
  },
  {
    shape: [6, 2, 0, 0],
    base: "A",
  },
  {
    shape: [2, 5, 4, 0],
    base: "A",
    modifier: "7",
  },
  {
    shape: [2, 2, 3, 0],
    base: "A",
    modifier: "m",
  },
  {
    shape: [2, 5, 3, 0],
    base: "A",
    modifier: "m7",
  },
  // ---
  {
    shape: [1, 2, 2, 0],
    base: "E",
  },
  {
    shape: [1, 0, 2, 0],
    base: "E",
    modifier: "7",
  },
  {
    shape: [0, 2, 2, 0],
    base: "E",
    modifier: "m",
  },
  // ---
  {
    shape: [0, 1, 1, 3],
    base: "D#",
  },
];

const expandChords = (rootChords: Chord[]): Chord[] =>
  rootChords.flatMap((chord) => {
    const { shape, base } = chord;
    return Array(12)
      .fill(0)
      .map((_, i) => {
        const newShape = shape.map((fret) => {
          return fret + i;
        });
        return {
          shape: newShape as Shape,
          base: noteOrder[(noteOrder.indexOf(base) + i) % 12],
          modifier: chord.modifier,
        };
      });
  });

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

type GameState =
  | {
      state: "none";
    }
  | {
      state: "playing";
      currentChord: Chord;
    };

interface GameDisplayProps {
  chord: Chord;
  next: () => void;
  flip: boolean;
}

const displayChord = (chord: Chord) => {
  return chord.base + (chord.modifier ? chord.modifier : "");
};

function GameDisplay({ chord, next, flip }: GameDisplayProps) {
  const [answerRevealed, setAnswerRevealed] = useState(false);

  const handleNext = () => {
    setAnswerRevealed(false);
    next();
  };
  return (
    <div>
      <p>
        <FretDiagram shape={chord.shape} flip={flip} />
      </p>
      <button onClick={handleNext}>Next</button>
      {!answerRevealed && (
        <button onClick={() => setAnswerRevealed(true)}>Show Answer</button>
      )}
      {answerRevealed && <span>{displayChord(chord)}</span>}
    </div>
  );
}

function sample<T>(arr: T[]): Optional<T> {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function ChordGame(props) {
  const [gameState, setGameState] = useState<GameState>({
    state: "none",
  });

  const [flip, setFlip] = useState(false);
  const [enabledRootChords, setEnabledRootChords] = useState(
    knownRootChords.map(() => true)
  );
  const rootChords = knownRootChords.filter((_, i) => enabledRootChords[i]);
  const allChords = expandChords(rootChords);

  const makeGameARandomChord = () => {
    const newChord = sample(allChords);
    if (newChord) {
      setGameState({
        state: "playing",
        currentChord: newChord,
      });
    } else {
      alert("No chords enabled!");
    }
  };

  const inner =
    gameState.state === "none" ? (
      <>
        <p>
          This will shove lots of common (and some uncommon, some nigh
          unplayable) chord shapes at you, all across the fretboard. I made it
          to help me get faster at identifying chords on the fly.
        </p>
        <button onClick={makeGameARandomChord}>Start</button>
      </>
    ) : (
      <GameDisplay
        chord={gameState.currentChord}
        next={makeGameARandomChord}
        flip={flip}
      />
    );

  const settingsSlot = (
    <>
      <label>
        <input type="checkbox" onChange={(e) => setFlip(e.target.checked)} />
        Lefty?
      </label>
      <h4>Enabled Root Chords</h4>
      <button
        onClick={() => setEnabledRootChords(knownRootChords.map(() => true))}
      >
        All
      </button>
      <button
        onClick={() => setEnabledRootChords(knownRootChords.map(() => false))}
      >
        None
      </button>
      <ul>
        {knownRootChords.map((chord, i) => (
          <li key={i} className={styles.rootchordli}>
            <label>
              <input
                type="checkbox"
                checked={enabledRootChords[i]}
                onChange={(e) => {
                  const newEnabledRootChords = [...enabledRootChords];
                  newEnabledRootChords[i] = e.target.checked;
                  setEnabledRootChords(newEnabledRootChords);
                }}
              />{" "}
              {displayChord(chord)}
              <FretDiagram shape={chord.shape} numFrets={6} />
            </label>
          </li>
        ))}
      </ul>
    </>
  );

  return (
    <main className={styles.mando}>
      <h3>Mando Chord Quiz Tool</h3>
      {inner}
      <details>
        <summary>Settings</summary>
        <div className={styles.settingsslot}>{settingsSlot}</div>
      </details>
    </main>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
