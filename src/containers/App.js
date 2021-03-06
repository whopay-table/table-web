import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import Config from '../config';
import GroupContainer from './GroupContainer';
import GroupCreateContainer from './GroupCreateContainer';
import Home from '../components/Home';
import NotFound from '../components/NotFound';
import Tracker from '../components/Tracker';

const HOSTNAME = window.location.hostname;
const DOMAIN = Config.WEB_DOMAIN;
const IS_PROD_DOMAIN = HOSTNAME.endsWith(DOMAIN);
const HOST_GROUP_NAME = HOSTNAME.includes(`.${DOMAIN}`) ? HOSTNAME.split('.')[0] : null;

class App extends Component {
  getGroupname() {
    const { location } = this.props;
    let firstPathItem = null;
    if (location.pathname.includes('/')) {
      const rootlessPathname = location.pathname.slice(1);
      if (rootlessPathname.includes('/')) {
        firstPathItem = rootlessPathname.split('/')[0];
      } else if (rootlessPathname.length === 0) {
        firstPathItem = null;
      } else {
        firstPathItem = rootlessPathname;
      }
    } else {
      firstPathItem = null;
    }

    if (firstPathItem === 'create') {
      return null;
    } else {
      return firstPathItem;
    }
  }

  render() {
    const {
      store,
      location,
      match,
    } = this.props;
    const groupname = this.getGroupname();
    let redirectTo = null;

    if (IS_PROD_DOMAIN && HOST_GROUP_NAME && HOST_GROUP_NAME !== 'www') {
      if (!groupname) {
        redirectTo = `/${HOST_GROUP_NAME}`;
      } else if (groupname !== HOST_GROUP_NAME) {
        return <NotFound />;
      }
    }

    if (redirectTo) {
      return <Redirect replace to={redirectTo}/>
    };
    return (
      <div className="c-app">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/create" component={GroupCreateContainer} />
          <Route path="/:groupname" component={GroupContainer} />
        </Switch>
        <Tracker location={location} />
      </div>
    );
  }
}

export default connect()(App);
