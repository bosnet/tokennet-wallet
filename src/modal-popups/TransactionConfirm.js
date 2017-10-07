import React, { Component } from 'react';
import ModalContainer from './ModalContainer';
import BlueButton from 'components/BlueButton';
import './TransactionConfirm.scss';
import { connect } from "react-redux";
import * as actions from "actions/index";
import T from 'i18n-react';
import numeral from 'numeral';
import * as StellarToolkit from 'libs/stellar-toolkit/index';
import async from 'async';
import { find } from 'underscore';

const { StellarOperations } = StellarToolkit;

class TransactionConfirm extends Component {
	constructor() {
		super();

		this.showSendComplete = this.showSendComplete.bind( this );
		this.hideTransactionConfirm = this.hideTransactionConfirm.bind( this );
	}

	showSendComplete() {
		this.props.showSpinner( true );

		const queue = [];
		queue.push( $callback => {
			StellarOperations.sendPayment( this.props.paymentData )( this.props.keypair )
				.then( () => {
					$callback( null, false );
				} )
				.catch( ( $error ) => {
					const noDestination = find( $error.extras.result_codes.operations, $item => 'op_no_destination' );
					if ( noDestination ) {
						$callback( null, $error.extras );
					}
					$callback( '보내기에 실패했습니다.' );
				} );
		} );
		queue.push( ( $extras, $callback ) => {
			if ( $extras ) {
				StellarOperations.createAccount( this.props.paymentData )( this.props.keypair )
					.then( () => {
						$callback();
					} )
					.catch( ( $error ) => {
						$callback( '보내기에 실패했습니다. (받는 계좌 개설 실패)' );
					} );
			}
			else {
				$callback();
			}
		} );

		async.waterfall( queue, ( $error, $result ) => {
			if ( $error ) {
				this.props.showSpinner( false );
				this.props.transactionConfirm( false, null );
				alert( $error );
			}
			else {
				this.props.showSpinner( false );
				this.props.transactionComplete( true, this.props.paymentData );
				this.props.transactionConfirm( false, null );
			}
		} );

	}

	hideTransactionConfirm() {
		this.props.transactionConfirm( false, null );
	}

	render() {
		let amount = 0;
		let total = 0;
		if ( this.props.paymentData ) {
			amount = numeral( this.props.paymentData.amount ).format( '0,0.0000[00000000]' );
			total = numeral( this.props.paymentData.transactionTotal ).format( '0,0.0000[00000000]' );
		}
		return (
			<ModalContainer modalOpen={this.props.modalOpen} doClose={this.hideTransactionConfirm}>
				<div className="transaction-confirm-container">
					<h1>
						{T.translate( "transaction_confirm.header" )}
					</h1>
					<span className="under-line"></span>
					<p>
						{T.translate( "transaction_confirm.text" )}
					</p>
					<div className="transaction-box">
						<table>
							<tbody>
							<tr>
								<td>
									{T.translate( "common.public_address" )}
								</td>
								<td>
									{this.props.paymentData ? this.props.paymentData.destination : ''}
								</td>
							</tr>
							<tr>
								<td>{T.translate( "common.amount" )}</td>
								<td>
									{amount} BOS
								</td>
							</tr>
							<tr>
								<td>
									{T.translate( "common.total_amount" )}
								</td>
								<td>
									{total} BOS
								</td>
							</tr>
							</tbody>
						</table>
					</div>
					<p className="button-wrapper">
						<BlueButton medium onClick={this.showSendComplete}>{T.translate( "common.send" )}</BlueButton>
						<BlueButton medium
									onClick={this.hideTransactionConfirm}>{T.translate( "common.cancel" )}</BlueButton>
					</p>
				</div>
			</ModalContainer>
		)
	}
}

const mapStoreToProps = ( store ) => ({
	keypair: store.keypair.keypair,
	paymentData: store.transactionConfirm.paymentData,
});

const mapDispatchToProps = ( dispatch ) => ({
	showSpinner: ( $isShow ) => {
		dispatch( actions.showSpinner( $isShow ) );
	},
	transactionConfirm: ( $isShow, $paymentData ) => {
		dispatch( actions.showTransactionConfirm( $isShow, $paymentData ) );
	},
	transactionComplete: ( $isShow, $paymentData ) => {
		dispatch( actions.showTransactionComplete( $isShow, $paymentData ) );
	}
});

TransactionConfirm = connect( mapStoreToProps, mapDispatchToProps )( TransactionConfirm );

export default TransactionConfirm;