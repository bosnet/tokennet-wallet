import React, { Component } from 'react';
import symbolImage from './assets/imgs/boscoin-symbol-image.png';
import BlueButton from './UiComponents/BlueButton';
import './MainPageView.scss';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./actions/index";

class MainPageView extends Component {
	constructor() {
		super();

		this.state = {
			redirect: null,
		};

		this.renderRedirect = this.renderRedirect.bind( this );
		this.clickMakeNewKey = this.clickMakeNewKey.bind( this );
		this.clickOpenYourWallet = this.clickOpenYourWallet.bind( this );
	}

  renderRedirect() {
	  if( this.state.redirect ) {
	  	return <Redirect to={ this.state.redirect }/>
	  }
	  else {
	  	return '';
	  }
  }

  clickMakeNewKey() {
		this.props.showGeneratorConfirm( true );
  }

  clickOpenYourWallet() {
		this.setState( { redirect: '/wallet' } );
  }

	render() {
		return (
			<div className="main-page-container">
				{ this.renderRedirect() }
				<div className="symbol-image-container">
					<img src={symbolImage} alt="BOSCoin symbol"/>
				</div>
				<p>BOScoin Wallet</p>
				<p>Make your seed, manage your Wallet, send and receive BOScoins</p>

				<div className="button-container">
					<BlueButton big onClick={ this.clickMakeNewKey }>Make a new key</BlueButton> <br/>
					<BlueButton big onClick={ this.clickOpenYourWallet }>Open your wallet</BlueButton>
				</div>

				<div>
					<h2>Step to make your account send BOScoin</h2>
					<ol>
						<li>Make new key by <BlueButton small nonAction>Make a new key</BlueButton> button above</li>
						<li>Write down two keys and keep it safely (Very Important!!)</li>
						<li>Open your account by <BlueButton small nonAction>Open your wallet</BlueButton> button above
						</li>
						<li>Input your seed address in the blank</li>
						<li>Press <BlueButton tiny nonAction>Open</BlueButton> button and you will see your account</li>
						<li>Press <BlueButton tiny nonAction>Send</BlueButton> button and input the public address of
							recipient into the blank
						</li>
					</ol>
				</div>
			</div>
		)
	}
}

const mapDispatchToProps = ( dispatch ) => ({
  showGeneratorConfirm: ( $isShow ) => {
    dispatch( actions.showGeneratorConfirm( $isShow ) );
  }
});

MainPageView = connect( null, mapDispatchToProps )( MainPageView );

export default MainPageView;