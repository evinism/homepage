import { ClickAwayListener, Popover, Slider, Typography } from "@mui/material";
import styles from "../index.module.css";
import { Beat } from "../types";
import { on } from "events";


const BeatContextMenu = ({
  onClose = () => {},
  beat,
  open,
  changeBeatDuration,
  anchorEl = null,
}: {
  onClose?: () => void;
  beat: Beat;
  open: boolean;
  changeBeatDuration: (duration: number) => void;
  anchorEl?: HTMLElement | null;
}) => {
  return (
    <Popover
      id={"beat-context-menu"}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <div className={styles.BeatContextMenu}>
        <Slider
          aria-label="Beat Duration"
          defaultValue={1}
          step={0.01}
          min={0.1}
          max={2}
          value={beat.duration}
          onChange={(_, value) => {
            changeBeatDuration(value as number);
          }}
        />
        Duration Multiplier: {beat.duration}
      </div>
    </Popover>
  );
}

export default BeatContextMenu;
