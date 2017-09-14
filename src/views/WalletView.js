import React, {Component} from 'react';
import BlueButton from 'UiComponents/BlueButton';
import KeyDisplayer from 'UiComponents/KeyDisplayer';
import HistoryTable from 'UiComponents/HistoryTable';
import MyBalance from 'UiComponents/MyBalance'
import RecentHistory from 'UiComponents/RecentHistory';
import T from 'i18n-react';
import './WalletView.scss';
import {Redirect} from 'react-router-dom';
import { Link } from "react-router-dom";

class WalletView extends Component {
  renderRedirect() {
    if (this.props.keypair === null) {
      return <Redirect to={'/'}/>;
    }
    else {
      return '';
    }
  }

  render() {
    return (
      <div className="wallet-view-container">
        {this.renderRedirect()}
        <RecentHistory/>
        <MyBalance/>

        <p className="your-account">Your Account</p>
        <p className="button-wrapper">
          <Link to="/send">
            <BlueButton medium>
             <T.span text="wallet_view.send"/>
            </BlueButton>
          </Link>
          <Link to="/receive">
            <BlueButton medium>
             <T.span text="wallet_view.receive"/>
            </BlueButton>
          </Link>
        </p>

        <KeyDisplayer/>
        <HistoryTable/>
      </div>
    )
  }
}

export default WalletView;