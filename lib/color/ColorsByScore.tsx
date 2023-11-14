import { ColorScores } from "./type"
import { toColorsByScore } from "./util"

interface Props {
  colorScores: ColorScores,
}

const ColorsByScore = ({ colorScores }: Props) => {
  const colorsByScore = toColorsByScore(colorScores);
  return <>
    {Object.entries(colorsByScore).sort(([a], [b]) => parseInt(b) - parseInt(a)).map(([score, colors]) => {
      return (
        <details style={{ paddingLeft: '8px', borderLeft: '1px solid gray' }}>
          <summary>
            {{
              "-2": "Terrible",
              "-1": "Bad",
              "0": "Meh",
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
    })
    }
  </>
}

export default ColorsByScore;