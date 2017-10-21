import React, { Component } from 'react';
import MyBalance from 'components/MyBalance'
import RecentHistory from 'components/RecentHistory';
import KeyDisplayer from 'components/KeyDisplayer';
import SendCoinForm from 'components/SendCoinForm';
import BlueButton from 'components/BlueButton';
import { Link } from "react-router-dom";
import './SendCoinView.scss';
import T from 'i18n-react';

class SendCoinView extends Component {
	render() {
		return (
			<div className="send-coin-view-container">
				{/*<RecentHistory/>*/}
				<MyBalance/>
				<SendCoinForm/>
				<KeyDisplayer/>
				<div className="button-wrapper">
					<Link to="/wallet">
						<BlueButton medium>{T.translate( 'common.account' )}</BlueButton>
					</Link>

					<Link to="/receive">
						<BlueButton medium>{T.translate( 'common.receive' )}</BlueButton>
					</Link>
				</div>
			</div>
		)
	}
}

export default SendCoinView;