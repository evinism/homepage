import React from "react";
import Pipe from "../../shared/pipe";
import { ScreenCommand } from "../../shared/screenTypes";
import OS from "../../vm/os";
import OsProvider from "./OsProvider";
import Screen from "./Screen";
import styles from "./App.module.scss";

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

interface AppProps {
  screenPipe: Pipe<ScreenCommand>;
  keydownPipe: Pipe<any>;
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

  handleKeydown = (e) => {
    const native = e.nativeEvent;
    this.props.keydownPipe.fire(native);
  };

  render() {
    return (
      <div className={styles.app}>
        <Screen
          output={this.state.output}
          off={this.state.off}
          onKeyDown={this.handleKeydown}
        />
      </div>
    );
  }
}

export default OsProvider<{}>(App);
