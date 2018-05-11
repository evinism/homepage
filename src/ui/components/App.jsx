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

  writeToScreen(str){
    this.setState({
      output: this.state.output + str
    });
  }

  handleKeypress = (e) => {
    this.props.keyPipe.fire(e.key, false);
  };

  setButtonRef = (button) => {
    this.button = button
  }

  render(){
    const { os } = this.props;
    return (
      <div onKeyPress={this.handleKeypress}>
        <h3>OS version: { os && os.version() }</h3>
        {this.state.output}
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