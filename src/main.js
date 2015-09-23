import React, { Component } from 'react';

import 'babel-core/polyfill';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

import './css/reset.css';
import './css/flex.css';
import './css/fixed-table.css';

import { Router, Route, IndexRoute, Link } from 'react-router';

import mui from 'material-ui';

let ThemeManager = new mui.Styles.ThemeManager();

import App from './app';
import Welcome from './welcome';
import Network from './network';
import Device from './device';
import Me from './me';

let telenorPalette = {
  primary1Color: "#00A6D6",
  primary2Color: "#00B6E6",
  primary3Color: "#00C6F6",
  accent1Color: "#7D8F29",
  accent2Color: "#8D9F39",
  accent3Color: "#9DAF49",
  //textColor: '#FFFFFF'
}

ThemeManager.setPalette(telenorPalette);

import { history } from './history';

class Main extends Component {
  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  render() {
    return (
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Welcome} />
          <Route path="network" component={Network} />
          <Route path="device" component={Device} />
          <Route path="me" component={Me} />
        </Route>
      </Router>
    );
  }
}

Main.childContextTypes = {
  muiTheme: React.PropTypes.object
};

React.render(
  <Main />,
  document.getElementById('app')
);
