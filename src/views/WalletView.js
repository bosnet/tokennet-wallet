import React, { Component } from 'react';
import KeyDisplayer from 'components/KeyDisplayer';
import HistoryTable from 'components/HistoryTable';
import MyBalance from 'components/MyBalance'
import T from 'i18n-react';
import './WalletView.scss';
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import IconButton from 'components/IconButton';
import SendIcon from 'assets/imgs/send-icon.png';
import ReceiveIcon from 'assets/imgs/receive-icon.png';
import pageview from 'utils/pageview';

class WalletView extends Component {
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
			<div className="wallet-view-container">
				{this.renderRedirect()}

				<div className="content-container">
					<div className="content-middle-wrapper">
						<div className="content-wrapper">
							<div>
								<p className="your-account">{T.translate( 'wallet_view.balance' )}</p>

								<hr/>

								<MyBalance/>

								<p className="button-wrapper">
									<IconButton to="/send" label={ T.translate( 'common.send' ) }
												onClick={ () => this.props.postponeTimer( true ) }
												image={ SendIcon } iconRight/>
									<IconButton to="/receive" label={ T.translate( 'common.receive' ) }
												onClick={ () => this.props.postponeTimer( true ) }
												image={ ReceiveIcon } iconRight/>
								</p>

								<KeyDisplayer darkTheme/>
								<HistoryTable/>
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

const mapStateToProps = ( state ) => ({
	keypair: state.keypair.keypair,
});

WalletView = connect( mapStateToProps )( WalletView );

export default WalletView;