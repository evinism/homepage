import { Button, createTheme, CssBaseline, Divider, FormControlLabel, FormGroup, IconButton, List, ListItemButton, MenuItem, Select, Slider, SwipeableDrawer, Switch, ThemeProvider, ToggleButton, Typography } from "@mui/material";
import { useState } from "react";
import { usePersistentState } from "../dmtools/hooks";
import ColorsByScore from "./ColorsByScore";
import HSLVisualizerWidget from "./HSLVisualizer";
import { ColorScores } from "./type";
import styles from './app.module.css'
import ColorsByProperty from "./ColorsByProperty";
import { chooseNewName, deserializeScores, serializeScores } from "./util";
import ColorRater from "./ColorRater";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import MenuIcon from '@mui/icons-material/Menu';
import { ContentCopy, Create, Delete } from "@mui/icons-material";

const lightTheme = createTheme({
  palette: {
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const getFirstPalette = (palettes: { [key: string]: ColorScores }) => {
  return Object.keys(palettes)[0];
}

interface SideDrawerProps {
  palettes: { [key: string]: ColorScores },
  setPalettes: (newPalettes: { [key: string]: ColorScores }) => void;
  currentPaletteId: string;
  setCurrentPaletteId: (newPaletteId: string) => void;
  drawerOpen: boolean;
  setDrawerOpen: (newDrawerOpen: boolean) => void;
  setDarkTheme: (newDarkTheme: boolean) => void;
  darkTheme: boolean;
}

const SideDrawer = ({ palettes, setPalettes, currentPaletteId, setCurrentPaletteId, drawerOpen, setDrawerOpen, darkTheme, setDarkTheme }: SideDrawerProps) => {
  const handleDeletePress = (paletteToDelete: string) => () => {
    if (window.confirm(`Are you sure you want to delete the ${paletteToDelete} palette?`)) {
      const newPalettes = { ...palettes };
      delete newPalettes[paletteToDelete];
      if (!newPalettes[currentPaletteId]) {
        setCurrentPaletteId(getFirstPalette(newPalettes));
      }
      setPalettes(newPalettes);
    }
  }

  const handleRenamePress = (category: string) => () => {
    const newName = prompt('New Palette Name:', category);
    if (newName) {
      if (palettes[newName]) {
        alert('Palette with that name already exists!');
        return;
      }
      const newCategories = { ...palettes };
      newCategories[newName] = newCategories[category];
      delete newCategories[category];
      setPalettes(newCategories);
      setCurrentPaletteId(newName);
    }
  }

  const handleNewPalette = () => {
    const input = prompt('New Palette Name (or paste in a serialized palette):');
    try {
      const { key, value } = deserializeScores(input);
      let newName = chooseNewName(Object.keys(palettes), key);
      setCurrentPaletteId(newName);
      setPalettes({
        ...palettes,
        [newName]: value,
      });
      return;
    } catch (e) {
      if (input) {
        if (palettes[input]) {
          alert('Palette with that name already exists!');
          return;
        }
        setCurrentPaletteId(input);
        setPalettes({
          ...palettes,
          [input]: {
            order: 'historical',
            scores: [],
          },
        });
      }
    }
  };


  const copyPaletteToClipboard = (category: string) => {
    const serialized = serializeScores(palettes[category], category);
    navigator.clipboard.writeText(serialized);
  };

  return (
    <SwipeableDrawer anchor="left" open={drawerOpen}
      onOpen={() => setDrawerOpen(true)}
      onClose={() => setDrawerOpen(false)}
    >
      <div className={styles.SideDrawerInner}>
        <FormGroup>
          <FormControlLabel required control={<Switch
            checked={darkTheme}
            onChange={(e) => setDarkTheme(e.target.checked)}
          />} label="Toggle Light/Dark" />
        </FormGroup>
      <Divider />
        <Typography variant="h6">Palettes</Typography>
      <List component="nav">
        {Object.keys(palettes).map((listCategory) => {
          return (
            <ListItemButton
              key={listCategory}
              selected={listCategory === currentPaletteId}
              onClick={() => {
                setCurrentPaletteId(listCategory);
                setDrawerOpen(false);
              }}
            >
              {listCategory}
              <i>
                &nbsp;
                ({palettes[listCategory].scores.length} colors)
              </i>
              <IconButton onClick={() => copyPaletteToClipboard(listCategory)}>
                <ContentCopy />
              </IconButton>
              <IconButton onClick={handleRenamePress(listCategory)}>
                <DriveFileRenameOutlineIcon />
              </IconButton>
              <IconButton onClick={handleDeletePress(listCategory)}>
                <Delete />
              </IconButton>
            </ListItemButton>
          );
        })}
        </List>
      <Button
        onClick={handleNewPalette}
        startIcon={<Create />}
      >New Palette</Button>
      </div>
    </SwipeableDrawer>
  );
}

interface ColorChooserProps {
  setDarkTheme: (newDarkTheme: boolean) => void;
  darkTheme: boolean;
}

const ColorChooser = ({ setDarkTheme, darkTheme }: ColorChooserProps) => {
  let [palettes, setPalettes] = usePersistentState<{ [key: string]: ColorScores }>('colorScores3', {});
  if (Object.keys(palettes).length === 0) {
    palettes = {
      'Default': {
        order: 'historical',
        scores: [],
      },
    };
  }

  let [currentPaletteId, setCurrentPaletteId] = useState(getFirstPalette(palettes));
  if (!palettes[currentPaletteId]) {
    currentPaletteId = getFirstPalette(palettes);
  }

  const colorScores = palettes[currentPaletteId];
  const setColorScores = (newScores: ColorScores) => {
    setPalettes({
      ...palettes,
      [currentPaletteId]: newScores,
    });
  };

  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <article className={styles.App}>
      <div>
        <IconButton onClick={() => setDrawerOpen(true)}>
          <MenuIcon />
        </IconButton>
        Current Palette: {currentPaletteId}
      </div>
      <SideDrawer palettes={palettes} setPalettes={setPalettes} currentPaletteId={currentPaletteId} setCurrentPaletteId={setCurrentPaletteId} drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}
        setDarkTheme={setDarkTheme}
        darkTheme={darkTheme}
      />
      <Typography variant="h2" align="center">Color Chooser</Typography>
      <ColorRater colorScores={colorScores} setColorScores={setColorScores} />
      <Divider />
      <Typography variant="h5">Colors by Score</Typography>
      <ColorsByScore colorScores={colorScores} />
      <Divider />
      <Typography variant="h5">Colors by Property</Typography>
      <ColorsByProperty scores={colorScores} />
      <details>
        <summary>HSL Visualizer</summary>
        <HSLVisualizerWidget colorScores={colorScores} />
      </details>
      <details>
        <summary>Debug</summary>
        <button onClick={() => {
          navigator.clipboard.writeText(serializeScores(colorScores, currentPaletteId));
        }}>Copy Scores</button>
        <button onClick={() => {
          const serializedScores = prompt('Paste scores here');
          if (serializedScores) {
            setColorScores(deserializeScores(serializedScores).value);
          }
        }}>Paste Scores</button>
        <button onClick={() => {
          if (window.confirm('Are you sure you want to reset?')) {
            setColorScores({
              order: 'historical',
              scores: [],
            });
          }
        }}>Reset</button>
        <pre>
          {JSON.stringify(colorScores, null, 2)}
        </pre>
      </details>
    </article >
  );
};

const App = () => {
  const [useDarkTheme, setDarkTheme] = usePersistentState(
    'useDarkTheme',
    false,
  )

  return (
    <ThemeProvider theme={useDarkTheme ? darkTheme : lightTheme}>
      <CssBaseline />
      <ColorChooser
        setDarkTheme={setDarkTheme}
        darkTheme={useDarkTheme}
      />
    </ThemeProvider>
  );
};

export default App;

