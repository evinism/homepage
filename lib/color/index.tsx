import { Button, createTheme, CssBaseline, MenuItem, Select, ThemeProvider, Typography } from "@mui/material";
import { useState } from "react";
import { usePersistentState } from "../dmtools/hooks";
import { chooseRandomColor } from "./color";
import ColorsByScore from "./ColorsByScore";
import HSLVisualizerWidget from "./HSLVisualizer";
import { ColorScoreValue, ColorScores } from "./type";
import styles from './app.module.css'
import ColorsByProperty from "./ColorsByProperty";
import { deserializeScores, serializeScores } from "./util";
import ColorRater from "./ColorRater";

const darkTheme = createTheme({
  palette: {
  },
});


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

const ColorChooser = () => {
  const [category, setCategory] = useState('Default');
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

  return (
    <article className={styles.App}>
      <Typography variant="h2" align="center">Color Chooser</Typography>
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
      <ColorRater colorScores={colorScores} setColorScores={setColorScores} />
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

