import { BorderLeft } from "@material-ui/icons";
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

const bgImages = [
  "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%)",
  "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 100%)",
  "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(0,0,0,1) 100%)",
];

const naturalColorSort = (a: string, b: string) => {
  const { h: h1, s: s1, l: l1 } = parseHSL(a);
  const { h: h2, s: s2, l: l2 } = parseHSL(b);
  if (h1 !== h2) {
    return h1 - h2;
  }
  if (s1 !== s2) {
    return s1 - s2;
  }
  return l1 - l2;
};


const ColorChooser = () => {
  const [color, setColor] = useState(chooseRandomColor());
  const [colorScores, setColorScores] = useState<{ [key: string]: number }>(
    JSON.parse(localStorage.getItem("colorScores") || "{}")
  );
  const [visBG, setVisBG] = useState(0);

  const submitColorScore = (score: number) => () => {
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
        <div style={{
          width: 720, height: 200, position: "relative",
          border: "1px solid black",
          backgroundImage: bgImages[visBG]!,
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
            //const left = ((squaredSaturation * h / 360) + (1 - squaredSaturation) * squaredLucidity) * 720;
            //const top = 190 - squaredSaturation * 190;
            const left = h / 360 * 720;
            const top = (squaredSaturation - squaredLucidity) * 90 + 90;

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
                  top,
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
          setVisBG((visBG + bgImages.length - 1) % bgImages.length);
        }}>← Prev</button>
        <button onClick={() => {
          setVisBG((visBG + 1) % bgImages.length);
        }}>Next →</button>
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

