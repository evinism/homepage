import { Button, createTheme, CssBaseline, Divider, IconButton, List, ListItemButton, MenuItem, Select, SwipeableDrawer, ThemeProvider, Typography } from "@mui/material";
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

const darkTheme = createTheme({
  palette: {
  },
});

const predefinedCategories = [
  'Default',
  'General Makeup',
  'Hair',
  'Eye Shadow',
  'Lipstick',
  'Nail',
  'General Fashion',
  'Jewelry',
  'Tops / Dresses',
  'Pants / Skirts',
  'Jackets / Coats',
  'Shoes',
  'Pjs',
  'Underwear',
  'Swimsuit',
  'General Home',
  'Living / Dining Room',
  'Kitchen',
  'Bedroom',
  'Bathroom',
  'Tarot Room',
  'Music Room',
  'Hookah Room',
  'Garden',
];

const getFirstPalette = (palettes: { [key: string]: ColorScores }) => {
  const firstPalette = Object.keys(palettes)[0];
  if (!firstPalette) {
    return 'Default';
  }
  return firstPalette;
}


interface SideDrawerProps {
  palettes: { [key: string]: ColorScores },
  setPalettes: (newPalettes: { [key: string]: ColorScores }) => void;
  paletteId: string;
  setCurrentPaletteId: (newPaletteId: string) => void;
  drawerOpen: boolean;
  setDrawerOpen: (newDrawerOpen: boolean) => void;
}

const SideDrawer = ({ palettes, setPalettes, paletteId, setCurrentPaletteId, drawerOpen, setDrawerOpen }: SideDrawerProps) => {
  const handleDeletePress = (paletteToDelete: string) => () => {
    if (window.confirm(`Are you sure you want to delete the ${paletteToDelete} palette?`)) {
      const newPalettes = { ...palettes };
      delete newPalettes[paletteToDelete];
      console.log(newPalettes);
      if (!newPalettes[paletteId]) {
        setCurrentPaletteId(getFirstPalette(newPalettes));
      }
      setPalettes(newPalettes);
    }
  }

  const handleRenamePress = (category: string) => () => {
    const newName = prompt('New Palette Name:', category);
    if (newName) {
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
      Palettes
      <Divider />
      <List component="nav">
        {Object.keys(palettes).map((listCategory) => {
          return (
            <ListItemButton
              key={listCategory}
              selected={listCategory === paletteId}
              onClick={() => {
                setCurrentPaletteId(listCategory);
                setDrawerOpen(false);
              }}
            >
              {listCategory}
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
      <Divider />
      <Button
        onClick={handleNewPalette}
        startIcon={<Create />}
      >New Palette</Button>
    </SwipeableDrawer>
  );
}

const ColorChooser = () => {
  const [palettes, setPalettes] = usePersistentState<{ [key: string]: ColorScores }>('colorScores3', {});
  if (Object.keys(palettes).length === 0) {
    setPalettes({
      'Default': {
        order: 'historical',
        scores: [],
      },
    });
  }

  const [paletteId, setCurrentPaletteId] = useState(getFirstPalette(palettes));


  const colorScores = palettes[paletteId] ?? {
    order: 'historical',
    scores: [],
  };

  const setColorScores = (newScores: ColorScores) => {
    setPalettes({
      ...palettes,
      [paletteId]: newScores,
    });
  };

  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <article className={styles.App}>
      <div>
        <IconButton onClick={() => setDrawerOpen(true)}>
          <MenuIcon />
        </IconButton>
        Current Palette: {paletteId}
      </div>
      <SideDrawer palettes={palettes} setPalettes={setPalettes} paletteId={paletteId} setCurrentPaletteId={setCurrentPaletteId} drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
      <Typography variant="h2" align="center">Color Chooser</Typography>
      <ColorRater colorScores={colorScores} setColorScores={setColorScores} />
      <details>
        <summary>HSL Visualizer</summary>
        <HSLVisualizerWidget colorScores={colorScores} />
      </details>
      <details>
        <summary>Colors by Score</summary>
        <ColorsByScore colorScores={colorScores} />
      </details>
      <details>
        <summary>Colors by Property</summary>
        <ColorsByProperty scores={colorScores} />
      </details>
      <details>
        <summary>Debug</summary>
        <button onClick={() => {
          navigator.clipboard.writeText(serializeScores(colorScores, paletteId));
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
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ColorChooser />
    </ThemeProvider>
  );
};

export default App;

