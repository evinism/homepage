import { Button, createTheme, CssBaseline, ThemeProvider, Typography } from "@material-ui/core";
import { useState } from "react";
import { usePersistentState } from "../dmtools/hooks";
import { chooseRandomColor, naturalColorSort } from "./color";
import ColorsByScore from "./ColorsByScore";
import HSLVisualizerWidget from "./HSLVisualizer";
import { ColorScoreValue, ColorScores } from "./type";
import styles from './app.module.css'

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


const ColorChooser = () => {
  const [color, setColor] = useState(chooseRandomColor());
  const [colorScores, setColorScores] = usePersistentState<ColorScores>('colorScores2', {
    order: 'historical',
    scores: [],
  });

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
        <div className={styles.ColorBox} style={{
          backgroundColor: color,
        }}>
        </div>
        <div className={styles.ButtonRow}>
          <Button variant="outlined" onClick={submitColorScore(2)}>Amazing</Button>
          <Button variant="outlined" onClick={submitColorScore(1)}>Good</Button>
          <Button variant="outlined" onClick={submitColorScore(0)}>Neutral</Button>
          <Button variant="outlined" onClick={submitColorScore(-1)}>Meh</Button>
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
        <summary>Debug</summary>
        <pre>
          {JSON.stringify(colorScores, null, 2)}
        </pre>
        <button onClick={() => {
          setColorScores({
            order: 'historical',
            scores: [],
          });
        }}>Reset</button>
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

