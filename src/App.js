/*
	React Core
 */
import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from "actions/index";
import { StellarStreamers } from 'libs/stellar-toolkit';

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
import StreamManager from "./StreamManager";

const { OffersStream, EffectsStream, AccountStream, PaymentStream } = StellarStreamers;

class App extends Component {
	constructor() {
		super();

		this.state = {
			publicKey: null,
		};

		this.streams = [];

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

				<ConfirmGeneratorOpen modalOpen={this.props.showGeneratorConfirm}/>
				<KeyGenerator modalOpen={this.props.showKeyGenerator}/>
				<RecordSeeds modalOpen={this.props.showRecordSeed}/>
				<TransactionConfirm modalOpen={this.props.showTransactionConfirm}/>
				<TransactionComplete modalOpen={this.props.showTransactionComplete}/>
				<CopyComplete show={this.props.showCopyComplete}/>
				<Spinner spinnerShow={this.props.showSpinner}/>
				<Header/>

				<Route exact path="/" component={MainPageView}/>
				<Route path="/wallet" component={WalletView}/>
				<Route path="/login" component={LoginView}/>
				<Route path="/send" component={SendCoinView}/>
				<Route path="/receive" component={ReceiveCoinView}/>

				<div className="copyright">
					&lt;BOS Platform Foundation 2017&gt;
				</div>
			</div>
		);
	}

	componentWillReceiveProps( nextProps ) {
		if ( nextProps.keypair ) {
			if ( nextProps.keypair.publicKey() !== this.state.publicKey ) {
				const keypair = nextProps.keypair;

				this.setState( {
					publicKey: nextProps.keypair.publicKey(),
				} );

				// 기존 스트림 제거
				StreamManager.stopAllStream();

				// 스트림 시작
				StreamManager.accountStream = AccountStream( keypair.publicKey(), ( streamAccount ) => {
					this.props.streamAccount( streamAccount );
				} );
				StreamManager.effectsStream = EffectsStream( keypair.publicKey(), ( effects ) => {
					// console.log( effects );
					// effects.operation().then( function() {
					// 	console.log( 'operation' );
					// 	console.log(arguments);
					// });
					// effects.precedes().then( function() {
					// 	console.log( 'precedes' );
					// 	console.log(arguments);
					// });
					// effects.succeeds().then( function() {
					// 	console.log( 'succeeds' );
					// 	console.log(arguments);
					// });
					this.props.streamEffects( effects );
				} );
				StreamManager.offersStream = OffersStream( keypair.publicKey(), ( offers ) => {
					this.props.streamOffers( offers );
				} );
				StreamManager.paymentStream = PaymentStream( keypair.publicKey(), ( payment ) => {
					this.props.streamPayment( payment );
				} );
			}
		}
		else {
			// 기존 스트림 제거
			StreamManager.stopAllStream();
		}

		this.selectLang( nextProps.language );
	}
}

const mapStateToProps = ( state ) => ({
	language: state.language.language,
	keypair: state.keypair.keypair,
	showSpinner: state.spinner.isShow,
	showKeyGenerator: state.keyGenerator.isShow,
	showGeneratorConfirm: state.generatorConfirm.isShow,
	showRecordSeed: state.recordSeed.isShow,
	showCopyComplete: state.copyComplete.isShow,
	showTransactionConfirm: state.transactionConfirm.isShow,
	showTransactionComplete: state.transactionComplete.isShow,
	payment: state.stream.payment,
});

const mapDispatchToStore = ( dispatch ) => ( {
	streamAccount: ( $account ) => {
		dispatch( actions.streamAccount( $account ) );
	},
	streamEffects: ( $effects ) => {
		dispatch( actions.streamEffects( $effects ) );
	},
	streamOffers: ( $offers ) => {
		dispatch( actions.streamOffers( $offers ) );
	},
	streamPayment: ( $payment ) => {
		dispatch( actions.streamPayment( $payment ) );
	},
	resetHistory: () => {
		dispatch( actions.resetHistory() );
	},
} );

App = withRouter( connect( mapStateToProps, mapDispatchToStore )( App ) );

export default App;
