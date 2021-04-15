import React from "react";
import Pipe from "../../shared/pipe";
import { ScreenCommand } from "../../shared/screenTypes";
import OS from "../../vm/os";
import OsProvider from "./OsProvider";
import Screen from "./Screen";
import styles from "./App.module.scss";
import MobileCommands from "./MobileCommands";

interface AppState {
  output: string;
  off: boolean;
}

// lol lenses
function changeParam<K extends keyof AppState>(key: K) {
  return (fn: (value: AppState[typeof key]) => void) => (state: AppState) => ({
    ...state,
    [key]: fn(state[key]),
  });
}

const changeOutput = changeParam("output");
const changeOff = changeParam("off");

const isPrintableKey = (key) => key && key.length === 1;

// Ewww.
function preprocessKeydown(event): [string, boolean] | undefined {
  const keyCode = event.which || event.keyCode;
  const key = event.key;
  let toSend: string;
  let eof = false;
  if (keyCode === 229) {
    this.handleMobileKeyboard(event);
    return;
  } else if (keyCode === 8) {
    toSend = "\b";
  } else if (keyCode === 9) {
    // Tab
    event.preventDefault();
    toSend = "\t";
  } else if (keyCode === 68 && event.ctrlKey) {
    // Ctrl-D
    event.preventDefault();
    toSend = "\n";
    eof = true;
  } else if (keyCode === 13) {
    // Enter
    toSend = "\n";
  } else if (isPrintableKey(key)) {
    // Everything else
    toSend = key;
  }

  if (toSend) {
    return [toSend, eof];
  }
  return undefined;
}

interface AppProps {
  screenPipe: Pipe<ScreenCommand>;
  keyPipe: Pipe<[string, boolean]>;
  os: OS;
}

class App extends React.Component<AppProps, AppState> {
  state = { output: "", off: false };
  button: undefined | HTMLButtonElement;

  constructor(props: AppProps) {
    super(props);
    props.screenPipe.subscribe((str) => this.writeToScreen(str));
  }

  componentDidMount() {
    window.addEventListener("click", this.handleWindowClick);
    this.refocus();
  }

  handleWindowClick = () => {
    if (window.getSelection()?.isCollapsed) {
      this.refocus();
    }
  };

  refocus = () => {
    // Annoying weird focusing stuff
    const input = document.querySelector(".screen-input");
    (input as any).focus();
  };

  scrollToBottom = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

  writeToScreen(cmd: ScreenCommand) {
    const cb = () => {
      this.scrollToBottom();
    };
    switch (cmd.type) {
      case "appendCommand": {
        const str = cmd.data;
        this.setState(
          changeOutput((output) => output + str),
          cb
        );
        break;
      }
      case "clearCommand": {
        this.setState(
          changeOutput(() => ""),
          cb
        );
        break;
      }
      case "removeCommand": {
        this.setState(
          changeOutput((output) => output.substr(0, output.length - 1)),
          cb
        );
        break;
      }
      case "offCommand": {
        this.setState(changeOff(() => true));
        break;
      }
      default:
        return;
    }
  }

  handleKeydown = (event) => {
    const tuple = preprocessKeydown(event);
    if (tuple) {
      this.props.keyPipe.fire(tuple);
    }
  };

  render() {
    return (
      <div className={styles.app}>
        <Screen
          output={this.state.output}
          off={this.state.off}
          onKeyDown={this.handleKeydown}
        />
        <MobileCommands keyPipe={this.props.keyPipe} />
      </div>
    );
  }
}

export default OsProvider<{}>(App);
