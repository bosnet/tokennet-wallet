import React, { Component } from 'react';
import ModalContainer from './ModalContainer';
import BlueButton from 'components/BlueButton';
import './TransactionComplete.scss';
import { connect } from "react-redux";
import * as actions from "actions/index";
import T from 'i18n-react';
import AmountSpan from "components/AmountSpan";
import trimZero from "../utils/trimZero";
import pageview from "utils/pageview";

class TransactionComplete extends Component {
	closeTransactionComplete = () => {
		this.props.transactionComplete( false, null );
	};

	render() {
		let amount = 0;
		if ( this.props.paymentData ) {
			amount = trimZero( this.props.paymentData.transactionTotal );
		}
		return (
			<ModalContainer modalOpen={this.props.modalOpen} doClose={this.closeTransactionComplete}>
				<div className="transaction-complete-container">
					<h1>
						{T.translate( 'transaction_complete.header' )}
					</h1>
					<span className="under-line"></span>
					<p className="amount-text">
						{T.translate( 'common.total_amount' )}
					</p>
					<p className="transaction-amount">
						<AmountSpan value={ amount }/> BOS
					</p>
					<p className="button-wrapper">
						<BlueButton medium
									onClick={this.closeTransactionComplete}>{T.translate( 'common.close' )}</BlueButton>
					</p>
				</div>
			</ModalContainer>
		)
	}

	componentDidMount() {
		pageview( '/popup/transaction-complete' );
	}
}

const mapStoreToProps = ( store ) => ({
	paymentData: store.transactionComplete.paymentData,
});

const mapDispatchToProps = ( dispatch ) => ({
	transactionComplete: ( $isShow, $paymentData ) => {
		dispatch( actions.showTransactionComplete( $isShow, $paymentData ) );
	}
});

TransactionComplete = connect( mapStoreToProps, mapDispatchToProps )( TransactionComplete );


export default TransactionComplete;