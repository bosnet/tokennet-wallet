import React, { Component } from 'react';
import numeral from 'numeral';
import T from 'i18n-react';
import './MyBalance.scss';
import { connect } from 'react-redux';
import AmountSpan from "./AmountSpan";

class MyBalance extends Component {
	render() {
		let balance = 0;
		if ( this.props.account ) {
			balance = this.props.account.balances[ 0 ].balance;
		}

		return (
			<div className="balance-container">
				<p id="balance-label" data-lang={ this.props.language }><T.span text="wallet_view.balance"/></p>
				<p id="balance">
					<AmountSpan value={ numeral( balance ).format( '0,0.0000[00000000]' ) }/>
					{ ' ' }
					<span className={ 'unit' }>BOS</span>
				</p>
				<p id="bos-unit">BOS</p>
			</div>
		)
	}
}

const mapStoreToProps = ( store ) => ( {
	account: store.stream.account,
	language: store.language.language,
} );

MyBalance = connect( mapStoreToProps )( MyBalance );

export default MyBalance