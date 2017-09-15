import React, {Component} from 'react';
import MyBalance from 'UiComponents/MyBalance'
import RecentHistory from 'UiComponents/RecentHistory';
import KeyDisplayer from 'UiComponents/KeyDisplayer';
import BlueButton from 'UiComponents/BlueButton';
import QRious from 'qrious';
import { Link } from "react-router-dom";
import './ReceiveCoinView.scss';

class ReceiveCoinView extends Component {
  componentDidMount() {
    new QRious({
      element: document.getElementById('my-address-qrcode'),
      value: 'some value'
    });
  }

  render () {
    return (
      <div className="receive-coin-view-container">
        <RecentHistory/>
        <MyBalance/>

        <div className="receive-wrapper">
          <p>Receive</p>
          <canvas width="90" height="90" id="my-address-qrcode"> </canvas>
        </div>

        <KeyDisplayer/>
        <div className="button-wrapper">
          <Link to="/wallet">
            <BlueButton medium>Account</BlueButton>
          </Link>

          <Link to="/send">
            <BlueButton medium>Send</BlueButton>
          </Link>
        </div>
      </div>
    )
  }
}

export default ReceiveCoinView;