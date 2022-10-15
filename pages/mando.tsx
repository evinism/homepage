import { FunctionComponent, useState } from "react";

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

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

const baseChords: Chord[] = [
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

const allChords: Chord[] = baseChords.flatMap((chord) => {
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

const makeFretLine = (fret: number) => {
  const frets = (" ┠" + "─╂".repeat(18)).split("");
  frets[fret * 2] = fret === 0 ? "◯" : "◯";
  return "\u00A0" + frets.join("");
};

interface ChordDisplayProps {
  chord: Chord;
}

const ChordDisplay = ({ chord }: ChordDisplayProps) => {
  const nonOctaveDots = [
    "\u00A0".repeat(7),
    "•",
    "\u00A0".repeat(3),
    "•",
    "\u00A0".repeat(3),
    "•",
    "\u00A0".repeat(5),
    "•",
    "\u00A0".repeat(9),
    "•",
  ].join("");
  const octaveDots = "\u00A0".repeat(25) + "•";
  return (
    <div>
      <div style={{ lineHeight: "20px", fontFamily: "monospace" }}>
        <div>{makeFretLine(chord.shape[3])}</div>
        <div style={{ lineHeight: "0" }}>{octaveDots}</div>
        <div>{makeFretLine(chord.shape[2])}</div>
        <div style={{ lineHeight: "0" }}>{nonOctaveDots}</div>
        <div>{makeFretLine(chord.shape[1])}</div>
        <div style={{ lineHeight: "0" }}>{octaveDots}</div>
        <div>{makeFretLine(chord.shape[0])}</div>
      </div>
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
}

const displayChord = (chord: Chord) => {
  return chord.base + (chord.modifier ? chord.modifier : "");
};

function GameDisplay({ chord, next }: GameDisplayProps) {
  const [answerRevealed, setAnswerRevealed] = useState(false);

  const handleNext = () => {
    setAnswerRevealed(false);
    next();
  };
  return (
    <div>
      <p>
        <ChordDisplay chord={chord} />
      </p>
      <button onClick={handleNext}>Next</button>
      {!answerRevealed && (
        <button onClick={() => setAnswerRevealed(true)}>Show Answer</button>
      )}
      {answerRevealed && <span>{displayChord(chord)}</span>}
    </div>
  );
}

export default function ChordGame(props) {
  const [gameState, setGameState] = useState<GameState>({
    state: "none",
  });

  const makeGameARandomChord = () => {
    const randomChord = allChords[Math.floor(Math.random() * allChords.length)];
    setGameState({
      state: "playing",
      currentChord: randomChord,
    });
  };

  if (gameState.state === "none") {
    return (
      <div>
        <h3>Mando Chord Quiz Tool</h3>
        <p>
          This will shove lots of common (and some uncommon, some nigh
          unplayable) chord shapes at you, all across the fretboard. I made it
          to help me get faster at identifying chords on the fly.
        </p>
        <button onClick={makeGameARandomChord}>Start</button>
      </div>
    );
  } else {
    return (
      <div>
        <h3>Mando Chord Quiz Tool</h3>
        <GameDisplay
          chord={gameState.currentChord}
          next={makeGameARandomChord}
        />
      </div>
    );
  }
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
