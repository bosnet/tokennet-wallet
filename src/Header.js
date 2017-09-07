import React, { Component } from 'react';
import LanguageSelector from './UiComponents/LanguageSelector';
import 'Header.scss';
import logo from './assets/imgs/boscoin-wallet-logo.png';
import downloadIcon from './assets/imgs/download-icon.png';
import { Link } from "react-router-dom";

class Header extends Component {
	render() {
		return (
			<div className="header-container">
				<div className="h-group">
					<div className="col">
						<Link to={ '/' }>
							<img className="logo-image" src={logo} alt="BOSCoin logo"/>
						</Link>
					</div>
					<div className="col right">
						<LanguageSelector/>
						<p className="see-the-full-manual">
							See the full manual
							<img className="download-icon" src={downloadIcon} style={this.downloadIconStyle} alt="Download full menual"/>
						</p>
					</div>
				</div>
			</div>
		)
	}
}

export default Header;