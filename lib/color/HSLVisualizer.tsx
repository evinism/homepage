import { useState } from "react";
import { parseHSL } from "./color";
import { LegacyColorScores } from "./type";

interface HSLVisualizerProps {
  colorScores: LegacyColorScores,
  bg: string,
};

const bgImages = [
  "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%)",
  "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 100%)",
  "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(0,0,0,1) 100%)",
];

const HSLVisualizer = ({ colorScores, bg }: HSLVisualizerProps) => {
  return (
    <div style={{
      width: 720, height: 200, position: "relative",
      border: "1px solid black",
      backgroundImage: bg,
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
    </div>)
}

interface HSLVisualizerWidgetProps {
  colorScores: LegacyColorScores,
};

const HSLVisualizerWidget = ({ colorScores }: HSLVisualizerWidgetProps) => {
  const [visBG, setVisBG] = useState(0);
  const bg = bgImages[visBG]!;
  return (
    <>
      <HSLVisualizer colorScores={colorScores} bg={bg} />
      <button onClick={() => {
        setVisBG((visBG + bgImages.length - 1) % bgImages.length);
      }}>← Prev</button>
      <button onClick={() => {
        setVisBG((visBG + 1) % bgImages.length);
      }}>Next →</button>
    </>
  )
}

export default HSLVisualizerWidget;