import React, {Component} from 'react';
import ModalContainer from './ModalContainer';
import BlueButton from '../UiComponents/BlueButton';
import './TransactionConfirm.scss';

class TransactionConfirm extends Component {
  render () {
    return (
      <ModalContainer modalOpen={this.props.modalOpen}>
        <div className="transaction-confirm-container">
          <h1>
            Confirm your Transaction
          </h1>
          <span className="under-line"></span>
          <p>
            Please confirm your Transaction once again.
          </p>
          <div className="transaction-box">
            <table>
              <tbody>
                <tr>
                  <td>
                    Public Address
                  </td>
                  <td>
                    SFJEIFS234923SFDS32FJIES9EIFJO9EFJISJIEO78798EJFIOJSIOJ656528UIUIOE
                  </td>
                </tr>
                <tr>
                  <td>Amount</td>
                  <td>
                    1000 BOS
                  </td>
                </tr>
                <tr>
                  <td>
                    Total Amount
                  </td>
                  <td>
                    1000.01 BOS
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="button-wrapper">
            <BlueButton medium>Send</BlueButton>
            <BlueButton medium>Cancel</BlueButton>
          </p>
        </div>
      </ModalContainer>
    )
  }
}

export default TransactionConfirm;