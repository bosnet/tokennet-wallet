import React, {Component} from 'react';
import wallet from 'assets/imgs/boscoin-symbol-image-blue.png';
import BlueButton from 'UiComponents/BlueButton';
import './LoginView.scss';
import { Redirect } from "react-router-dom";
import { StellarServer, StellarTools } from 'stellar-toolkit';
import * as actions from "actions/index";
import { connect } from "react-redux";
import {StellarStreamers} from 'stellar-toolkit';
const {OffersStream, EffectsStream, AccountStream, PaymentStream} = StellarStreamers;

const { getAccount } = StellarServer;

class LoginView extends Component {
  constructor() {
    super();

    this.state = {
      redirect: null,
      isValid: null,
    };

    this.openWallet = this.openWallet.bind( this );
    this.validateSeed = this.validateSeed.bind( this );
  }

  openWallet() {
    if( this.state.isValid ) {
      this.setState( { redirect: '/wallet' } );
    }
  }

  renderRedirect() {
    if( this.state.redirect === null ) {
      return '';
    }
    else {
      return <Redirect to={ this.state.redirect } />
    }
  }

  validateSeed( $event ) {
    const value = $event.currentTarget.value;
    const isValid = StellarTools.validSeed( value );
    if( isValid ) {
      const keypair = StellarTools.KeypairInstance( { secretSeed: value } );
      this.props.updateKeypair( keypair );

      getAccount( keypair.publicKey() )
          .then( account => {
            // to redux
            this.props.updateKeypair( keypair );

            // 스트림 시작
            AccountStream( keypair.publicKey(), (streamAccount) => {
              this.props.streamAccount( streamAccount );
            } );
            EffectsStream(keypair.publicKey(), (effect) => {
            } );
            OffersStream(keypair.publicKey(), (offer) => {
            } );
            PaymentStream(keypair.publicKey(), (payment) => {
            } );

            // state 바인딩
            this.setState( { isValid: true } );
          } )
          .catch( error => {
            this.props.updateKeypair( null );
            this.setState( { isValid: false } );
          } );
    }
    else {
      this.setState( { isValid: false } );
    }
  }

  render () {
    const style = {
      border: '1px solid #039cbf',
    };
    if( this.state.isValid === false ) {
      style.border = '1px solid #f40b21';
    }
    return (
      <div className="login-container">
        { this.renderRedirect() }
        <img src={wallet} alt="BOSCoin symbol"/>
        <h1>
          Input your seed
        </h1>
        <span className="under-line-blue"> </span>
        <p>
          Please input your Secret Seed to open your account.<br/>
          Make sure that you don't forget or leak your Seed. You can lose your whole coins.
        </p>

        <input type="text" placeholder="Input your seed" onChange={ this.validateSeed } style={ style }/>
        <p className="button-wrapper">
          <BlueButton medium onClick={ this.openWallet }>Open</BlueButton>
        </p>
      </div>
    )
  }
}

// 리덕스 연결
const mapDispatchToStore = ( dispatch ) => ( {
  updateKeypair: ( $keypair ) => {
    dispatch( actions.updateKeypair( $keypair ) );
  },
  streamAccount: ( $account ) => {
    dispatch( actions.streamAccount( $account ) );
  },
} );

LoginView = connect( null, mapDispatchToStore )( LoginView );

export default LoginView;