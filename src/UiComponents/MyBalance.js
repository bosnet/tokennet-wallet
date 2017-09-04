import React, {Component} from 'react';
import numeral from 'numeral';
import T from 'i18n-react';
import './MyBalance.scss';

class MyBalance extends Component {
  constructor () {
    super();

    const state = {
      myBalance: 765000.0072
    }

    this.state = state;
  }

  render () {
    return (
      <div className="balance-container">
        <p id="balance-label"><T.span text="wallet_view.balance"/></p>
        <p id="balance">{ numeral( this.state.myBalance ).format( '0,0.0000' )}</p>
        <p id="bos-unit">BOS</p>
      </div>
    )
  }
}

export default MyBalance