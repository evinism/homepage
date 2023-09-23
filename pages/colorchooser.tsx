import dynamic from "next/dynamic";
import { useState } from "react";


const parseHSL = (hsl: string) => {
  const [h, s, l] = hsl
    .replace("hsl(", "")
    .replace(")", "")
    .split(",")
    .map((s) => s.trim());
  return { h: parseInt(h), s: parseInt(s), l: parseInt(l) };
};

const chooseRandomColor = () => {
  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.pow(Math.random(), 0.5) * 100);
  const l = Math.floor(Math.pow(Math.random(), 0.5) * 100);
  return `hsl(${h}, ${s}%, ${l}%)`;
};

const ColorChooser = () => {
  const [color, setColor] = useState(chooseRandomColor());
  const [colorScores, setColorScores] = useState<{ [key: string]: number }>(
    JSON.parse(localStorage.getItem("colorScores") || "{}")
  );
  const [visBG, setVisBG] = useState("black");

  const submitColorScore = (score: number) => () => {
    let newColorScores = { ...colorScores, [color]: score };
    setColorScores(newColorScores);
    localStorage.setItem("colorScores", JSON.stringify(newColorScores));
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
        <div style={{
          width: 720, height: 200, position: "relative",
          border: "1px solid black",
          backgroundColor: visBG,
          margin: "20px 0",
        }}>
          {Object.entries(colorScores).map(([color, score]) => {
            const {
              h,
              s,
              l,
            } = parseHSL(color);
            const squaredSaturation = (s / 100) ** 2;
            const squaredLucidity = (l / 100) ** 2;
            const left = ((squaredSaturation * h / 360) + (1 - squaredSaturation) * squaredLucidity) * 720;
            return (
              <div
                key={color}
                style={{
                  color: color,
                  height: "10px",
                  position: "absolute",
                  textAlign: "center",
                  lineHeight: "10px",
                  transform: `translate(-50%, -50%)`,
                  left,
                  fontSize: "10px",
                  top: 190 - squaredSaturation * 190,
                }}
              >
                <div style={{}}>
                  {{
                    "-2": "--",
                    "-1": "-",
                    "0": ".",
                    "1": "+",
                    "2": "++",
                  }[score]
                  }
                </div>
              </div>
            );
          })}
        </div>
        <button onClick={() => {
          if (visBG === "black") {
            setVisBG("white");
          } else {
            setVisBG("black");
          }
        }}>Toggle Background</button>

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

