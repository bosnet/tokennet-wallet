import React, {Component} from 'react';
import BlueButton from './BlueButton';
import { connect } from "react-redux";
import * as actions from "actions/index";
import './SendCoinForm.scss';

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
    console.log('this');
    this.props.showTransactionConfirm(true);
  }

  render () {
    return (
      <div className="send-coin-form-container">
        <p>Send</p>

        <div className="input-group">
          <div className="input-group-label-wrapper">
            <p className="input-label">
              Input the public address of recipient
            </p>
            <p className="transaction-fee">
              Transaction fee: <span>{this.state.transactionFee} BOS</span>
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
            <p className="input-label">
              Input the amount you want to send
            </p> <br/>
            <input onChange={$event => {this.updateAmount($event)}} className="input-sending-amount" type="tel" defaultValue={this.state.sendingAmount} />
            <p className="sending-amount">Total {this.state.sendingAmount < 0 ? 0 : this.state.sendingAmount - this.state.transactionFee} BOS will be sent to Recipient</p>
          </div>
        </div>

        <div className="button-wrapper">
          <BlueButton onClick={this.openTransactionConfirm} medium>Send</BlueButton>
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