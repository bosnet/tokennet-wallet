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
import { connect } from "react-redux";

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

        <p className="your-account">{T.translate('common.your_account')}</p>
        <p className="button-wrapper">
          <Link to="/send">
            <BlueButton medium>
             <T.span text="wallet_view.sent"/>
            </BlueButton>
          </Link>
          <Link to="/receive">
            <BlueButton medium>
             <T.span text="wallet_view.received"/>
            </BlueButton>
          </Link>
        </p>

        <KeyDisplayer/>
        <HistoryTable/>
      </div>
    )
  }
}

const mapStateToProps = ( state ) => ({
  keypair: state.keypair.keypair,
});

WalletView = connect( mapStateToProps )( WalletView );

export default WalletView;