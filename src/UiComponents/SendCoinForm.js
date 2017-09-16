import React, {Component} from 'react';
import BlueButton from './BlueButton';
import { connect } from "react-redux";
import * as actions from "actions/index";
import './SendCoinForm.scss';
import T from 'i18n-react';

class SendCoinForm extends Component {
  constructor () {
    super();

    this.openTransactionConfirm = this.openTransactionConfirm.bind(this);

    const state = {
      sendingAmount: 0,
      transactionFee: 0,
      addressValidated: true
    };

    this.state = state;
  }

  updateAmount ($event) {
    this.setState({
      sendingAmount: $event.currentTarget.value
    });
  }

  openTransactionConfirm () {
    this.props.showTransactionConfirm(true);
  }

  render () {
    return (
      <div className="send-coin-form-container">
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
            <input className="input-public-address" type="text"/>
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
  showTransactionConfirm: ( $isShow ) => {
    dispatch( actions.showTransactionConfirm( $isShow ) );
  }
});

SendCoinForm = connect( null, mapDispatchToProps )( SendCoinForm );

export default SendCoinForm;