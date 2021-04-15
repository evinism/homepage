import React from "react";
import bootstrap from "../../vm/bootstrap";
import Pipe from "../../shared/pipe";
import OS from "../../vm/os";
import { ScreenCommand } from "../../shared/screenTypes";

interface OsProvidedProps {
  keyPipe: Pipe<[string, boolean]>;
  screenPipe: Pipe<ScreenCommand>;
  os?: OS;
}

// TODO: switch to new context api??
function osProvider<T>(Component: React.ComponentType<T & OsProvidedProps>) {
  class Provided extends React.Component<T> {
    keyPipe: Pipe<[string, boolean]>;
    screenPipe: Pipe<ScreenCommand>;
    os?: OS;

    constructor(props: T) {
      super(props);
      this.keyPipe = new Pipe();
      this.screenPipe = new Pipe();
    }

    componentDidMount() {
      // wait for mount to initialize OS
      bootstrap({
        keyPipe: this.keyPipe,
        screenPipe: this.screenPipe,
      }).then((os) => {
        this.os = os;
      });
    }

    render() {
      return (
        <Component
          {...this.props}
          os={this.os!}
          keyPipe={this.keyPipe}
          screenPipe={this.screenPipe}
        />
      );
    }
  }
  return Provided;
}

export default osProvider;
