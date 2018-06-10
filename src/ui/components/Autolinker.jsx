// Stolen from https://github.com/moudy/react-autolinker/
// Vendored because of weird opinions about build process.

import Autolinker from "autolinker";
import React from "react";
import PropTypes from "prop-types";

export default class ReactAutolinker extends React.Component {
  static propTypes = {
    options: PropTypes.object,
    renderLink: PropTypes.func,
    tagName: PropTypes.string
  };
  static defaultProps = {
    options: {},
    renderLink: tag =>
      React.createElement(tag.tagName, tag.attrs, tag.innerHtml),
    tagName: 'div'
  };
  render() {
    const { options, text, renderLink, tagName } = this.props;

    const tags = [];
    Autolinker.link(text, {
      ...options,
      replaceFn: (autolinker, match) => {
        const tag = autolinker.buildTag(match);
        tags.push(tag);
        return tag;
      }
    });

    let _text = text;
    const children = [];
    for (let tag of tags) {
      const splitText = _text.includes(tag.attrs.href)
        ? tag.attrs.href
        : tag.innerHtml;
      const parts = _text.split(splitText);
      if (tag.attrs && tag.attrs.class) {
        tag.attrs.className = tag.attrs.class;
        delete tag.attrs.class;
      }
      tag.attrs.key = `${tag.attrs.href}-${tags.indexOf(tag)}`;
      children.push(parts.shift());
      children.push(renderLink(tag));
      _text = parts.join(tag.attrs.href);
    }
    children.push(_text);

    const props = { ...this.props };
    for (let prop of ["text", "options", "renderLink", "tagName"]) {
      delete props[prop];
    }
    return React.createElement(tagName, props, children);
  }
}