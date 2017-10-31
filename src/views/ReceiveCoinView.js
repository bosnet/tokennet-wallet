import React, { Component } from 'react';
import MyBalance from 'components/MyBalance'
import KeyDisplayer from 'components/KeyDisplayer';
import QRious from 'qrious';
import { Redirect } from "react-router-dom";
import './ReceiveCoinView.scss';
import T from 'i18n-react';
import { connect } from "react-redux";
import IconButton from 'components/IconButton';
import AccountIcon from 'assets/imgs/account-icon.png';
import SendIcon from 'assets/imgs/send-icon.png';
import pageview from 'utils/pageview';

class ReceiveCoinView extends Component {
	componentDidMount() {
		if( this.props.keypair ) {
			new QRious( {
				element: document.getElementById( 'my-address-qrcode' ),
				value: this.props.keypair.publicKey(),
			} );
		}
		pageview();
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

				<div className="content-container">
					<div className="content-middle-wrapper">
						<div className="content-wrapper">
							<div>
								<p className="receive-coin-view-container__title" data-lang={this.props.language}>{T.translate( 'common.receive' )}</p>

								<hr/>

								<MyBalance/>

								<div className="receive-wrapper">
									<canvas width="90" height="90" id="my-address-qrcode"/>
								</div>

								<KeyDisplayer darkTheme/>
								<div className="h-group button-wrapper">
									<div className="col">
										<IconButton to="/wallet" label={ T.translate( 'common.account' ) }
													image={ AccountIcon } iconLeft/>
									</div>
									<div className="col right">
										<IconButton to="/send" label={ T.translate( 'common.send' ) }
													image={ SendIcon } iconRight/>
									</div>
								</div>
							</div>
						</div>
					</div>
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