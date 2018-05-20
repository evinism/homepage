import React from 'react';
import OsProvider from './OsProvider';
import Screen from './screen';


class App extends React.Component {
  state = { output: '' };

  constructor(props){
    super(props);
    props.screenPipe.subscribe((str) => this.writeToScreen(str));
  }

  componentDidMount(){
    window.addEventListener('click', this.refocus);
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
        const str = cmd.content;
        this.setState(({ output }) => ({ output: output + str }), cb);
        break;
      }
      case 'clearCommand': {
        this.setState(() => ({ output: ''}), cb);
        break;
      }
      case 'removeCommand': {
        console.log('woo remove command');
        this.setState(({ output }) => ({ output: output.substr(0, output.length - 1)}), cb);
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
    this.button = button
  }

  render(){
    const { os } = this.props;
    return (
      <div onKeyPress={this.handleKeypress} onKeyDown={this.handleKeydown}>
        <Screen output={this.state.output} />
        <button
          ref={this.setButtonRef} 
          autoFocus 
          style={{opacity: '0.01'}}
        >mee</button>
      </div>
    );
  }
}

export default OsProvider(App);