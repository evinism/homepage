import { Slider, Typography } from "@mui/material"
import { useState } from "react"
import { parseHSL } from "./color"
import { ColorScores } from "./type"
import UpDownGraph from "./UpDownGraph"
import { toNaturalSort } from "./util"

const ColorsByProperty = ({ scores }: { scores: ColorScores }) => {
  const naturallySorted = toNaturalSort(scores);
  const [numBuckets, setNumBuckets] = useState(20);
  return (
    <div>
      <Typography>Number of Buckets: {numBuckets}</Typography>
      <Slider value={numBuckets} onChange={(_, value) => setNumBuckets(value as number)} min={1} max={100} />
      Hue:
      <UpDownGraph
        bucketer={({ color }) => parseHSL(color).h}
        numBuckets={numBuckets}
        max={360}
        min={0}
        scores={naturallySorted}
      />
      Saturation:
      <UpDownGraph
        bucketer={({ color }) => (parseHSL(color).s / 100) ** 2}
        numBuckets={numBuckets}
        max={1}
        min={0}
        scores={naturallySorted}
      />
      Lucidity:
      <UpDownGraph
        bucketer={({ color }) => (parseHSL(color).l / 100) ** 2}
        numBuckets={numBuckets}
        max={1}
        min={0}
        scores={naturallySorted}
      />
    </div>
  )
}

export default ColorsByProperty; 