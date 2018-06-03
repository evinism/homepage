import React from 'react';
import cx from 'classnames';

class Screen extends React.Component {
  constructor(props){
    super(props);
    this.screen = React.createRef();
  }

  render () {
    return (
      <div className="multiplier1">
        <div className="multiplier2">
          <div className="screen-wrapper"> 
            <div className={cx('screen', {off: this.props.off})} ref={this.screen}>
              <pre>
                {this.props.output}
                <span className='cursor'> </span></pre>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Screen;