import React from 'react';
import OsProvider from './OsProvider';
import Screen from './screen';

// lol lenses
const changeParam = key => fn => (state) => ({
  ...state,
  [key]: fn(state[key])
});

const changeOutput = changeParam('output');
const changeOff = changeParam('off');

class App extends React.Component {
  state = { output: '', off: false };

  constructor(props){
    super(props);
    props.screenPipe.subscribe((str) => this.writeToScreen(str));
  }

  componentDidMount(){
    window.addEventListener('click', this.handleWindowClick);
  }

  handleWindowClick = () => {
    if(window.getSelection().isCollapsed){
      this.refocus();
    }
  }

  refocus = () => {
    this.button && this.button.focus();
  }

  scrollToBottom = () => {
    const bodyElem = document.querySelector('body');
    bodyElem.scrollTop = document.querySelector('.screen').clientHeight; // a little overkill but whatev
  }

  writeToScreen(cmd){
    const cb = () => {
      this.scrollToBottom();
    }
    switch(cmd.type){
      case 'appendCommand': {
        const str = cmd.data;
        this.setState(changeOutput(output => output + str), cb);
        break;
      }
      case 'clearCommand': {
        this.setState(changeOutput(() => ''), cb);
        break;
      }
      case 'removeCommand': {
        this.setState(changeOutput(output => output.substr(0, output.length - 1)), cb);
        break;
      }
      case 'offCommand': {
        this.setState(changeOff(() => true));
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
    this.button = button
  }

  render(){
    const { os } = this.props;
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
          style={{opacity: '0.0001'}}
        />
      </div>
    );
  }
}

export default OsProvider(App);