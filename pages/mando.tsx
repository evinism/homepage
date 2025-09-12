import { useState } from "react";
import styles from "./mando.module.css";
import FretDiagram from "../components/FretDiagram";

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
    shape: [0, 0, 2, 2],
    base: "G",
    modifier: "maj7",
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
  {
    shape: [5, 3, 0, 0],
    base: "F",
    modifier: "maj7",
  },
  {
    shape: [6, 4, 1, 0],
    base: "F#",
    modifier: "7",
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
    shape: [3, 0, 0, 1],
    base: "A#",
    modifier: "maj7",
  },
  {
    shape: [4, 0, 2, 2],
    base: "B",
    modifier: "m",
  },
  {
    shape: [4, 1, 0, 2],
    base: "B",
    modifier: "7",
  },
  {
    shape: [4, 0, 0, 2],
    base: "B",
    modifier: "m7",
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
    shape: [2, 0, 4, 2],
    base: "D",
    modifier: "maj7",
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
    shape: [2, 6, 4, 0],
    base: "A",
    modifier: "maj7",
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

const expandChords = (rootChords: Chord[], expansions = 11): Chord[] =>
  rootChords.flatMap((chord) => {
    const { shape, base } = chord;
    return Array(expansions + 1)
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
  const [expansions, setExpansions] = useState(12);
  const [enabledRootChords, setEnabledRootChords] = useState(
    knownRootChords.map(() => true)
  );
  const rootChords = knownRootChords.filter((_, i) => enabledRootChords[i]);
  const allChords = expandChords(rootChords, expansions);

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
      <div>
        <label>
          <input type="checkbox" onChange={(e) => setFlip(e.target.checked)} />
          Lefty?
        </label>
      </div>
      <div>
        <label>
          <input
            type="number"
            value={expansions}
            min={0}
            max={14}
            onChange={(e) => setExpansions(parseInt(e.target.value) || 0)}
          />
          How many frets up the fretboard to duplicate chords?
        </label>
      </div>
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
      <button
        onClick={() =>
          setEnabledRootChords(knownRootChords.map((chord) => !chord.modifier))
        }
      >
        Major Only
      </button>
      <button
        onClick={() =>
          setEnabledRootChords(
            knownRootChords.map(
              (chord) => !chord.modifier || chord.modifier === "m"
            )
          )
        }
      >
        Major + Minor
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
