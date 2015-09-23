import React, { Component } from 'react';
import StyleSheet from 'react-style';
import Firebase from 'firebase';
import { FlatButton } from 'material-ui';

import goTo from './history';

const FIREBASE_APP = 'https://lpwa.firebaseio.com';
let ref = new Firebase(FIREBASE_APP);

export default class Me extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: ref.getAuth()
    }
  }

  componentDidMount() {
    ref.onAuth(auth => this.setState({auth: auth}))
  }

  render() {
    let { auth } = this.state;

    if (!auth) return null;

    return (
      <div style={{height: 'calc(100% - 64px)'}}
        data-vertical data-layout data-center data-center-justified
      >
        <div>Email: {auth[auth.provider].email}</div>
        <div>App ID: XYZ</div>
        <FlatButton label="Logout" onTouchTap={() => {
          ref.unauth(); goTo('/');}
        } />
      </div>
    );
  }
}
