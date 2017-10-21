import React, { Component } from 'react';
import wallet from 'assets/imgs/boscoin-symbol-image-blue.png';
import BlueButton from 'components/BlueButton';
import './LoginView.scss';
import { Redirect } from "react-router-dom";
import { StellarServer, StellarTools } from 'libs/stellar-toolkit';
import * as actions from "actions/index";
import { connect } from "react-redux";
import T from 'i18n-react';
import StreamManager from "../StreamManager";

const { getAccount } = StellarServer;

class LoginView extends Component {
	constructor() {
		super();

		this.state = {
			redirect: null,
			isValid: null,
		};
	}

	openWallet = () => {
		if ( this.state.isValid ) {
			this.setState( { redirect: '/wallet' } );
		}
	};

	renderRedirect() {
		if ( this.state.redirect === null ) {
			return '';
		}
		else {
			return <Redirect to={this.state.redirect}/>
		}
	}

	requestAccount = ( keypair ) => {
		getAccount( keypair.publicKey() )
			.then( account => {
				// to redux
				this.props.updateKeypair( keypair );

				// state 바인딩
				this.setState( { isValid: true } );
			} )
			.catch( error => {
				this.props.updateKeypair( null );
				this.setState( { isValid: false } );
			} );
	};

	validateSeed = ( $event ) => {
		const value = $event.currentTarget.value.trim();
		const isValid = StellarTools.validSeed( value );
		if ( isValid ) {
			const keypair = StellarTools.KeypairInstance( { secretSeed: value } );

			if( this.props.keypair ) {
				if( this.props.keypair.publicKey() !== keypair.publicKey() ) {
					StreamManager.stopAllStream();
					this.props.resetHistory();
					this.requestAccount( keypair );
				}
				else {
					this.setState( { isValid: true } );
				}
			}
			else {
				this.requestAccount( keypair );
			}


		}
		else {
			this.setState( { isValid: false } );
		}
	};

	render() {
		const style = {
			border: '1px solid #039cbf',
		};
		if ( this.state.isValid === false ) {
			style.border = '1px solid #f40b21';
		}
		return (
			<div className="login-container">
				{this.renderRedirect()}
				<img src={wallet} alt="BOSCoin symbol"/>
				<h1>
					<T.span text="login_view.header"/>
				</h1>
				<span className="under-line-blue"> </span>
				<p>
					<T.span text="login_view.guide_line_1"/><br/>
					<T.span text="login_view.guide_line_2"/>
				</p>

				<input type="text" placeholder={T.translate( 'login_view.header' )} onChange={this.validateSeed}
					   style={style}/>
				<p className="button-wrapper">
					<BlueButton medium onClick={this.openWallet} disabled={!this.state.isValid}><T.span
						text="common.open"/></BlueButton>
				</p>
			</div>
		)
	}
}

const mapStoreToProps = ( store ) => ({
	keypair: store.keypair.keypair,
});

// 리덕스 연결
const mapDispatchToStore = ( dispatch ) => ( {
	updateKeypair: ( $keypair ) => {
		dispatch( actions.updateKeypair( $keypair ) );
	},
	resetHistory: () => {
		dispatch( actions.resetHistory() );
	},
} );

LoginView = connect( mapStoreToProps, mapDispatchToStore )( LoginView );

export default LoginView;