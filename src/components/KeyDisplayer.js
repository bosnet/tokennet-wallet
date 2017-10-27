import React, { Component } from 'react';
import BlueButton from './BlueButton';
import T from 'i18n-react';
import './KeyDisplayer.scss';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import Clipboard from 'clipboard';
import { each } from 'underscore';
import classNames from 'classnames';

class KeyDisplayer extends Component {
	render() {
		return (
			<div className={ classNames( { 'seed-container': true, 'dark-theme': this.props.darkTheme } )  }>
				<div className="key-boxes">
					<div className="caption">{T.translate( 'common.account_address' )}</div>
					<div className="key-box h-group">
						<div className="label col">
							{T.translate( 'common.public_address' )}
						</div>
						<div className="key col">
							{this.props.keypair ? this.props.keypair.publicKey() : ''}
						</div>
						<div className="copy-button col"
							 data-clipboard-text={this.props.keypair ? this.props.keypair.publicKey() : ''}>
							<BlueButton tiny filled><T.span text="common.copy"/></BlueButton>
						</div>
					</div>

					{ this.props.setOpenSecretKey &&
					<div className="key-box h-group">
						<hr/>

						<div className="label col">
							{T.translate( 'common.secret_seed' )}
						</div>
						<div className="key col">
							{this.props.keypair ? this.props.keypair.secret() : ''}
						</div>
						<div className="copy-button col"
							 data-clipboard-text={this.props.keypair ? this.props.keypair.secret() : ''}>
							<BlueButton tiny filled><T.span text="common.copy"/></BlueButton>
						</div>
					</div>
					}

				</div>
			</div>
		)
	}

	updateBackground = () => {
		if( this.props.darkTheme ) {
			const caption = document.querySelector( '.key-boxes .caption' );
			if( caption ) {
				const y = caption.getBoundingClientRect().y;
				caption.style.backgroundPositionY = y * -1 + 'px';
			}
		}
	};

	componentDidMount() {
		each( document.querySelectorAll( '.copy-button' ), $element => {
			const clipboard = new Clipboard( $element );

			clipboard.on( 'success', ( $event ) => {
				this.props.showCopyComplete( true );
				setTimeout( () => {
					this.props.showCopyComplete( false )
				}, 1500 )
			} );
		} );

		this.updateBackground();
		window.addEventListener( 'scroll', this.updateBackground );
		this.timer = setInterval( this.updateBackground, 200 );
	}

	componentWillUnmount() {
		if( this.timer ) {
			clearInterval( this.timer );
		}
		window.removeEventListener( 'scroll', this.updateBackground );
	}
}

const mapDispatchToProps = ( dispatch ) => ({
	showCopyComplete: ( $isShow ) => {
		dispatch( actions.showCopyComplete( $isShow ) );
	}
});

const mapStoreToProps = ( store ) => ({
	keypair: store.keypair.keypair,
	language: store.language.language,
});

KeyDisplayer = connect( mapStoreToProps, mapDispatchToProps )( KeyDisplayer );

export default KeyDisplayer;