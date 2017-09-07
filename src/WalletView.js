import React, {Component} from 'react';
import BlueButton from './UiComponents/BlueButton';
import KeyDisplayer from './UiComponents/KeyDisplayer';
import HistoryTable from './UiComponents/HistoryTable';
import MyBalance from './UiComponents/MyBalance'
import RecentHistory from './UiComponents/RecentHistory';
import T from 'i18n-react';
import './WalletView.scss';

class WalletView extends Component {
  render () {
    return (
      <div className="wallet-view-container">
        <RecentHistory/>
        <MyBalance/>

        <p className="your-account">Your Account</p>
        <p className="button-wrapper">
            <BlueButton medium>
                <T.span text="wallet_view.send"/>
            </BlueButton>
            <BlueButton medium>
                <T.span text="wallet_view.receive"/>
            </BlueButton>
        </p>

        <KeyDisplayer/>
        <HistoryTable/>
      </div>
    )
  }
}

export default WalletView;