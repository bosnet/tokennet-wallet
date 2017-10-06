import React, { Component } from 'react';
import numeral from 'numeral';
import T from 'i18n-react';
import './HistoryTable.scss';
import { connect } from "react-redux";
import moment from 'moment';

class HistoryTable extends Component {
	RENDER_ITEM_PER = 5;

	constructor() {
		super();

		this.renderHistory = this.renderHistory.bind( this );
		this.readMore = this.readMore.bind( this );

		const state = {
			historyPage: 0,
		};

		this.state = state;
	}

	readMore() {
		this.setState( {
			historyPage: this.state.historyPage + 1
		} );
	}

	shortAddress( $address, $length = 6 ) {
		return $address.substr( 0, $length ) + '...' + $address.substr( $length * -1 );
	}

	renderHistory() {
		const history = [];
		let data = this.props.paymentHistory;
		let length = data.length;

		if ( (this.state.historyPage + 1) * this.RENDER_ITEM_PER < length ) {
			length = (this.state.historyPage + 1) * this.RENDER_ITEM_PER;
		}

		for ( let i = 0; i < length; i++ ) {
			const payment = data[ i ];
			const me = this.props.keypair.publicKey();
			let amount = 0;
			let label = '';
			let target = '';
			let date = moment( payment.transaction.created_at ).format( 'YY-MM-DD HH:mm' );
			switch ( payment.type ) {
				case 'create_account' :
					const funder = payment.funder;
					if ( funder === me ) {
						label = 'wallet_view.sent'; // TODO: 생성하며 보내는 경우 표기가 추후 달라질 수 있음
						target = payment.account;
					}
					else {
						label = 'wallet_view.created_account';
					}
					amount = payment.starting_balance;
					break;
				case 'payment' :
					const from = payment.from;
					if ( me === from ) {
						label = 'wallet_view.sent';
						target = payment.to;
					}
					else {
						label = 'wallet_view.received';
						target = payment.from;
					}
					amount = data[ i ].amount;
					break;
				default :
					break;
			}
			if ( label !== '' ) {
				const DOM = <tr key={data[ i ].id}>
					<td><T.span text={label}/></td>
					<td className={ 'target-cell' }>{target}</td>
					<td>{numeral( amount ).format( '0,0.0000[00000000]' )}</td>
					<td>{date}</td>
				</tr>;
				history.push( DOM );
			}
		}

		return history;
	}

	render() {
		return (
			<div className="history-table-container" data-lang={this.props.language}>
				<p><T.span text="wallet_view.history"/></p>
				<table data-length={this.props.paymentHistory.length}>
					<tbody>
					{this.renderHistory()}
					</tbody>
				</table>
				<p className={"more-wrapper " +
				((this.state.historyPage + 1) * this.RENDER_ITEM_PER < this.props.paymentHistory.length ? 'is-more' : '')
				}>
					<span onClick={this.readMore}>more </span>
				</p>
			</div>
		)
	}
}

const mapStoreToProps = ( store ) => ( {
	keypair: store.keypair.keypair,
	paymentHistory: store.stream.paymentHistory,
	language: store.language.language,
} );

HistoryTable = connect( mapStoreToProps )( HistoryTable );

export default HistoryTable;