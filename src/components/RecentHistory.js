import React, { Component } from 'react';
import './RecentHistory.scss';
import { connect } from "react-redux";
import T from 'i18n-react';
import trimZero from "../utils/trimZero";

class RecentHistory extends Component {
	constructor() {
		super();

		const state = {
			recent: [ 'received', 765000.0072 ]
		}

		this.state = state;
	}

	render() {
		let amount = 0;
		let DOM = <p data-length={this.props.paymentHistory.length} data-lang={this.props.language}
					 className="recent-history"/>;
		if ( this.props.paymentHistory && this.props.paymentHistory.length > 0 ) {
			const me = this.props.keypair.publicKey();
			const payment = this.props.paymentHistory[ 0 ];
			if ( payment.type === 'payment' ) {
				amount = trimZero( this.props.paymentHistory[ 0 ].amount );
				let label = 'wallet_view.you_just_received';

				if ( payment.from === me ) {
					label = 'wallet_view.you_just_sent'
				}

				DOM = <p data-lang={this.props.language} className="recent-history">
					<T.span text={{ key: label, amount }}/>
				</p>;
			}
		}
		return DOM;
	}
}

const mapStoreToProps = ( store ) => ( {
	keypair: store.keypair.keypair,
	paymentHistory: store.stream.paymentHistory,
	language: store.language.language,
} );

RecentHistory = connect( mapStoreToProps )( RecentHistory );

export default RecentHistory;