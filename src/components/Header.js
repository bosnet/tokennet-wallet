import React, { Component } from 'react';
import LanguageSelector from 'components/LanguageSelector';
import './Header.scss';
import logo from 'assets/imgs/bos-logo.png';
import downloadIcon from 'assets/imgs/download-icon.png';
import { Link } from "react-router-dom";
import T from 'i18n-react';
import Timer from "./Timer";
import * as actions from "actions/index";
import { connect } from "react-redux";

class Header extends Component {
	render() {
		return (
			<div className="header-container">
				<div className="logo-container">
					<Link to={'/'} onClick={ () => this.props.showTimer( false ) }>
						<img className="logo-image" src={logo} alt="BOSCoin logo"/>
					</Link>
				</div>

				<div className="header-utils">
					<div className="col right">
						<p className="see-the-full-manual">
							<a href={ T.translate( 'header.pdf_path' ) } target="_blank">
								<T.span text="header.see_manual"/>
								<img className="download-icon" src={downloadIcon} style={this.downloadIconStyle}
									 alt="User Guide"/>
							</a>
						</p>
						<LanguageSelector/>
					</div>
				</div>

				<div className="bos-timer">
					{ this.props.timer.isShow &&
					<Timer/>
					}
				</div>
			</div>
		)
	}
}

const mapStoreToProps = ( store ) => ({
	timer: store.timer,
});

// Redux
const mapDispatchToStore = ( dispatch ) => ( {
	streamAccount: ( $account ) => {
		dispatch( actions.streamAccount( $account ) );
	},
	showTimer: ( isShow ) => {
		dispatch( actions.showTimer( isShow ) );
	},
} );

Header = connect( mapStoreToProps, mapDispatchToStore )( Header );

export default Header;