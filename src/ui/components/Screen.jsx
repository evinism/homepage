import React from 'react';
import ReactAutolinker from './Autolinker';
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
                <ReactAutolinker
                  text={this.props.output}
                  tagName="span"
                  options={{
                    urls: { tldMatches: false },
                    stripPrefix: false,
                    stripTrailingSlash: false,
                    mention: 'twitter',
                  }}
                />
                <span className='cursor'> </span></pre>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Screen;