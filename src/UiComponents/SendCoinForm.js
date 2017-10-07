import React, { Component } from 'react';
import BlueButton from './BlueButton';
import { connect } from "react-redux";
import * as actions from "actions/index";
import './SendCoinForm.scss';
import T from 'i18n-react';
import { Redirect } from "react-router-dom";
import { StellarTools } from 'libs/stellar-toolkit';
import TextAlert from "./TextAlert";
import AmountInput from "./AmountInput";
import Decimal from 'decimal.js';
import numeral from 'numeral';

class SendCoinForm extends Component {
	constructor() {
		super();

		this.checkPublicKey = this.checkPublicKey.bind( this );
		this.openTransactionConfirm = this.openTransactionConfirm.bind( this );

		const state = {
			sendingAmount: null,
			transactionFee: 0.00001,
			transactionTotal: 0.0001,
			addressValidated: false,
			publicKey: null,
			error: null,
		};

		this.state = state;

		this.renderError = this.renderError.bind( this );
	}

	checkPublicKey( $event ) {
		const key = $event.currentTarget.value.trim();

		// 본인의 public key 일 경우 무조건 false
		if ( this.props.keypair.publicKey() === key ) {
			this.setState( { addressValidated: false } );
			return false;
		}

		StellarTools.resolveAddress( key )
			.then( ( resolved ) => {
				this.setState( { publicKey: key, addressValidated: true } );
			} )
			.catch( () => {
				this.setState( { publicKey: null, addressValidated: false } );
			} );
	}

	updateAmount( $event ) {
		const sendingAmount = Number( $event.currentTarget.value );
		const transactionTotal = sendingAmount + this.state.transactionFee;
		this.setState( {
			sendingAmount,
			transactionTotal,
		} );
	}

	openTransactionConfirm() {
		if ( !this.state.publicKey ) {
			this.setState( { error: "send_coin.error.public_address_null" } );
			return false;
		}
		if ( !this.state.addressValidated ) {
			this.setState( { error: "send_coin.error.incorrect_public_address" } );
			return false;
		}
		if ( this.state.sendingAmount === null || this.state.sendingAmount <= 0 ) {
			this.setState( { error: "send_coin.error.transaction_amount_null" } );
			return false;
		}
		const balance = Number( this.props.account.balances[ 0 ].balance );
		if ( this.state.transactionTotal > balance ) {
			this.setState( { error: "send_coin.error.not_enough_balance" } );
			return false;
		}
		if ( balance - this.state.transactionTotal < 20 ) {
			this.setState( { error: "send_coin.error.minimum_balance" } );
			return false;
		}

		this.setState( { error: null } );

		const paymentData = {};
		paymentData.memo = { type: 'none' };
		paymentData.asset = { code: 'XLM', uuid: 'native', shortName: 'XLM', asset_type: 'native' };
		paymentData.destination = this.state.publicKey;
		paymentData.amount = this.state.sendingAmount.toString();
		paymentData.transactionFee = this.state.transactionFee;
		paymentData.transactionTotal = new Decimal( this.state.sendingAmount ).plus( this.state.transactionFee );

		this.props.showTransactionConfirm( true, paymentData );

		document.querySelector( '.input-public-address' ).value = '';
		document.querySelector( '.input-sending-amount' ).value = '';
		this.setState( {
			publicKey: null,
			sendingAmount: null,
			addressValidated: false,
		} );
	}

	renderRedirect() {
		if ( this.props.keypair === null ) {
			return <Redirect to={'/'}/>;
		}
		else {
			return '';
		}
	}

	renderError() {
		if ( this.state.error ) {
			return <TextAlert>{T.translate( this.state.error )}</TextAlert>;
		}
		else {
			return '';
		}
	}

	render() {
		return (
			<div className="send-coin-form-container">
				{this.renderRedirect()}
				<p data-lang={this.props.language}>{T.translate( 'common.send' )}</p>

				<div className="input-group">
					<div className="input-group-label-wrapper">
						<p className="input-label only-mobile">
							{T.translate( 'send_coin.input_recipient_address' )}
						</p>
						<p className="transaction-fee">
							{T.translate( 'send_coin.transaction_fee' )}: <span>{this.state.transactionFee} BOS</span>
						</p>

						<p className="input-label gt-md">
							{T.translate( 'send_coin.input_recipient_address' )}
						</p>
						<input className="input-public-address" type="text" onChange={this.checkPublicKey}/>
						<span className={
							'public-address-validation ' +
							(this.state.addressValidated ? 'validated' : '')
						}> </span>
					</div>
				</div>

				<div className="input-group">
					<div className="input-group-label-wrapper">
						<p className="input-label only-mobile">
							{T.translate( 'send_coin.input_amount' )}
						</p> <br/>
						<p className="input-label gt-md">
							{T.translate( 'send_coin.input_amount' )}
						</p>
						<AmountInput className={'input-sending-amount'} onChange={$event => {
							this.updateAmount( $event )
						}}/>
						<p className="sending-amount">
							{T.translate( 'send_coin.total_will_be_sent', { amount: numeral( this.state.transactionTotal ).format( '0,0.0000[00000000]' ) } )}
						</p>
					</div>
				</div>

				<div className="button-wrapper">
					{this.renderError()}
					<BlueButton onClick={this.openTransactionConfirm} medium>{T.translate( 'common.send' )}</BlueButton>
				</div>
			</div>
		)
	}
}

const mapDispatchToProps = ( dispatch ) => ({
	showTransactionConfirm: ( $isShow, $paymentData ) => {
		dispatch( actions.showTransactionConfirm( $isShow, $paymentData ) );
	}
});

const mapStoreToProps = ( store ) => ({
	keypair: store.keypair.keypair,
	language: store.language.language,
	account: store.stream.account,
	showTransactionComplete: store.transactionComplete.isShow,
});

SendCoinForm = connect( mapStoreToProps, mapDispatchToProps )( SendCoinForm );

export default SendCoinForm;