import React from 'react';
import bootstrap from '../../vm/bootstrap';
import Pipe from '../../shared/pipe';

// TODO: switch to new context api??
const osProvider = (Component) => {
  return class Provided extends React.Component {
    constructor(props){
      super(props);
      this.keydownPipe = new Pipe();
      this.keypressPipe = new Pipe();
      this.screenPipe = new Pipe();
    }

    componentDidMount(){
      // wait for mount to initialize OS
      bootstrap({
        keydownPipe: this.keydownPipe,
        keypressPipe: this.keypressPipe,
        screenPipe: this.screenPipe,
      }).then(os => {
        this.os = os;
      });
    }

    render() {
      return (
        <Component
          {...this.props}
          os={this.os}
          keydownPipe={this.keydownPipe}
          keypressPipe={this.keypressPipe}
          screenPipe={this.screenPipe}
        />
      );
    }
  }
};

export default osProvider;
