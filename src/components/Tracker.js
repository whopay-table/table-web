import React, { Component, PropTypes } from 'react'
import Config from 'src/config';

const GA_TRACKING_ID = Config.GA_TRACKING_ID === 'null' ? null : Config.GA_TRACKING_ID;
if (GA_TRACKING_ID) {
  ga('create', GA_TRACKING_ID, 'auto');
}

export default class Tracker extends Component {
  componentDidMount() {
    this.sendPageview(this.props.location.pathname);
  }

  componentDidUpdate(prevProps, prevState) {
    const newPathname = this.getNewPathname(prevProps);
    if (newPathname) {
      this.sendPageview(newPathname);
    }
  }

  getNewPathname(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      return this.props.location.pathname;
    } else {
      return null;
    }
  }

  sendPageview(pathname) {
    if (GA_TRACKING_ID) {
      ga('send', 'pageview', pathname);
    }
  }

  render() {
    return (
      <div className="c-tracker u-no-display" />
    );
  }
}
