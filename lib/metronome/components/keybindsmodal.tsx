import {
  Button,
  List,
  ListItem,
  Modal,
  Paper,
  Typography,
} from "@mui/material";

import SpaceBarIcon from "@mui/icons-material/SpaceBar";

import styles from "../index.module.css";

const K = ({ children }) => (
  <span className={styles.KeyRepresentation}>{children}</span>
);

const Keybinds = ({ close }: { close: () => void }) => {
  return (
    <Modal onClose={close} open={true} className={styles.KeybindsModal}>
      <Paper>
        <Typography variant="h5">Keyboard Shortcuts</Typography>
        <List>
          {[
            [<SpaceBarIcon />, "Play / Pause"],
            ["←", "Decrease Tempo"],
            ["→", "Increase Tempo"],
            ["/", "Tap Tempo"],
            [",", "Tap Rhythm (Strong Beat)"],
            [".", "Tap Rhythm (Weak Beat)"],
          ].map(([key, description]) => (
            <ListItem className={styles.KBSLine}>
              <K>{key}</K> <span>{description}</span>
            </ListItem>
          ))}
        </List>
        <Button onClick={close}>Close</Button>
      </Paper>
    </Modal>
  );
};

export default Keybinds;
