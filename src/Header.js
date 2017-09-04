import React, { Component } from 'react';
import LanguageSelector from './UiComponents/LanguageSelector';
import logo from './assets/imgs/boscoin-wallet-logo.png';
//import downloadIcon from './assets/imgs/download-icon.png';

class Header extends Component {
	headerContainerStyle = {
		width: '100%',
		position: 'relative',
		margin: 'auto',
		backgroundColor: '#1b1b26'
	};

	logoStyle = {
		width: '122px',
		height: '37px',
		position: 'relative',
		top: '4px',
		marginBottom: '32px'
	};

	seeTheManualStyle = {
		paddingTop: '30px',
		fontSize: '0.5em',
		color: '#ffffff',
		textAlign: 'right'
	};

	downloadIconStyle = {
		width: '14px',
		marginLeft: '8px'
	}

	render() {
		return (
			<div style={this.headerContainerStyle}>
				<div className="h-group">
					<div className="col">
						<img style={this.logoStyle} src={logo} alt="BOSCoin logo"/>
					</div>
					<div className="col right">
						<LanguageSelector/>
					</div>
				</div>
				{/*<div style={{ display: 'flex' }}>*/}
					{/*<div style={{ flex: '1', textAlign: 'left' }}>*/}

					{/*</div>*/}
					{/*<div style={{ flex: '1' }}>*/}
						{/*<p style={this.seeTheManualStyle}>*/}
							{/*/!*See the full manual*!/*/}
							{/*/!*<img src={downloadIcon} style={this.downloadIconStyle} alt="Download full menual"/>*!/*/}


						{/*</p>*/}
					{/*</div>*/}
				{/*</div>*/}
			</div>
		)
	}
}

export default Header;