
import { Button, createTheme, CssBaseline, MenuItem, Select, ThemeProvider, Typography } from "@mui/material";
import { useState } from "react";
import { chooseRandomColor, naturalColorSort } from "./color";
import { ColorScores, ColorScoreValue } from "./type";

import styles from './app.module.css'


interface ColorRaterProps {
  colorScores: ColorScores,
  setColorScores: (newScores: ColorScores) => void,
}

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


const ColorRater = ({ colorScores, setColorScores }: ColorRaterProps) => {
  const [color, setColor] = useState(chooseRandomColor());

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

  return (<div className={styles.ColorChooserWidget}>
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
      <Button variant="outlined" onClick={submitColorScore(0)}>Meh</Button>
      <Button variant="outlined" onClick={submitColorScore(-1)}>Bad</Button>
      <Button variant="outlined" onClick={submitColorScore(-2)}>Terrible</Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={undo} disabled={colorScores.scores.length === 0}>Undo</Button>
    </div>
  </div>
  );
}

export default ColorRater;