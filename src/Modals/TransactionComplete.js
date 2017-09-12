import React, {Component} from 'react';
import ModalContainer from './ModalContainer';
import BlueButton from '../UiComponents/BlueButton';
import './TransactionComplete.scss';

class TransactionComplete extends Component {
  render () {
    return (
      <ModalContainer modalOpen={this.props.modalOpen}>
        <div className="transaction-complete-container">
          <h1>
            Transaction Complete!
          </h1>
          <span className="under-line"></span>
          <p className="amount-text">
            Total Amount
          </p>
          <p className="transaction-amount">
            7653.46 BOS
          </p>
          <p className="amount-text bold">
            was sent successfully
          </p>
          <p className="button-wrapper">
            <BlueButton medium>Close</BlueButton>
          </p>
        </div>
      </ModalContainer>
    )
  }
}

export default TransactionComplete;