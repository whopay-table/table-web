import React, { Component, PropTypes } from 'react';
import TimeAgo from 'react-timeago';
import TimeAgoKoStrings from 'react-timeago/lib/language-strings/ko';
import TimeAgoBuildFormatter from 'react-timeago/lib/formatters/buildFormatter'

const formatter = TimeAgoBuildFormatter(TimeAgoKoStrings);

export default class TableTimeAgo extends Component {
  render() {
    return <TimeAgo {...this.props} formatter={formatter} />;
  }
}
