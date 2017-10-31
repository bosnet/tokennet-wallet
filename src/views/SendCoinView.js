import React, { Component } from 'react';
import MyBalance from 'components/MyBalance'
import KeyDisplayer from 'components/KeyDisplayer';
import SendCoinForm from 'components/SendCoinForm';
import './SendCoinView.scss';
import T from 'i18n-react';
import IconButton from 'components/IconButton';
import AccountIcon from 'assets/imgs/account-icon.png';
import ReceiveIcon from 'assets/imgs/receive-icon.png';
import pageview from 'utils/pageview';

class SendCoinView extends Component {
	render() {
		return (
			<div className="send-coin-view-container">
				<div className="content-container">
					<div className="content-middle-wrapper">
						<div className="content-wrapper">
							<div>
								<p className="send-coin-view-container__title" data-lang={this.props.language}>{T.translate( 'common.send' )}</p>

								<hr/>

								<MyBalance/>
								<SendCoinForm/>
								<KeyDisplayer darkTheme/>
								<div className="h-group button-wrapper">
									<div className="col">
										<IconButton to="/wallet" label={ T.translate( 'common.account' ) }
													image={ AccountIcon } iconLeft/>
									</div>
									<div className="col right">
										<IconButton to="/receive" label={ T.translate( 'common.receive' ) }
													image={ ReceiveIcon } iconRight/>
									</div>
								</div>
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

export default SendCoinView;