import React, {Component} from 'react';
import BlueButton from './BlueButton';
import { connect } from "react-redux";
import * as actions from "actions/index";
import './SendCoinForm.scss';
import T from 'i18n-react';
import { Redirect } from "react-router-dom";
import { StellarTools } from 'stellar-toolkit';

class SendCoinForm extends Component {
  constructor () {
    super();

    this.checkPublicKey = this.checkPublicKey.bind(this);
    this.openTransactionConfirm = this.openTransactionConfirm.bind(this);

    const state = {
      sendingAmount: 0,
      transactionFee: 0,
      addressValidated: false,
      publicKey: null,
    };

    this.state = state;
  }

  checkPublicKey( $event ) {
    const key = $event.currentTarget.value;

    // 본인의 public key 일 경우 무조건 false
    if( this.props.keypair.publicKey() === key ) {
      this.setState( { addressValidated: false } );
      return false;
    }

    StellarTools.resolveAddress( key )
      .then( ( resolved ) => {
        this.setState( { publicKey: key, addressValidated: true } );
      } )
      .catch( () => {
        this.setState( { publicKey: null, addressValidated: false } );
      } );
  }

  updateAmount ($event) {
    this.setState({
      sendingAmount: $event.currentTarget.value
    });
  }

  openTransactionConfirm () {
    const paymentData = {};
    paymentData.memo = { type: 'none' };
    paymentData.asset = { code: 'XLM', uuid: 'native', shortName: 'XLM', asset_type: 'native' };
    paymentData.destination = this.state.publicKey;
    paymentData.amount = this.state.sendingAmount.toString();

    this.props.showTransactionConfirm(true, paymentData);
  }

  renderRedirect() {
    if (this.props.keypair === null) {
      return <Redirect to={'/'}/>;
    }
    else {
      return '';
    }
  }

  render () {
    return (
      <div className="send-coin-form-container">
        {this.renderRedirect()}
        <p>{T.translate('common.send')}</p>

        <div className="input-group">
          <div className="input-group-label-wrapper">
            <p className="input-label only-mobile">
              {T.translate('send_coin.input_recipient_address')}
            </p>
            <p className="transaction-fee">
              {T.translate('send_coin.transaction_fee')}: <span>{this.state.transactionFee} BOS</span>
            </p>

            <p className="input-label gt-md">
              {T.translate('send_coin.input_recipient_address')}
            </p>
            <input className="input-public-address" type="text" onKeyUp={ this.checkPublicKey }/>
            <span className={
              'public-address-validation ' +
              (this.state.addressValidated ? 'validated' : '')
            }> </span>
          </div>
        </div>

        <div className="input-group">
          <div className="input-group-label-wrapper">
            <p className="input-label only-mobile">
              {T.translate('send_coin.input_amount')}
            </p> <br/>
            <p className="input-label gt-md">
              {T.translate('send_coin.input_amount')}
            </p>
            <input onChange={$event => {this.updateAmount($event)}} className="input-sending-amount" type="tel" defaultValue={this.state.sendingAmount} />
            <p className="sending-amount">{T.translate('send_coin.total')} {this.state.sendingAmount < 0 ? 0 : this.state.sendingAmount - this.state.transactionFee} BOS {T.translate('send_coin.will_be_sent')}</p>
          </div>
        </div>

        <div className="button-wrapper">
          <BlueButton onClick={this.openTransactionConfirm} medium>{T.translate('common.send')}</BlueButton>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = ( dispatch ) => ({
  showTransactionConfirm: ( $isShow, $paymentData ) => {
    dispatch( actions.showTransactionConfirm( $isShow, $paymentData ) );
  }
});

const mapStateToProps = ( state ) => ({
  keypair: state.keypair.keypair,
});

SendCoinForm = connect( mapStateToProps, mapDispatchToProps )( SendCoinForm );

export default SendCoinForm;