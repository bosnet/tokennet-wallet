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
          <button onClick={this.toggleSecretSeed} className="open-seed" data-lang={ this.props.language }>
            { this.state.secretSeedOpen ? (
              <T.span text="wallet_view.hide_secret_seed"/>
            ) : (
              <T.span text="wallet_view.open_secret_seed"/>
            ) }
            <img src={ArrowDown} alt="arrow"/>
          </button>
        </p>
        <p>{T.translate('common.account_address')}</p>
        <div className="keys-box">
          <div className="public-key-box">
            <p>{T.translate('common.public_address')}</p>
            <div className="public-key-wrapper">
              <div className="gt-md-label">
                <p>
                  {T.translate('common.public_address')}
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
            <p>{T.translate('common.secret_seed')}</p>
            <div className="secret-key-wrapper">
              <div className="gt-md-label">
                <p>
                  {T.translate('common.secret_seed')}
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

const mapStoreToProps = ( store ) => ({
  keypair: store.keypair.keypair,
  language: store.language.language,
});

KeyDisplayer = connect( mapStoreToProps, mapDispatchToProps )( KeyDisplayer );

export default KeyDisplayer;