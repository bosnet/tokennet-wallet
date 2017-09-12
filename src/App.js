/*
	React Core
 */
import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

/*
	Libraries
 */
import T from 'i18n-react';

/*
	Views
 */
import MainPageView from './views/MainPageView';
import WalletView from './views/WalletView';
import LoginView from './views/LoginView';
import SendCoinView from './views/SendCoinView';
import ReceiveCoinView from './views/ReceiveCoinView';
import Header from './Header';
import Spinner from './UiComponents/Spinner';
import CopyComplete from './UiComponents/CopyComplete';
import ConfirmGeneratorOpen from './Modals/ConfirmGeneratorOpen';
import KeyGenerator from './Modals/KeyGenerator'
import TransactionConfirm from './Modals/TransactionConfirm';
import TransactionComplete from './Modals/TransactionComplete';
import RecordSeeds from './Modals/RecordSeeds';

/*
	Styles
 */
import './App.scss';
import './assets/sass/App.scss';

class App extends Component {
  constructor() {
    super();

    const userLang = navigator.language || navigator.userLanguage;
    this.selectLang( userLang );
  }

  selectLang( $lang ) {
    let lang = 'en';
    switch ( $lang ) {
      case 'ko' :
        lang = 'ko';
        break;
      default:
        lang = 'en';
    }
    T.setTexts( require( './languages/' + lang + '.json' ) );
  }

  render() {
    return (
        <div className="App">

          <Spinner spinnerShow={ this.props.showSpinner }/>
          <ConfirmGeneratorOpen modalOpen={ this.props.showGeneratorConfirm }/>
          <KeyGenerator modalOpen={ this.props.showKeyGenerator }/>
          <RecordSeeds modalOpen={ this.props.showRecordSeed } />
          <TransactionConfirm modalOpen={this.props.transactionConfirm}/>
          <TransactionComplete modalOpen={this.props.transctionComplete}/>
          <CopyComplete show={ this.props.showCopyComplete }/>

          <Header/>

          <Route exact path="/" component={MainPageView}/>
          <Route path="/wallet" component={WalletView}/>
          <Route path="/login" component={LoginView}/>
          <Route path="/send" component={SendCoinView}/>
          <Route path="/receive" component={ReceiveCoinView}/>
        </div>
    );
  }

  componentWillReceiveProps( nextProps ) {
    this.selectLang( nextProps.language );
  }
}

const mapStateToProps = ( state ) => ({
  language: state.language.language,
  showSpinner: state.spinner.isShow,
  showKeyGenerator: state.keyGenerator.isShow,
  showGeneratorConfirm: state.generatorConfirm.isShow,
  showRecordSeed: state.recordSeed.isShow,
  showCopyComplete: state.copyComplete.isShow,
  showTransactionConfirm: state.transactionConfirm.isShow,
  showTransactionComplete: state.transactionComplete.isShow,
});

App = withRouter( connect( mapStateToProps, null )( App ) );

export default App;
