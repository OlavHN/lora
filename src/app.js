import React, { Component } from 'react';
import StyleSheet from 'react-style';
import Firebase from 'firebase';

import { AppBar, Paper, Avatar } from 'material-ui';
import AccountIcon from 'react-material-icons/icons/action/account-circle';
import goTo from './history';
import Login from './login';

const FIREBASE_APP = 'https://lpwa.firebaseio.com';
let ref = new Firebase(FIREBASE_APP);

let styles = StyleSheet.create({
    icon: {
      fill: '#FFFFFF',
      width: '100%',
      height: '100%',
      margin: 0
    }
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: ref.getAuth()
    }
  }

  componentDidMount() {
    ref.onAuth(auth => this.setState({auth: auth}));
  }

  renderUserIcon() {
    let { auth } = this.state;

    if (auth) {
      return (
        <Avatar
          src={auth[auth.provider].profileImageURL}
          onTouchTap={() => goTo('/me') } />
      );
    }

    return (
      <Avatar
        backgroundColor={'transparent'}
        icon={<AccountIcon style={styles.icon} />}
        onTouchTap={() => this.refs.login.show()} />
    );
  }

  render() {
    let bgColor = this.context.muiTheme.palette.primary1Color;

    return (
      <div style={{height: '100%', background: bgColor}}>
        <AppBar
          zDepth={0}
          title="Telenor LPWA"
          showMenuIconButton={false}
          iconElementRight={this.renderUserIcon()}

        />
        <Login ref="login" />
        {this.props.children}
      </div>
    );
  }
}

App.contextTypes = {
  muiTheme: React.PropTypes.object
}
