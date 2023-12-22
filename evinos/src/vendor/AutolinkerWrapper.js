import React from "react";
import PropTypes from "prop-types";
import Autolinker from "autolinker";

const defaultOptions = {};

export default class AutolinkerWrapper extends React.Component {
  static propTypes = {
    options: PropTypes.object.isRequired,
    tagName: PropTypes.string.isRequired,
    text: PropTypes.string,
  };

  static defaultProps = {
    options: defaultOptions,
    tagName: "div",
  };

  componentDidMount() {
    this.invokeLink();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.text != this.props.text ||
      prevProps.options != this.props.options
    ) {
      this.invokeLink();
    }
  }

  invokeLink = () => {
    this.element.innerHTML =
      this.props.options == defaultOptions
        ? Autolinker.link(this.props.text)
        : Autolinker.link(this.props.text, this.props.options);
  };

  saveRef = (element) => {
    this.element = element;
  };

  render() {
    const { options, tagName, text, ...rest } = this.props; // eslint-disable-line no-unused-vars

    return (
      <this.props.tagName {...rest} ref={this.saveRef}>
        {this.props.text}
      </this.props.tagName>
    );
  }
}
