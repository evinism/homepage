import { CheckBox } from "@mui/icons-material";
import { Button, Checkbox, createTheme, CssBaseline, Input, List, ListItem, ListItemIcon, ListItemText, TextField, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import style from './worry.module.css';

type WorryState = {
  mode: 'notStarted',
} | {
  mode: 'writePhase',
  nextWorry: string,
  startTime: number,
  worries: {
    text: string,
  }[],
} | {
  mode: 'markPhase',
  worries: {
    text: string,
    actionable: boolean,
  }[],
};

const writePhaseDuration = 15 * 60 * 1000;

const prettyPrintTime = (timeMs: number) => {
  const seconds = Math.floor(timeMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const Widget = () => {
  const [state, setState] = useState<WorryState>({
    mode: 'notStarted',
  });
  const [_, setDummyTimer] = useState<number | null>(null);

  const moveToMarkPhase = () => {
    if (state.mode !== 'writePhase') return;
    setState({
      mode: 'markPhase',
      worries: state.worries.map(({ text }) => ({
        text,
        actionable: true,
      })),
    });
  };

  useEffect(() => {
    if (state.mode === 'writePhase') {
      const interval = setInterval(() => {
        const now = Date.now();
        setDummyTimer(now);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [state.mode]);

  if (state.mode === 'notStarted') {
    return <>
      <p>
        Write down everything that's worrying you. Don't worry about spelling or grammar, just write down whatever comes to mind.
        Afterwards, go through your list and cross out anything that you can't do anything about.
      </p>
      <Button onClick={() => setState({
        mode: 'writePhase',
        nextWorry: '',
        startTime: Date.now() - 1,
        worries: [],
      })}>Start</Button>
    </>
  }
  if (state.mode === 'writePhase') {
    const timeLeft = Math.max(writePhaseDuration - (Date.now() - state.startTime), 0);

    const addWorry = () => {
      setState({
        ...state,
        nextWorry: '',
        worries: [
          ...state.worries,
          {
            text: state.nextWorry,
          },
        ],
      });
    };

    return <>
      <p>
        Time left: {prettyPrintTime(timeLeft)}
        {' '}
        <Button onClick={moveToMarkPhase}>
          {timeLeft > 0 ? 'Finish early' : 'Finish'}
        </Button>
      </p>
      <p>
        Write down everything that's worrying you. Don't worry about spelling or grammar, just write down whatever comes to mind.
      </p>
      <form onSubmit={
        (e) => {
          e.preventDefault();
          addWorry();
        }
      }>
        <TextField
          value={state.nextWorry}
          multiline
          autoFocus
          fullWidth
          onChange={(e) => setState({
            ...state,
            nextWorry: e.target.value,
          })}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              addWorry();
            }
          }}
        />
        <Button type="submit"
          disabled={state.nextWorry === ''}
        >Add</Button>
      </form>
      <ul>
        {state.worries.slice().reverse().map(({ text }) => <li>{text}</li>)}
      </ul>
    </>
  }
  if (state.mode === 'markPhase') {
    return <>
      <p>Cross out anything that you can't do anything about.</p>
      <List>
        {state.worries.map(({ text, actionable }, idx) =>
          <ListItem
            key={text}
            disablePadding
          onClick={() => {
            const newWorries = state.worries.slice();
            newWorries[idx] = {
              text,
              actionable: !actionable,
            };
            setState({
              ...state,
              worries: newWorries,
            });
          }}
        >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={actionable}
                tabIndex={-1}
                disableRipple
                aria-labelledby={`checkbox-list-label-${idx}`}
              />
            </ListItemIcon>
            <ListItemText
              id={`checkbox-list-label-${idx}`}
              primary={actionable ? text : <s>{text}</s>} />
          </ListItem>)}
      </List>
      <Button onClick={() => {
        if (
          window.confirm('Are you sure you want to restart? This will delete everything.')
        )
          setState({
            mode: 'notStarted',
          });
      }}>Restart</Button>
    </>
  }
}

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

const Worry = () => {
  return (
    <div>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <div className={style.container}>
          <div className={style.paper}>
            <h1>Worry Tool</h1>
            <article>
              <Widget />
            </article>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );

};

export default Worry;