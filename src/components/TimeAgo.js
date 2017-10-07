import moment from 'moment';
import React, { Component, PropTypes } from 'react';
import ReactTimeAgo from 'react-timeago';
import TimeAgoKoStrings from 'react-timeago/lib/language-strings/ko';
import TimeAgoBuildFormatter from 'react-timeago/lib/formatters/buildFormatter'

const formatter = TimeAgoBuildFormatter(TimeAgoKoStrings);
moment.locale('ko');

export default class TimeAgo extends Component {
  renderDate() {
    const { date } = this.props;
    const dateString = moment(date).format('L');
    return (
      <span className="c-timeago c-timeago--datestring">
        {dateString}
      </span>
    );
  }

  renderTimeAgo() {
    return <ReactTimeAgo {...this.props} formatter={formatter} />;
  }

  render() {
    const { date } = this.props;
    if (moment().diff(moment(date), 'days') >= 7) {
      return this.renderDate();
    } else {
      return this.renderTimeAgo();
    }
  }
}
