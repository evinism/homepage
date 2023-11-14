import dynamic from "next/dynamic";
import { useState } from "react";
import { chooseRandomColor, naturalColorSort } from "./color";
import HSLVisualizerWidget from "./HSLVisualizer";
import { ColorScoreValue, LegacyColorScores } from "./type";

const ColorChooser = () => {
  const [color, setColor] = useState(chooseRandomColor());
  const [colorScores, setColorScores] = useState<LegacyColorScores>(
    JSON.parse(localStorage.getItem("colorScores") || "{}")
  );

  const submitColorScore = (score: ColorScoreValue) => () => {
    let newColorScores = { ...colorScores, [color]: score };
    setColorScores(newColorScores);
    localStorage.setItem("colorScores", JSON.stringify(newColorScores));
    setColor(chooseRandomColor());
  };

  const colorsByScore = Object.entries(colorScores).reduce((acc, [color, score]) => {
    if (!acc[score]) {
      acc[score] = [];
    }
    acc[score].push(color);
    return acc;
  }, {} as { [key: number]: string[] });

  Object.values(colorsByScore).forEach((colors) => {
    colors.sort(naturalColorSort);
  });

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

        {Object.entries(colorsByScore).sort(([a], [b]) => parseInt(b) - parseInt(a)).map(([score, colors]) => {
          return (
            <details style={{ paddingLeft: '8px', borderLeft: '1px solid gray' }}>
              <summary>
                {{
                  "-2": "Terrible",
                  "-1": "Meh",
                  "0": "Neutral",
                  "1": "Good",
                  "2": "Amazing",
                }[score]
                }
              </summary>
              <div key={score} style={{
                display: "flex",
                margin: "0px",
                flexWrap: "wrap",
              }}>

                {colors.map((color) => {
                  return (
                    <div key={color} style={{
                      backgroundColor: color,
                      width: "50px",
                      height: "50px",
                      margin: "0px",
                    }}>
                    </div>
                  );
                })}
              </div>
            </details>

          );
        })}
      </details>
      <details>
        <summary>Debug</summary>
        <pre>
          {JSON.stringify(colorScores, null, 2)}
        </pre>
        <button onClick={() => {
          localStorage.setItem("colorScores", "{}");
          setColorScores({});
        }}>Reset</button>
      </details>
    </article >
  );
};

export default dynamic(() => Promise.resolve(ColorChooser), { ssr: false });

