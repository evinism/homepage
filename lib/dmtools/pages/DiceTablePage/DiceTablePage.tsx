import {
  Grid,
  Typography,
  Button,
  Paper,
  Divider,
  Modal,
  Input,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { usePersistentState } from "../../hooks";
import { initialDiceTables, DiceTable } from "../../data";
import DiceTableCard from "./DiceTableCard";
import { useState } from "react";
import { dumpTables, loadTables } from "./util";
import CloseIcon from "@material-ui/icons/Close";
import styles from "./DiceTable.module.css";

interface ImportExportProps {
  tables: DiceTable[];
  setTables: (tables: DiceTable[]) => void;
  close: () => void;
}

const ImportExport = ({ tables, setTables, close }: ImportExportProps) => {
  const tryLoadTables = (data: string) => {
    let tables: DiceTable[] | null;
    try {
      tables = loadTables(data);
    } finally {
    }
    return tables;
  };

  const [text, setText] = useState(dumpTables(tables));
  const newTables = tryLoadTables(text);

  const handleReset = () => {
    window.confirm("Are you sure you want to reset ALL the dice tables?") &&
      setTables(initialDiceTables);
  };

  const handleSecret = async () => {
    const secret = prompt("Secret Code?");
    try {
      const res = await fetch(`https://secrets.evin.dev/dmtools/${secret}.txt`);
      if (!res.ok) {
        throw new Error("Invalid secret code");
      }
      const newText = await res.text();
      setTables(loadTables(newText));
      alert("Secret worked!!");
    } catch (err) {
      alert("Secret didn't work!!");
    }
  };

  return (
    <Modal open={true} onClose={close}>
      <Paper
        className={`${styles.diceTableModalFull} ${styles.diceTableImportExport}`}
      >
        <textarea value={text} onChange={(e) => setText(e.target.value)} />
        <div className={styles.buttonRow}>
          <Button onClick={close}>Cancel</Button>
          <Button onClick={handleSecret}>Enter Secret Code</Button>
          <Button onClick={handleReset}>Reset All Tables to Default</Button>
          <Button
            variant="contained"
            disabled={!newTables}
            onClick={() => newTables && setTables(newTables)}
          >
            Load
          </Button>
        </div>
      </Paper>
    </Modal>
  );
};

const DiceTablePage = () => {
  const [diceTables, setDiceTables] = usePersistentState(
    "dice-tables-v2",
    initialDiceTables
  );
  const [events, setEvents] = usePersistentState<string[]>(
    "dice-table-events",
    []
  );

  const addEvent = (event: string) => {
    const newEvents = events.slice();
    newEvents.unshift(event);
    setEvents(newEvents);
  };
  const buildEditSelf = (idx: number) => (newTable: DiceTable) => {
    const tables = diceTables.slice();
    tables[idx] = newTable;
    setDiceTables(tables);
  };

  const buildDeleteSelf = (idx: number) => () => {
    const nextTables = diceTables.slice();
    nextTables.splice(idx, 1);
    setDiceTables(nextTables);
  };

  const [searchString, setSearchString] = useState("");

  const normForSearch = (str: string) =>
    str.toLowerCase().replace(/[^a-z0-9]/g, "");

  const searchedTables = diceTables.filter((table) =>
    [table.name, ...table.tags].some(
      (str) => normForSearch(str).indexOf(normForSearch(searchString)) > -1
    )
  );

  const gridItems = searchedTables.map((diceTable, idx) => (
    <Grid item xs={6}>
      <DiceTableCard
        table={diceTable}
        addEvent={addEvent}
        editSelf={buildEditSelf(idx)}
        deleteSelf={buildDeleteSelf(idx)}
      />
    </Grid>
  ));

  const handleCreateNew = () => {
    const tables = diceTables.slice();
    tables.push({
      name: "New Table",
      outcomes: [],
      tags: [],
    });
    setDiceTables(tables);
  };

  const [importExportShown, setImportExportShown] = useState(false);

  const setAndClose = (diceTables: DiceTable[]) => {
    setDiceTables(diceTables);
    setImportExportShown(false);
  };

  return (
    <div className={styles.diceTablePage}>
      <Typography variant="h5">Dice Tables!</Typography>
      <div className={styles.diceTableGrid}>
        <div>
          <Input
            type="text"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            placeholder="Search..."
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => setSearchString("")} edge="end">
                  <CloseIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </div>
        <div className={styles.diceTableGridCards}>
          {gridItems.length > 0 ? (
            <Grid container spacing={2}>
              {gridItems}
            </Grid>
          ) : (
            <Typography className={styles.noTablesMatch} variant="h6">
              No Tables Match
            </Typography>
          )}
        </div>
        <div className={styles.buttonRow}>
          <Button onClick={() => setImportExportShown(true)}>
            Import / Export Tables
          </Button>
          <Button variant="contained" onClick={handleCreateNew}>
            + Create New
          </Button>
        </div>
      </div>
      <Paper className={styles.events}>
        <Typography variant="h6">Rolls</Typography>
        {events.map((event) => (
          <>
            <Divider />
            <Typography>{event}</Typography>
          </>
        ))}
        <Divider />
        <Button variant="outlined" onClick={() => setEvents([])}>
          Clear Events
        </Button>
      </Paper>
      {importExportShown && (
        <ImportExport
          tables={diceTables}
          setTables={setAndClose}
          close={() => setImportExportShown(false)}
        />
      )}
    </div>
  );
};

export default DiceTablePage;
