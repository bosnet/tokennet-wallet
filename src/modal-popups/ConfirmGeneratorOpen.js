import React, { Component } from 'react';
import ModalContainer from './ModalContainer';
import BlueButton from 'components/BlueButton';
import KeyGeneratorMessage from './KeyGeneratorMessage';
import './ConfirmGeneratorOpen.scss';
import * as actions from "actions/index";
import { connect } from "react-redux";
import T from 'i18n-react';
import { Keypair } from 'libs/stellar-sdk';
import pageview from "utils/pageview";

class ConfirmGeneratorOpen extends Component {
	openKeyGenerator = () => {
		this.props.updateKeypair( Keypair.random() );
		this.props.showGeneratorConfirm( false );
		this.props.showKeyGenerator( true );
	};

	doClose = () => {
		this.props.showGeneratorConfirm( false );
	};

	render() {
		return (
			<ModalContainer doClose={this.doClose} modalOpen={this.props.modalOpen}>
				<div className="confirm-open-container">
					<KeyGeneratorMessage/>

					<p className="button-wrapper">
						<BlueButton medium
									onClick={this.openKeyGenerator}>{T.translate( 'common.generator' )}</BlueButton>
						<BlueButton medium onClick={this.doClose}>{T.translate( 'common.close' )}</BlueButton>
					</p>

				</div>
			</ModalContainer>
		)
	}

	componentDidMount() {
		pageview( '/popup/confirm-generator-open' );
	}
}

// Redux
const mapDispatchToProps = ( dispatch ) => ({
	showSpinner: ( $isShow ) => {
		dispatch( actions.showSpinner( $isShow ) );
	},
	showKeyGenerator: ( $isShow ) => {
		dispatch( actions.showKeyGenerator( $isShow ) );
	},
	showGeneratorConfirm: ( $isShow ) => {
		dispatch( actions.showGeneratorConfirm( $isShow ) );
	},
	updateKeypair: ( $keypair ) => {
		dispatch( actions.updateKeypair( $keypair ) );
	},
});

ConfirmGeneratorOpen = connect( null, mapDispatchToProps )( ConfirmGeneratorOpen );

export default ConfirmGeneratorOpen;