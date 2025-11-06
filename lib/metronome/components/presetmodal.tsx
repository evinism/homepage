import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListSubheader,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import styles from "../index.module.css";
import { PresetStore, defaultPresetStore } from "../presetstore";
import { usePersistentState } from "../../hooks";
import { BeatStrength, Measures } from "../types";
import { useState } from "react";

interface PresetModalProps {
  close: () => void;
  setBpm: (bpm: number) => void;
  setBeats: (beats: Measures) => void;
  beats: Measures;
  bpm: number;
}

const PresetModal = ({
  close,
  setBpm,
  setBeats,
  beats,
  bpm,
}: PresetModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [userPresetStore, setUserPresetStore] = usePersistentState<
    PresetStore[string]
  >("userPresets", {});
  const presetStore = Object.assign(
    { "User Presets": userPresetStore },
    defaultPresetStore
  );

  const searchLower = searchQuery.toLowerCase();
  const filteredPresetStore = Object.fromEntries(
    Object.entries(presetStore).map(([groupName, group]) => {
      const groupMatches = groupName.toLowerCase().includes(searchLower);
      return [
        groupName,
        Object.fromEntries(
          Object.entries(group).filter(([name]) =>
            groupMatches || name.toLowerCase().includes(searchLower)
          )
        ),
      ];
    })
  );

  return (
    <Modal open={true} onClose={close}>
      <Paper className={styles.PresetDialog}>
        <Typography variant="h5">Presets</Typography>
        <Box sx={{ p: 2, pt: 1, pb: 1 }}>
          <TextField
            fullWidth
            placeholder="Search presets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="small"
            variant="outlined"
          />
        </Box>
        <List className={styles.PresetList} disablePadding>
          {Object.entries(filteredPresetStore).map(([groupName, group]) => {
            const entries = Object.entries(group);
            if (entries.length === 0) {
              return null;
            }
            return (
              <>
                <ListSubheader>{groupName}</ListSubheader>
                {entries.map(([name, spec]) => (
                  <ListItem
                    secondaryAction={
                      groupName === "User Presets" && (
                        <IconButton
                          edge="end"
                          aria-label="Delete"
                          onClick={() => {
                            if (
                              confirm(
                                `Are you sure you want to delete preset ${name}?`
                              )
                            ) {
                              const next = { ...userPresetStore };
                              delete next[name];
                              setUserPresetStore(next);
                            }
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )
                    }
                  >
                    <ListItemButton
                      onClick={() => {
                        setBeats(spec.beats);
                        setBpm(spec.bpm);
                        close();
                      }}
                    >
                      <Typography>{name}</Typography>
                    </ListItemButton>
                  </ListItem>
                ))}
              </>
            );
          })}
        </List>
        <Divider />
        <Box className={styles.HorizontalGroup}>
          <Button
            onClick={() => {
              const name = window.prompt("Name your preset");
              if (!name) {
                return;
              }
              setUserPresetStore({
                ...userPresetStore,
                [name]: {
                  beats,
                  bpm,
                },
              });
            }}
          >
            Save Current
          </Button>
          <div className={styles.Spacer} />
          <Button onClick={close}>Close</Button>
        </Box>
      </Paper>
    </Modal>
  );
};

export default PresetModal;
