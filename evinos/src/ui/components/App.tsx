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
  hueRotation: number, /* 0 to 1 */
}

const knownColors = {
  green: 0, 
  orange: 0.82,
  purple: 0.5,
  spin: -1,
}

const initialColors = [
  knownColors.green,
  knownColors.orange,
];

// lol lenses
function changeParam<K extends keyof AppState>(key: K) {
  return (fn: (value: AppState[typeof key]) => void) => (state: AppState) => ({
    ...state,
    [key]: fn(state[key]),
  });
}

const changeOutput = changeParam("output");
const changeOff = changeParam("off");
const changeHueRotation = changeParam('hueRotation');

const isPrintableKey = (key) => key && key.length === 1;

interface AppProps {
  screenPipe: Pipe<ScreenCommand>;
  keyPipe: Pipe<[string, boolean]>;
  os: OS;
}

function pickRandom<T>(arr: T[]) {
    return arr[Math.floor(Math.random() * arr.length)]!;
}

class App extends React.Component<AppProps, AppState> {
  state = {
    output: "",
    off: false,
    hueRotation: pickRandom(Object.values(initialColors)),
  };
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
      case "colorCommand": {
        const color = cmd.color;
        let newRotation = undefined;
        if (color === "random") {
          newRotation = Math.random();
        } else {
          newRotation = knownColors[color];
        }
        if (newRotation !== undefined) {
          this.setState(changeHueRotation(() => newRotation));
        }
        break;
      }
      default:
        return;
    }
  }

  handleMobileKeyboard = (event) => {
    // This is insane and really gross, but actually kind of works
    const listener = (event) => {
      this.props.keyPipe.fire([event.data.toLowerCase(), false]);
      event.target.removeEventListener("input", listener);
    };
    event.target.addEventListener("input", listener);
  };

  handleKeydown = (event) => {
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
      this.props.keyPipe.fire([toSend, eof]);
    }
  };

  render() {
    const { hueRotation } = this.state;
    let inlineStyle: any;
    if (hueRotation >= 0) {
      inlineStyle = {
        filter: `hue-rotate(${this.state.hueRotation * 360}deg)`,
      };
    } else {
      inlineStyle = {
        animation: `hueSpin 7s 0s infinite linear`,
      };
    }

    return (
      <div className={styles.app} style={inlineStyle}>
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
