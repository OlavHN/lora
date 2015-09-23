import React, { Component } from 'react';
import StyleSheet from 'react-style';
import { Paper } from 'material-ui';
import goTo from './history';

import DeviceIcon from 'react-material-icons/icons/action/settings-remote';
import NetworkIcon from 'react-material-icons/icons/hardware/router';

let styles = StyleSheet.create({
    icon: {
      fill: '#FFFFFF',
      width: '100%',
      height: '100%'
    },
    paper: {
      padding: 10,
      color: 'white',
      background: 'transparent',
      cursor: 'pointer'
    }
});

export default class Welcome extends Component {

  render() {
    return (
      <div style={{height: 'calc(100% - 64px)'}}
        data-horizontal
        data-layout
        data-center
        data-around-justified
      >
        <Paper zDepth={0} style={styles.paper} data-vertical data-layout data-center
        onTouchTap={() => goTo('/network')}>
          <NetworkIcon style={styles.icon} />
          <div>
            I want to set up a gateway
          </div>
        </Paper>
        <Paper zDepth={0} style={styles.paper} data-vertical data-layout data-center
          onTouchTap={() => goTo('/device')}>
          <DeviceIcon style={styles.icon} />
          <div>
            I want to connect a device
          </div>
        </Paper>
      </div>
    );
  }
}

/*Welcome.contextTypes = {
  muiTheme: React.PropTypes.object
};*/
