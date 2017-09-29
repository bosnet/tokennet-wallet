import React, { Component } from 'react';
import symbolImage from 'assets/imgs/boscoin-symbol-image.png';
import BlueButton from 'UiComponents/BlueButton';
import './MainPageView.scss';
import { connect } from "react-redux";
import * as actions from "actions/index";
import { Redirect } from "react-router-dom";
import T from 'i18n-react';

import { StellarServer } from 'stellar-toolkit';
const { generateTestPair } = StellarServer;

class MainPageView extends Component {
	constructor() {
		super();

		this.state = {
			redirect: null,
			contentBottom: false,
			show: true,
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
			contentBottom: upper + under <= window.innerHeight && window.innerWidth < 640
		});
	}

	createAccount() {
    this.props.showSpinner( true );
    generateTestPair()
      .then( ( newPair ) => {
        this.props.showSpinner( false );
        this.props.updateKeypair( newPair );
        this.props.showGeneratorConfirm( false );
        this.props.showKeyGenerator( true );
      } );
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
				<T.p text="welcome_view.title" />
				<T.p text="welcome_view.title_description" />

				<div className="button-container">
					{/*<BlueButton big onClick={ this.clickMakeNewKey }><T.span text="welcome_view.button_make"/></BlueButton> <br/>*/}
					<BlueButton big onClick={ () => this.createAccount() }><T.span text="welcome_view.create_account"/></BlueButton> <br/>
					<BlueButton big onClick={ this.clickOpenYourWallet }><T.span text="welcome_view.button_open"/></BlueButton>
				</div>

				<div id="step-to-make-account" className={this.state.contentBottom ? 'content-bottom' : ''}>
					<h2><T.span text="welcome_view.guide_title" /></h2>
					<ol>
						<li><T.span text="welcome_view.guide.step1_1" /><BlueButton small nonAction><T.span text="welcome_view.create_account" /></BlueButton><T.span text="welcome_view.guide.step1_2" /></li>
						<li><T.span text="welcome_view.guide.step2" /></li>
						<li><T.span text="welcome_view.guide.step3_1" /><BlueButton small nonAction><T.span text="welcome_view.button_open" /></BlueButton><T.span text="welcome_view.guide.step3_2" /></li>
						<li><T.span text="welcome_view.guide.step4" /></li>
						<li><T.span text="welcome_view.guide.step5_1" /><BlueButton tiny nonAction><T.span text="common.open" /></BlueButton><T.span text="welcome_view.guide.step5_2" /></li>
						<li><T.span text="welcome_view.guide.step6_1" /><BlueButton tiny nonAction><T.span text="common.send" /></BlueButton><T.span text="welcome_view.guide.step6_2" /></li>
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
  },
  showSpinner: ( $isShow ) => {
    dispatch( actions.showSpinner( $isShow ) );
  },
  showKeyGenerator: ( $isShow ) => {
    dispatch( actions.showKeyGenerator( $isShow ) );
  },
  updateKeypair: ( $keypair ) => {
    dispatch( actions.updateKeypair( $keypair ) );
  },
});

MainPageView = connect( null, mapDispatchToProps )( MainPageView );

export default MainPageView;