import React from 'react';


class Screen extends React.Component {
  constructor(props){
    super(props);
    this.screen = React.createRef();
  }

  render () {
    return (
      <div className="screen" ref={this.screen}>
        <pre>{this.props.output}<span className='cursor'> </span></pre>
      </div>
    );
  }
}

export default Screen;