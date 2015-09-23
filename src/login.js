import React, { Component } from 'react';
import StyleSheet from 'react-style';
import Firebase from 'firebase';
import { Dialog, Tabs, Tab, TextField, FlatButton, Snackbar } from 'material-ui';

import goTo from './history';

const FIREBASE_APP = 'https://lpwa.firebaseio.com';
let ref = new Firebase(FIREBASE_APP);

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  show() {
    this.refs.dialog.show();
  }

  register() {
    ref.createUser({
      email: this.state.email,
      password: this.state.password
    }, (error, user) => {
      if (error) {
        this.setState({error: error});
        this.refs.loginError.show();
        return;
      }

      this.login();
    });
  }

  resetPassword() {
    ref.resetPassword({email: this.state.email}, error => {
      if (error) {
        this.setState({error: error});
        this.refs.loginError.show();
        return;
      }

      this.setState({error: 'Reset password email sent'});
      this.refs.loginError.show();
    })
  }

  login() {
    ref.authWithPassword({
      email: this.state.email,
      password: this.state.password
    }, (error, user) => {
      if (error) {
        this.setState({error: error});
        this.refs.loginError.show();
        return;
      }
      this.setState({
        email: '', password: ''
      });

      this.refs.dialog.dismiss();

      goTo('/me');
    });
  }

  render() {
    return (
      <Dialog ref="dialog">
        <Tabs>
          <Tab label="Login">
            <form data-vertical data-layout data-center data-center-justified
              onSubmit={e => {e.preventDefault(); this.login();}}
            >
              <TextField
                hintText="Email"
                value={this.state.email}
                onChange={e => this.setState({email: e.target.value})} />
              <TextField
                value={this.state.password}
                hintText="Password"
                type="password"
                onChange={e => this.setState({password: e.target.value})} />
              <div data-horizontal data-layout>
                <FlatButton
                  label="Login"
                  type="submit" />
                <FlatButton
                  label="Forgot password"
                  onTouchTap={e => {e.preventDefault(); this.resetPassword();} } />
              </div>
            </form>
          </Tab>
          <Tab label="Register" >
            <form data-vertical data-layout data-center data-center-justified
              onSubmit={e => { e.preventDefault(); this.register(); }}
            >
              <TextField
                hintText="Email"
                value={this.state.email}
                onChange={e => this.setState({email: e.target.value})} />
              <TextField
                value={this.state.password}
                hintText="Password"
                type="password"
                onChange={e => this.setState({password: e.target.value})} />
              <FlatButton
                label="Register"
                type="submit" />
            </form>
          </Tab>
        </Tabs>
        <Snackbar
          ref="loginError"
          message={this.state.error || ''}
          autoHideDuration={5000}
          />
      </Dialog>
    );
  }
}
