import React from 'react';
import OsProvider from './OsProvider';

class App extends React.Component {
  state = { output: '' };

  constructor(props){
    super(props);
    props.screenPipe.subscribe((str) => this.writeToScreen(str));
  }

  writeToScreen(str){
    this.setState({
      output: this.state.output + str
    });
  }

  render(){
    const { os, keyPipe, screenPipe } = this.props;
    return (
      <div>
        <h3>OS version: { os && os.version() }</h3>
        {this.state.output}
      </div>
    );
  }
}

export default OsProvider(App);