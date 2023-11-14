import { Slider } from "@material-ui/core";
import { useState } from "react";
import { parseHSL } from "./color";
import { ColorScores } from "./type";

interface HSLVisualizerProps {
  colorScores: ColorScores,
  bg: string,
  iconSize?: number,
};

const bgImages = [
  "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%)",
  "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 100%)",
  "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(0,0,0,1) 100%)",
];

const HSLVisualizer = ({ colorScores, bg, iconSize = 20 }: HSLVisualizerProps) => {

  return (
    <div style={{
      width: 720, height: 200, position: "relative",
      border: "1px solid black",
      backgroundImage: bg,
      margin: "20px 0",
    }}>
      {colorScores.scores.map(({ color, score }) => {
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
              height: `${iconSize}px`,
              position: "absolute",
              textAlign: "center",
              lineHeight: `${iconSize}px`,
              transform: `translate(-50%, -50%)`,
              left: `${left}px`,
              fontSize: `${iconSize}px`,
              top: `${top}px`,
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
  colorScores: ColorScores,
};

const HSLVisualizerWidget = ({ colorScores }: HSLVisualizerWidgetProps) => {
  const [visBG, setVisBG] = useState(0);
  const [visIconSize, setVisIconSize] = useState(20);
  const bg = bgImages[visBG]!;
  return (
    <>
      <HSLVisualizer colorScores={colorScores} bg={bg} iconSize={visIconSize} />
      <button onClick={() => {
        setVisBG((visBG + bgImages.length - 1) % bgImages.length);
      }}>← Prev</button>
      <button onClick={() => {
        setVisBG((visBG + 1) % bgImages.length);
      }}>Next →</button>
      <span>Icon size: {visIconSize}px</span>
      <Slider defaultValue={20}
        step={1}
        min={1}
        max={50}
        value={visIconSize}
        onChange={(e, v) => {
          setVisIconSize(v as number);
        }}

      />
    </>
  )
}

export default HSLVisualizerWidget;