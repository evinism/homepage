import { Slider } from "@mui/material";
import { useState } from "react";
import { parseHSL } from "./color";
import { ColorScores } from "./type";
import styles from "./app.module.css";

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
      height: '20vw', position: "relative",
      border: "1px solid black",
      backgroundImage: bg,
      overflow: "hidden",
    }}>
      {colorScores.scores.map(({ color, score }) => {
        const {
          h,
          s,
          l,
        } = parseHSL(color);
        const squaredSaturation = (s / 100) ** 2;
        const squaredLucidity = (l / 100) ** 2;
        const left = h / 360 * 96 + 2;
        const top = (squaredSaturation - squaredLucidity) * 48 + 50;

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
              left: `${left}%`,
              fontSize: `${iconSize}px`,
              top: `${top}%`,
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
      <div className={styles.HSLControls}>
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
      </div>
    </>
  )
}

export default HSLVisualizerWidget;