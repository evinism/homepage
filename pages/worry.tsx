import { CssBaseline } from "@mui/material";
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
        if (now - state.startTime > writePhaseDuration) {
          moveToMarkPhase();
          clearInterval(interval);
        }
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
      <button onClick={() => setState({
        mode: 'writePhase',
        nextWorry: '',
        startTime: Date.now() - 1,
        worries: [],
      })}>Start</button>
    </>
  }
  if (state.mode === 'writePhase') {
    const timeLeft = writePhaseDuration - (Date.now() - state.startTime);
    return <>
      <p>
        Time left: {prettyPrintTime(timeLeft)}
        {' '}
        <button onClick={moveToMarkPhase}>
          Finish Early
        </button>
      </p>
      <p>
        Write down everything that's worrying you. Don't worry about spelling or grammar, just write down whatever comes to mind.
      </p>
      <form onSubmit={
        (e) => {
          e.preventDefault();
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
        }
      }>
        <input
          value={state.nextWorry}
          autoFocus
          onChange={(e) => setState({
            ...state,
            nextWorry: e.target.value,
          })}
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {state.worries.slice().reverse().map(({ text }) => <li>{text}</li>)}
      </ul>
    </>
  }
  if (state.mode === 'markPhase') {
    return <>
      <p>Cross out anything that you can't do anything about.</p>
      <ul>
        {state.worries.map(({ text, actionable }, idx) => <li
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
          {actionable ? text : <s>{text}</s>}
        </li>)}
      </ul>
    </>
  }
}

const Worry = () => {
  return (
    <div>
      <CssBaseline />
      <div className={style.container}>
        <div className={style.paper}>
          <h1>Worry Tool</h1>
          <article>
            <Widget />
          </article>
        </div>
      </div>
    </div>
  );

};

export default Worry;