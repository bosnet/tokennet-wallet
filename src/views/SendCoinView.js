import React, {Component} from 'react';
import MyBalance from 'UiComponents/MyBalance'
import RecentHistory from 'UiComponents/RecentHistory';
import KeyDisplayer from 'UiComponents/KeyDisplayer';
import SendCoinForm from 'UiComponents/SendCoinForm';
import BlueButton from 'UiComponents/BlueButton';
import './SendCoinView.scss';

class SendCoinView extends Component {
  render () {
    return (
      <div className="send-coin-view-container">
        <RecentHistory/>
        <MyBalance/>
        <SendCoinForm/>
        <KeyDisplayer/>
        <div className="button-wrapper">
          <BlueButton medium>Account</BlueButton>
          <BlueButton medium>Receive</BlueButton>
        </div>
      </div>
    )
  }
}

export default SendCoinView;