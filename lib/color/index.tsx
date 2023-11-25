import { Button, createTheme, CssBaseline, MenuItem, Select, ThemeProvider, Typography } from "@material-ui/core";
import { useState } from "react";
import { usePersistentState } from "../dmtools/hooks";
import { chooseRandomColor, naturalColorSort } from "./color";
import ColorsByScore from "./ColorsByScore";
import HSLVisualizerWidget from "./HSLVisualizer";
import { ColorScoreValue, ColorScores } from "./type";
import styles from './app.module.css'
import ColorsByProperty from "./ColorsByProperty";

const darkTheme = createTheme({
  palette: {
  },
});


const appendColorScore = <T extends 'historical' | 'natural',>(colorScores: ColorScores<T>, color: string, score: ColorScoreValue): ColorScores<T> => {
  const newScores = {
    order: colorScores.order,
    scores: [
      ...colorScores.scores,
      {
        color,
        score,
      },
    ]
  };
  if (colorScores.order === 'natural')
    newScores.scores.sort(({ color: a }, { color: b }) => naturalColorSort(a, b));
  return newScores;
};

const categories = [
  'Default',
  'General Makeup',
  'Hair',
  'Eye Shadow',
  'Lipstick',
  'Nail',
  'General Fashion',
  'Jewelry',
  'Tops / Dresses',
  'Pants / Skirts',
  'Jackets / Coats',
  'Shoes',
  'Pjs',
  'Underwear',
  'Swimsuit',
  'General Home',
  'Living / Dining Room',
  'Kitchen',
  'Bedroom',
  'Bathroom',
  'Tarot Room',
  'Music Room',
  'Hookah Room',
  'Garden',
];

const serializeScores = (scores: ColorScores) => {
  // use base64 encoding to avoid issues with special characters
  return btoa(JSON.stringify(scores));
};

const deserializeScores = (serializedScores: string): ColorScores => {
  return JSON.parse(atob(serializedScores));
};

const ColorChooser = () => {
  const [category, setCategory] = useState('Default');
  const [color, setColor] = useState(chooseRandomColor());
  const [categorizedColorScores, setCategorizedColorScores] = usePersistentState<{ [key: string]: ColorScores }>('colorScores3', {});

  const colorScores = categorizedColorScores[category] ?? {
    order: 'historical',
    scores: [],
  };

  const setColorScores = (newScores: ColorScores) => {
    setCategorizedColorScores({
      ...categorizedColorScores,
      [category]: newScores,
    });
  };

  const submitColorScore = (score: ColorScoreValue) => () => {
    setColorScores(appendColorScore(colorScores, color, score));
    setColor(chooseRandomColor());
  };

  const undo = () => {
    if (colorScores.scores.length === 0) return;
    const prevColor = colorScores.scores[colorScores.scores.length - 1];
    setColorScores({
      order: colorScores.order,
      scores: colorScores.scores.slice(0, -1),
    });
    setColor(prevColor.color);
  };

  return (
    <article className={styles.App}>
      <Typography variant="h2" align="center">Color Chooser</Typography>
      <div className={styles.ColorChooserWidget}>
        <Typography>
          Is this color good or bad?
        </Typography>
        <div className={styles.CategorySelector}>
          Category:&nbsp;
          <Select
            value={category}
            label="Category"
            onChange={(e) => setCategory(e.target.value as string)}
          >
            {categories.map((category) => {
              return (
                <MenuItem key={category} value={category}>{category}</MenuItem>
              );
            })}
          </Select>
        </div>
        <div className={styles.ColorBox} style={{
          backgroundColor: color,
        }}>
        </div>
        <div className={styles.ButtonRow}>
          <Button variant="outlined" onClick={submitColorScore(2)}>Amazing</Button>
          <Button variant="outlined" onClick={submitColorScore(1)}>Good</Button>
          <Button variant="outlined" onClick={submitColorScore(0)}>Meh</Button>
          <Button variant="outlined" onClick={submitColorScore(-1)}>Bad</Button>
          <Button variant="outlined" onClick={submitColorScore(-2)}>Terrible</Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={undo} disabled={colorScores.scores.length === 0}>Undo</Button>
        </div>
      </div>
      <details>
        <summary>HSL Visualizer</summary>
        <HSLVisualizerWidget colorScores={colorScores} />
      </details>
      <details>
        <summary>Colors by Score</summary>
        <ColorsByScore colorScores={colorScores} />
      </details>
      <details>
        <summary>Colors by Property</summary>
        <ColorsByProperty scores={colorScores} />
      </details>
      <details>
        <summary>Debug</summary>
        <button onClick={() => {
          navigator.clipboard.writeText(serializeScores(colorScores));
        }}>Copy Scores</button>
        <button onClick={() => {
          const serializedScores = prompt('Paste scores here');
          if (serializedScores) {
            setColorScores(deserializeScores(serializedScores));
          }
        }}>Paste Scores</button>
        <button onClick={() => {
          if (window.confirm('Are you sure you want to reset?')) {
            setColorScores({
              order: 'historical',
              scores: [],
            });
          }
        }}>Reset</button>
        <pre>
          {JSON.stringify(colorScores, null, 2)}
        </pre>
      </details>
    </article >
  );
};

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ColorChooser />
    </ThemeProvider>
  );
};

export default App;

