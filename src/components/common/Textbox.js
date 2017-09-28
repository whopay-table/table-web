import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';

export default class Textbox extends Component {
  static defaultProps = {
    autoFocus: false,
    autoCapitalize: false,
    autoComplete: false,
    className: '',
    disabled: false,
    id: undefined,
    name: undefined,
    onChange: () => {},
    onFocus: () => {},
    onBlur: () => {},
    onKeyDown: () => {},
    placeholder: '',
    type: 'text',
    readOnly: false,
    value: '',
  };

  render() {
    const {
      autoFocus,
      autoCapitalize,
      autoComplete,
      className,
      disabled,
      id,
      name,
      onChange,
      onFocus,
      onBlur,
      onKeyDown,
      placeholder,
      type,
      readOnly,
      value,
    } = this.props;

    return (
      <input
        className={classnames(
          'c-textbox',
          className
        )}
        ref={e => this.input = e}
        autoFocus={autoFocus}
        autoCapitalize={autoCapitalize ? 'sentences' : 'off'}
        autoComplete={autoComplete ? true : 'off'}
        disabled={disabled}
        id={id}
        name={name}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    );
  }
}
