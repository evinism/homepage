import React from 'react';
import OsProvider from './OsProvider';

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

  writeToScreen(cmd){
    switch(cmd.type){
      case 'appendCommand': {
        const str = cmd.content;
        this.setState(state => ({ output: state.output + str }));
        break;
      }
      case 'clearCommand': {
        this.setState(state => ({ output: ''}));
        break;
      }
      case 'removeCommand': {
        this.setState(state => ({ output: output.slice(0, -1)}));
        break;
      }
      default:
        return;
    }
  }

  handleKeypress = (e) => {
    const native = e.nativeEvent;
    this.props.keyPipe.fire(native);
  };

  setButtonRef = (button) => {
    this.button = button
  }

  render(){
    const { os } = this.props;
    return (
      <div onKeyPress={this.handleKeypress}>
        <h3>OS version: { os && os.version() }</h3>
        <pre>{this.state.output}</pre>
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