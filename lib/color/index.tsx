import dynamic from "next/dynamic";
import { useState } from "react";
import { usePersistentState } from "../dmtools/hooks";
import { chooseRandomColor, naturalColorSort } from "./color";
import ColorsByScore from "./ColorsByScore";
import HSLVisualizerWidget from "./HSLVisualizer";
import { ColorScoreValue, ColorScores } from "./type";



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
}


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


  return (
    <article style={{ padding: 20 }}>
      <h1>Color Chooser</h1>
      <div>
        Is this color good or bad?
        <div style={{
          backgroundColor: color,
          width: "200px",
          height: "200px",
        }}>
        </div>
        <div>
          <button onClick={submitColorScore(2)}>Amazing</button>
          <button onClick={submitColorScore(1)}>Good</button>
          <button onClick={submitColorScore(0)}>Neutral</button>
          <button onClick={submitColorScore(-1)}>Meh</button>
          <button onClick={submitColorScore(-2)}>Terrible</button>
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

export default dynamic(() => Promise.resolve(ColorChooser), { ssr: false });

