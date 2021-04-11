import React from "react";
import Pipe from "../../shared/pipe";
import { ScreenCommand } from "../../shared/screenTypes";
import OS from "../../vm/os";
import OsProvider from "./OsProvider";
import Screen from "./Screen";

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
  keypressPipe: Pipe<any>; // What are these?
  keydownPipe: Pipe<any>; // What are these types??
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
  }

  handleWindowClick = () => {
    if (window.getSelection()?.isCollapsed) {
      this.refocus();
    }
  };

  refocus = () => {
    this.button && this.button.focus();
  };

  scrollToBottom = () => {
    const screen = document.querySelector(".screen");
    if (screen) {
      document.body.scrollTop = screen.clientHeight;
    }
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

  handleKeypress = (e) => {
    const native = e.nativeEvent;
    this.props.keypressPipe.fire(native);
  };

  handleKeydown = (e) => {
    const native = e.nativeEvent;
    this.props.keydownPipe.fire(native);
  };

  setButtonRef = (button) => {
    this.button = button;
  };

  render() {
    return (
      <div className="app">
        <Screen output={this.state.output} off={this.state.off} />
        <input
          onKeyPress={this.handleKeypress}
          onKeyDown={this.handleKeydown}
          ref={this.setButtonRef}
          type="text"
          autoFocus
          value=""
          style={{ opacity: "0.0001" }}
        />
      </div>
    );
  }
}

export default OsProvider(App);
