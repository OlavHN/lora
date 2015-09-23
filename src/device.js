import React, { Component } from 'react';
import StyleSheet from 'react-style';
import { FlatButton, Dialog, Tabs, Tab, Paper, CircularProgress, TextField } from 'material-ui';
import { Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn } from 'material-ui';
import AppleIcon from 'react-material-icons/icons/hardware/phone-iphone';
import AndroidIcon from 'react-material-icons/icons/hardware/phone-android';
import Rebase from 're-base';

const FIREBASE_APP = 'https://lpwa.firebaseio.com';
let base = Rebase.createClass(FIREBASE_APP);

export default class Device extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newDevAddr: '',
      newNwkSKey: '',
      newAppSKey: '',
      showPersonalized: false,
      devices: []
    };
  }

  componentDidMount() {
    this.ref = base.bindToState('devices', {
      context: this,
      state: 'devices',
      asArray: true
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  renderList() {
    if (!this.state.devices.length)
      return null;
    //this.setState({selectedDevice: this.state.devices[i[0]]})
    return (
      <Table
        onRowSelection={i => this.setState({})} >
        <TableHeader
          displaySelectAll={false} >
          <TableRow>
            <TableHeaderColumn tooltip='DevAddr'>Device ID</TableHeaderColumn>
            <TableHeaderColumn tooltip='First payload from device'>First received</TableHeaderColumn>
            <TableHeaderColumn tooltip='Previous payload from device'>Last received</TableHeaderColumn>
            <TableHeaderColumn tooltip='Payload posted to this URL'>Callback URL</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          deselectOnClickaway={false} >
          {this.state.devices.map(device => (
            <TableRow key={device.devAddr}>
              <TableRowColumn>{device.devAddr}</TableRowColumn>
              <TableRowColumn>{device.created}</TableRowColumn>
              <TableRowColumn>{device.lastReceived}</TableRowColumn>
              <TableRowColumn>{device.callback}</TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
        </Table>
    );
  }

  renderPersonalized() {
    let {newDevAddr, newNwkSKey, newAppSKey, showPersonalized } = this.state;
    if (!showPersonalized)
      return;

    return (
      <div>
        <div data-vertical data-layout style={{padding: 20}}>
          <div data-horizontal data-layout data-justified>
            <div>Device Address</div>
            <div>{newDevAddr}</div>
          </div>
          <div data-horizontal data-layout data-justified>
            <div>Network Session Key</div>
            <div>{newNwkSKey}</div>
          </div>
          <div data-horizontal data-layout data-justified>
            <div>Application Session Key</div>
            <div>{newAppSKey}</div>
          </div>
        </div>
        <Paper>
          <div style={{padding: 10}} data-vertical data-layout data-center data-center-justified>
            <CircularProgress mode="indeterminate" />
            Network debug information for {this.state.newDevAddr}
          </div>
        </Paper>
      </div>
    );
  }

  render() {
    return (
      <div style={{height: 'calc(100% - 64px)'}}>
        <Dialog
          title="New device"
          ref="addDeviceDialog" >
          <Tabs>
            <Tab label="Telenor device">
              <div style={{padding: 10}} data-vertical data-layout>
                <p>
                  If you have a Telenor Device it can be fully setup with the Telenor LPWA app.
                </p>
                <div data-horizontal data-layout data-around-justified>
                  <div data-vertical data-layout data-center>
                    <AppleIcon style={{width:'100%', height: '100%'}} />
                    Apple AppStore
                  </div>
                  <div data-vertical data-layout data-center>
                    <AndroidIcon style={{width:'100%', height: '100%'}} />
                    Google Play Store
                  </div>
                </div>
              </div>
            </Tab>
            <Tab label="Over The Air">
              <div style={{padding: 10}} data-vertical data-layout>
                <p>
                  OTA device setup means the network server provisions and manages individual device keys. Multiple devices can be configured with the same configuration which makes it easy to manage multiple devices.
                </p>
                <p>
                  Configure your devices with these parameters
                </p>
                <div data-horizontal data-layout data-justified>
                  <div>Application ID</div>
                  <div>123</div>
                </div>
                <div data-horizontal data-layout data-justified>
                  <div>Application Key</div>
                  <div>456</div>
                </div>
                <div data-horizontal data-layout data-justified>
                  <div>Device ID</div>
                  <div>A unique 64 bit identifier</div>
                </div>
              </div>
            </Tab>
            <Tab label="Personalized">
              <div style={{padding: 10}} data-vertical data-layout>
                <p>
                  Personalized devices are manually configured devices. They are easy to setup, but each device needs to be configured independently.
                </p>
                <FlatButton
                  label="Generate device configuration"
                  onTouchTap={() => this.setState({
                    newDevAddr: '0x' + Math.random().toString(16).substring(2).toUpperCase(),
                    newNwkSKey: '0x' + Math.random().toString(16).substring(2).toUpperCase(),
                    newAppSKey: '0x' + Math.random().toString(16).substring(2).toUpperCase(),
                    showPersonalized: true
                  })} />
                {this.renderPersonalized()}
              </div>
            </Tab>
          </Tabs>
        </Dialog>
        <div data-horizontal data-layout>
          <FlatButton
            label="Add Device"
            onTouchTap={() => this.refs.addDeviceDialog.show()} />
          <FlatButton
            label="Edit Device"
            onTouchTap={() => this.refs.addDeviceDialog.show()} />
        </div>
        {this.renderList()}
      </div>
    );
  }
}
