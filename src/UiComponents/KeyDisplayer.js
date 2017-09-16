import React, { Component } from 'react';
import BlueButton from './BlueButton';
import ArrowDown from 'assets/imgs/blue-arrow-head-down.png';
import T from 'i18n-react';
import './KeyDisplayer.scss';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import Clipboard from 'clipboard';

class KeyDisplayer extends Component {
  constructor() {
    super();

    this.toggleSecretSeed = this.toggleSecretSeed.bind( this );

    const state = {
      secretSeedOpen: false,
    };

    this.state = state;
  }

  componentDidMount () {
    if (this.props.setOpenSecretKey) {
      this.setState({
        secretSeedOpen: true
      });
    }

    const clipboard = new Clipboard('.copy-btn-wrapper');

    clipboard.on('success', ($event) => {
      this.props.showCopyComplete(true);
      setTimeout(() => {this.props.showCopyComplete(false)}, 1500)
    });
  }

  toggleSecretSeed() {
    this.setState( {
      secretSeedOpen: !this.state.secretSeedOpen
    } );
  }

  render() {
    return (
      <div className={
        'seed-container ' +
        (this.state.secretSeedOpen ? 'secret-seed-open' : '')
      }>
        <p className="open-seed-wrapper">
          <button onClick={this.toggleSecretSeed} className="open-seed"><T.span text="wallet_view.open_secret_seed"/>
            <img src={ArrowDown} alt="arrow"/></button>
        </p>
        <p>Account Address</p>
        <div className="keys-box">
          <div className="public-key-box">
            <p>Public address</p>
            <div className="public-key-wrapper">
              <div className="gt-md-label">
                <p>
                  Public address
                </p>
              </div>
              <div>
                <p className="public-key" data-clipboard-text={ this.props.keypair ? this.props.keypair.publicKey() : '' }>
                  { this.props.keypair ? this.props.keypair.publicKey() : '' }
                </p>
              </div>
              <div className="copy-btn-wrapper" data-clipboard-target=".public-key">
                <BlueButton tiny filled><T.span text="common.copy"/></BlueButton>
              </div>
            </div>
          </div>

          <div className="secret-key-box">
            <p>Secret seed</p>
            <div className="secret-key-wrapper">
              <div className="gt-md-label">
                <p>
                  Secret seed
                </p>
              </div>
              <div>
                <p className="secret-key" data-clipboard-text={ this.props.keypair ? this.props.keypair.secret() : '' }>
                  { this.props.keypair ? this.props.keypair.secret() : '' }
                </p>
              </div>
              <div className="copy-btn-wrapper" data-clipboard-target=".secret-key">
                <BlueButton tiny filled><T.span text="common.copy"/></BlueButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  showCopyComplete: ($isShow) => {
    dispatch( actions.showCopyComplete($isShow));
  }
});

const mapStateToProps = ( state ) => ({
  keypair: state.keypair.keypair,
});

KeyDisplayer = connect( mapStateToProps, mapDispatchToProps )( KeyDisplayer );

export default KeyDisplayer;