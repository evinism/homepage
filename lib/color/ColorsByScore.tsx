import { ColorScores } from "./type"
import { toColorsByScore } from "./util"
import styles from './app.module.css'
import { Typography } from "@mui/material";

interface Props {
  colorScores: ColorScores,
}

const ColorsByScore = ({ colorScores }: Props) => {
  const colorsByScore = toColorsByScore(colorScores);
  return <div className={styles.ColorsByScore}>
    {Object.entries(colorsByScore).sort(([a], [b]) => parseInt(b) - parseInt(a)).map(([score, colors]) => {
      return (
        <>
          <div>
            {{
              "-2": "Terrible",
              "-1": "Bad",
              "0": "Meh",
              "1": "Good",
              "2": "Amazing",
            }[score]
            }
          </div>
          <div key={score} style={{
            display: "flex",
            margin: "0px",
            flexWrap: "wrap",
          }}>

            {colors.map((color) => {
              return (
                <div key={color} style={{
                  backgroundColor: color,
                  width: "25px",
                  height: "25px",
                  margin: "0px",
                }}>
                </div>
              );
            })}
          </div>
        </>
      );
    })
    }
  </div>
}

export default ColorsByScore;