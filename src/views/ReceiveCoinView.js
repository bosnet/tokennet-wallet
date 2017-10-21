import React, { Component } from 'react';
import MyBalance from 'components/MyBalance'
// import RecentHistory from 'components/RecentHistory';
import KeyDisplayer from 'components/KeyDisplayer';
import BlueButton from 'components/BlueButton';
import QRious from 'qrious';
import { Link, Redirect } from "react-router-dom";
import './ReceiveCoinView.scss';
import T from 'i18n-react';
import { connect } from "react-redux";

class ReceiveCoinView extends Component {
	componentDidMount() {
		if( this.props.keypair ) {
			new QRious( {
				element: document.getElementById( 'my-address-qrcode' ),
				value: this.props.keypair.publicKey(),
			} );
		}
	}

	renderRedirect() {
		if ( this.props.keypair === null ) {
			return <Redirect to={'/'}/>;
		}
		else {
			return '';
		}
	}

	render() {
		return (
			<div className="receive-coin-view-container">
				{this.renderRedirect()}
				{/*<RecentHistory/>*/}
				<MyBalance/>

				<div className="receive-wrapper">
					<p>{T.translate( 'common.receive' )}</p>
					<canvas width="90" height="90" id="my-address-qrcode"></canvas>
				</div>

				<KeyDisplayer/>
				<div className="button-wrapper">
					<Link to="/wallet">
						<BlueButton medium>{T.translate( 'common.account' )}</BlueButton>
					</Link>

					<Link to="/send">
						<BlueButton medium>{T.translate( 'common.send' )}</BlueButton>
					</Link>
				</div>
			</div>
		)
	}
}

const mapStateToProps = ( state ) => ({
	keypair: state.keypair.keypair,
});

ReceiveCoinView = connect( mapStateToProps )( ReceiveCoinView );

export default ReceiveCoinView;