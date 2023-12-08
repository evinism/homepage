import { TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Palette } from "./type";
import { deserializeScores, serializationPrefix } from "./util";
import styles from './app.module.css'

interface ComparisonChartsProps {
  leftPalette: Palette;
  rightPalette: Palette;
}

const ComparisonCharts = ({ leftPalette, rightPalette }: ComparisonChartsProps) => {
  return (
    <div>Placeholder</div>
  )
}



interface ColorComparisonWidgetProps {
  palettes: { [key: string]: Palette },
  currentPaletteId: string;
}


const ColorComparisonWidget = ({ palettes, currentPaletteId }: ColorComparisonWidgetProps) => {
  const leftPalette = palettes[currentPaletteId];
  const [rightPaletteSerialized, setRightPaletteSerialized] = useState<string>("");
  const deserialized: { key: string, value: Palette } | null = (() => {
    try {
      return deserializeScores(rightPaletteSerialized);
    } catch (e) {
      return null;
    }
  })();

  const rightPalette = deserialized?.value;
  const rightName = deserialized?.key;

  if (!leftPalette) {
    return null;
  }
  return (
    <div className={styles.ColorChooserWidget}>
      <Typography>Paste your serialized scores you wish to compare against here:</Typography>
      <TextField
        label="Palette"
        value={rightPaletteSerialized}
        placeholder={`${serializationPrefix}gqNrZX...`}
        fullWidth
        onChange={(e) => setRightPaletteSerialized(e.target.value)}
      />
      {!rightPalette && rightPaletteSerialized && <Typography>Not a palette!</Typography>}
      {rightName && <Typography>Comparing {currentPaletteId} against {rightName}</Typography>}
      {rightPalette && <ComparisonCharts leftPalette={leftPalette} rightPalette={rightPalette} />}
    </div>
  );
}

export default ColorComparisonWidget;