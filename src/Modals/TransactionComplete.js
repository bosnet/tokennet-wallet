import React, {Component} from 'react';
import ModalContainer from './ModalContainer';
import BlueButton from '../UiComponents/BlueButton';
import './TransactionComplete.scss';
import { connect } from "react-redux";
import * as actions from "actions/index";
import T from 'i18n-react';

class TransactionComplete extends Component {
  constructor () {
    super();

    this.closeTransactionComplete = this.closeTransactionComplete.bind(this);
  }

  closeTransactionComplete () {
    this.props.transactionComplete(false);
  }

  render () {
    return (
      <ModalContainer modalOpen={this.props.modalOpen} doClose={this.closeTransactionComplete}>
        <div className="transaction-complete-container">
          <h1>
            {T.translate('transaction_complete.header')}
          </h1>
          <span className="under-line"></span>
          <p className="amount-text">
            {T.translate('common.total_amount')}
          </p>
          <p className="transaction-amount">
            7653.46 BOS
          </p>
          <p className="amount-text bold">
            {T.translate('transaction_complete.header')}
          </p>
          <p className="button-wrapper">
            <BlueButton medium onClick={this.closeTransactionComplete}>{T.translate('common.close')}</BlueButton>
          </p>
        </div>
      </ModalContainer>
    )
  }
}

const mapDispatchToProps = ( dispatch ) => ({
  transactionComplete: ( $isShow ) => {
    dispatch( actions.showTransactionComplete( $isShow ) );
  }
});

TransactionComplete = connect( null, mapDispatchToProps )( TransactionComplete );


export default TransactionComplete;