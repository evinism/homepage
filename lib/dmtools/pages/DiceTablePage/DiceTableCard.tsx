import {
  Card,
  Typography,
  CardActions,
  Button,
  CardContent,
  Paper,
  Divider,
  Modal,
  TableContainer,
  TableHead,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Input,
} from "@material-ui/core";
import { DiceTable } from "../../data";
import { outcomesToText, textToOutcomes, chooseFromTable } from "./util";
import { useState } from "react";
import styles from "./DiceTable.module.css";

interface DiceTableCardProps {
  table: DiceTable;
  addEvent: (event: string) => void;
  editSelf: (newTable: DiceTable) => void;
  deleteSelf: () => void;
}

const DiceTableCard = ({
  table,
  addEvent,
  editSelf,
  deleteSelf,
}: DiceTableCardProps) => {
  const [editing, setEditing] = useState(false);
  const trigger = () => addEvent(`${table.name}: ${chooseFromTable(table)}`);
  const confirmDelete = () => {
    if (table.outcomes.length) {
      if (
        !window.confirm(
          "Are you sure you want to delete table " + table.name + "?"
        )
      ) {
        return;
      }
    }
    deleteSelf();
  };

  const editSelfAndClose = (newTable: DiceTable) => {
    setEditing(false);
    editSelf(newTable);
  };
  return (
    <>
      <Card className={styles.diceTableCard}>
        <CardContent className={styles.diceTableCardContent}>
          <Typography variant="h6">{table.name}</Typography>
          <div className={styles.tagRow}>
            {table.tags.map((tag) => (
              <div className={styles.diceTableCardTag}>{tag}</div>
            ))}
          </div>
          <Typography>{table.outcomes.length} outcomes total.</Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" size="medium" onClick={trigger}>
            Trigger
          </Button>
          <Button size="small" onClick={() => setEditing(true)}>
            Edit
          </Button>
          <Button size="small" color="secondary" onClick={confirmDelete}>
            Delete
          </Button>
        </CardActions>
      </Card>
      {editing && (
        <DiceTableEditor
          table={table}
          editSelf={editSelfAndClose}
          close={() => setEditing(false)}
        />
      )}
    </>
  );
};

interface DiceTableEditorProps {
  table: DiceTable;
  editSelf: (newTable: DiceTable) => void;
  close: () => void;
}

const DiceTableEditor = ({ table, editSelf, close }: DiceTableEditorProps) => {
  const [outcomesString, setOutcomesString] = useState<string>(
    outcomesToText(table.outcomes)
  );

  const [titleString, setTitleString] = useState<string>(table.name);
  const [tags, setTags] = useState<string[]>(table.tags);

  const newTable = {
    name: titleString,
    outcomes: textToOutcomes(outcomesString),
    tags: tags,
  };

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setOutcomesString(e.target.value);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleString(e.target.value);
  };

  const buildRemoveTag = (idx: number) => () => {
    const newTags = tags.slice();
    newTags.splice(idx);
    setTags(newTags);
  };

  const addTag = () => {
    const nameToAdd = prompt("Tag name?");
    if (!nameToAdd) {
      return;
    }
    setTags(tags.slice().concat(nameToAdd));
  };

  return (
    <Modal open={true} onClose={close}>
      <Paper
        className={`${styles.diceTableModalFull} ${styles.diceTableModalPaper}`}
      >
        <Typography>
          Table Name:{" "}
          <Input
            type="text"
            value={newTable.name}
            onChange={handleTitleChange}
          />
        </Typography>
        <div className={styles.diceTableEditorTags}>
          Tags:{" "}
          {tags.map((tag, idx) => (
            <div className={styles.diceTableCardTag}>
              {tag} <button onClick={buildRemoveTag(idx)}>✖</button>
            </div>
          ))}
          <button onClick={addTag}>(+) Add Tag</button>
        </div>
        <Divider />
        <Typography>
          One row per effect! To make a row twice as likely to occur, prefix it
          with the characters (2x). Same for 3x, 4x, so on.
        </Typography>
        <div className={styles.dataWrapper}>
          <textarea value={outcomesString} onChange={handleTextFieldChange} />
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Portion</TableCell>
                  <TableCell>Effect</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {newTable.outcomes.map(({ portion, result }) => (
                  <TableRow>
                    <TableCell>{portion}</TableCell>
                    <TableCell>{result}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <Divider />
        <div className={styles.buttonRow}>
          <Button onClick={close}>Cancel</Button>
          <Button variant="contained" onClick={() => editSelf(newTable)}>
            Confirm
          </Button>
        </div>
      </Paper>
    </Modal>
  );
};

export default DiceTableCard;
