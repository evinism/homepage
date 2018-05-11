import React from 'react';
import bootstrap from '../../vm/bootstrap';
import Pipe from '../../shared/pipe';

// TODO: switch to new context api??
const osProvider = (Component) => {
  return class Provided extends React.Component {
    constructor(props){
      super(props);
      this.keyPipe = new Pipe();
      this.screenPipe = new Pipe();
    }

    componentDidMount(){
      // wait for mount to initialize OS
      this.os = bootstrap({
        keyboardPipe: this.keyPipe,
        screenPipe: this.screenPipe,
      });
    }

    render() {
      return (
        <Component
          {...this.props}
          os={this.os}
          keyPipe={this.keyPipe}
          screenPipe={this.screenPipe}
        />
      );
    }
  }
};

export default osProvider;
