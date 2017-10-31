import React, { Component } from 'react';
import BlueButton from 'components/BlueButton';
import './LoginView.scss';
import { Redirect } from "react-router-dom";
import { StellarServer, StellarTools } from 'libs/stellar-toolkit';
import * as actions from "actions/index";
import { connect } from "react-redux";
import T from 'i18n-react';
import StreamManager from "../StreamManager";
import { StellarStreamers } from 'libs/stellar-toolkit';
import pageview from 'utils/pageview';

const { getAccount } = StellarServer;
const { OffersStream, EffectsStream, AccountStream, PaymentStream } = StellarStreamers;

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
				if( this.props.keypair ) {
					if( this.props.keypair.publicKey() !== keypair.publicKey() ) {
						StreamManager.stopAllStream();
						this.props.resetHistory();

						StreamManager.accountStream = AccountStream( keypair.publicKey(), ( streamAccount ) => {
							this.props.streamAccount( streamAccount );
						} );
						StreamManager.effectsStream = EffectsStream( keypair.publicKey(), ( effects ) => {
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
					StreamManager.accountStream = AccountStream( keypair.publicKey(), ( streamAccount ) => {
						this.props.streamAccount( streamAccount );
					} );
					StreamManager.effectsStream = EffectsStream( keypair.publicKey(), ( effects ) => {
						this.props.streamEffects( effects );
					} );
					StreamManager.offersStream = OffersStream( keypair.publicKey(), ( offers ) => {
						this.props.streamOffers( offers );
					} );
					StreamManager.paymentStream = PaymentStream( keypair.publicKey(), ( payment ) => {
						this.props.streamPayment( payment );
					} );
				}

				this.props.updateKeypair( keypair );
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

				<div className="content-container">
					<div className="content-middle-wrapper">
						<div className="content-wrapper">
							<div>
								<h1>
									<T.span text="login_view.header"/>
								</h1>
								<span className="under-line-blue"> </span>
								<p>
									<T.span text="login_view.guide_line_1"/><br/>
									<T.span text="login_view.guide_line_2"/>
								</p>

								<textarea placeholder={T.translate( 'login_view.header' )} onChange={this.validateSeed}
										  style={style}
								/>
								<p className="button-wrapper">
									<BlueButton medium onClick={this.openWallet} disabled={!this.state.isValid}><T.span
										text="common.open"/></BlueButton>
								</p>
							</div>
						</div>
					</div>
				</div>

			</div>
		)
	}

	componentDidMount() {
		pageview();
	}
}

const mapStoreToProps = ( store ) => ({
	keypair: store.keypair.keypair,
});

// Redux
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
	updateKeypair: ( $keypair ) => {
		dispatch( actions.updateKeypair( $keypair ) );
	},
	resetHistory: () => {
		dispatch( actions.resetHistory() );
	},
} );

LoginView = connect( mapStoreToProps, mapDispatchToStore )( LoginView );

export default LoginView;