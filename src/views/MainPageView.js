import React, { Component } from 'react';
import symbolImage from 'assets/imgs/boscoin-symbol-image.png';
import BlueButton from 'UiComponents/BlueButton';
import './MainPageView.scss';
import { connect } from "react-redux";
import * as actions from "actions/index";
import { Redirect } from "react-router-dom";

class MainPageView extends Component {
	constructor() {
		super();

		this.state = {
			redirect: null,
			contentBottom: false,
		};

		this.clickMakeNewKey = this.clickMakeNewKey.bind( this );
		this.clickOpenYourWallet = this.clickOpenYourWallet.bind( this );
		this.resizing = this.resizing.bind(this);
	}

  clickMakeNewKey() {
		this.props.showGeneratorConfirm( true );
  }

  clickOpenYourWallet() {
	  this.setState( { redirect: '/login' } );
  }

  renderRedirect() {
		if( this.state.redirect === null ) {
			return '';
		}
		else {
			return <Redirect to={ this.state.redirect }/>
		}
  }

  resizing () {
    let upper = 302;
    let under = 0;
    if( document.getElementById('step-to-make-account') ) {
    	under = document.getElementById('step-to-make-account').clientHeight;
    }

    this.setState({
			contentBottom: upper + under <= window.innerHeight
		});
	}

  componentDidMount () {
		this.resizing();
		window.addEventListener('resize', this.resizing);
	}

	render() {
		return (
			<div id="main-page-container" className="main-page-container">
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

				<div id="step-to-make-account" className={this.state.contentBottom ? 'content-bottom' : ''}>
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

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizing);
  }
}

const mapDispatchToProps = ( dispatch ) => ({
  showGeneratorConfirm: ( $isShow ) => {
    dispatch( actions.showGeneratorConfirm( $isShow ) );
  }
});

MainPageView = connect( null, mapDispatchToProps )( MainPageView );

export default MainPageView;