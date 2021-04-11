import React from "react";
import bootstrap from "../../vm/bootstrap";
import Pipe from "../../shared/pipe";
import OS from "../../vm/os";
import { ScreenCommand } from "../../shared/screenTypes";

interface OsProvidedProps {
  keydownPipe: Pipe<any>;
  keypressPipe: Pipe<any>;
  screenPipe: Pipe<ScreenCommand>;
  os?: OS;
}

// TODO: switch to new context api??
function osProvider<T>(Component: React.ComponentType<T & OsProvidedProps>) {
  class Provided extends React.Component<T> {
    keydownPipe: Pipe<any>;
    keypressPipe: Pipe<any>;
    screenPipe: Pipe<ScreenCommand>;
    os?: OS;

    constructor(props: T) {
      super(props);
      this.keydownPipe = new Pipe();
      this.keypressPipe = new Pipe();
      this.screenPipe = new Pipe();
    }

    componentDidMount() {
      // wait for mount to initialize OS
      bootstrap({
        keydownPipe: this.keydownPipe,
        keypressPipe: this.keypressPipe,
        screenPipe: this.screenPipe,
      }).then((os) => {
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
  return Provided;
}

export default osProvider;
