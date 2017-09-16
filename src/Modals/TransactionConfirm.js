import React, {Component} from 'react';
import ModalContainer from './ModalContainer';
import BlueButton from '../UiComponents/BlueButton';
import './TransactionConfirm.scss';
import { connect } from "react-redux";
import * as actions from "actions/index";
import T from 'i18n-react';

class TransactionConfirm extends Component {
  constructor () {
    super();

    this.showSendComplete = this.showSendComplete.bind(this);
    this.hideTransactionConfirm = this.hideTransactionConfirm.bind(this);
  }

  showSendComplete () {
    this.props.transactionComplete( true );
    this.props.transactionConfirm( false );
  }

  hideTransactionConfirm () {
    this.props.transactionConfirm( false );
  }

  render () {
    return (
      <ModalContainer modalOpen={this.props.modalOpen} doClose={this.hideTransactionConfirm}>
        <div className="transaction-confirm-container">
          <h1>
            {T.translate("transaction_confirm.header")}
          </h1>
          <span className="under-line"></span>
          <p>
            {T.translate("transaction_confirm.text")}
          </p>
          <div className="transaction-box">
            <table>
              <tbody>
                <tr>
                  <td>
                    {T.translate("common.public_address")}
                  </td>
                  <td>
                    SFJEIFS234923SFDS32FJIES9EIFJO9EFJISJIEO78798EJFIOJSIOJ656528UIUIOE
                  </td>
                </tr>
                <tr>
                  <td>{T.translate("common.amount")}</td>
                  <td>
                    1000 BOS
                  </td>
                </tr>
                <tr>
                  <td>
                    {T.translate("common.total_amount")}
                  </td>
                  <td>
                    1000.01 BOS
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="button-wrapper">
            <BlueButton medium onClick={this.showSendComplete}>{T.translate("common.send")}</BlueButton>
            <BlueButton medium onClick={this.hideTransactionConfirm}>{T.translate("common.cancel")}</BlueButton>
          </p>
        </div>
      </ModalContainer>
    )
  }
}

const mapDispatchToProps = ( dispatch ) => ({
  transactionConfirm: ( $isShow ) => {
    dispatch( actions.showTransactionConfirm( $isShow ) );
  },
  transactionComplete: ( $isShow ) => {
    dispatch( actions.showTransactionComplete( $isShow ) );
  }
});

TransactionConfirm = connect( null, mapDispatchToProps )( TransactionConfirm );

export default TransactionConfirm;