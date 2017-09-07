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
import MainPageView from './MainPageView';
import WalletView from './WalletView';
import Header from './Header';
import Spinner from './UiComponents/Spinner';
import ConfirmGeneratorOpen from './Modals/ConfirmGeneratorOpen';
import KeyGenerator from './Modals/KeyGenerator'
import SeedLogin from './Modals/SeedLogin';

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
    console.log( this.props );
    return (
        <div className="App">

          <Spinner spinnerShow={false}/>
          <ConfirmGeneratorOpen modalOpen={ this.props.showGeneratorConfirm }/>
          <KeyGenerator modalOpen={ this.props.showKeyGenerator }/>
          <SeedLogin modalOpen={ this.props.showSeedLogin }/>

          <Header/>

          <Route exact path="/" component={MainPageView}/>
          <Route path="/wallet" component={WalletView}/>

        </div>
    );
  }

  componentWillReceiveProps( nextProps ) {
    this.selectLang( nextProps.language );
  }
}

const mapStateToProps = ( state ) => ({
  language: state.language.language,
  showKeyGenerator: state.keyGenerator.isShow,
  showGeneratorConfirm: state.generatorConfirm.isShow,
  showSeedLogin: state.seedLogin.isShow,
});

App = withRouter( connect( mapStateToProps, null )( App ) );

export default App;
