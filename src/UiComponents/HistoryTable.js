import React, {Component} from 'react';
import numeral from 'numeral';
import T from 'i18n-react';
import './HistoryTable.scss';
import { connect } from "react-redux";
import moment from "moment";

class HistoryTable extends Component {
  constructor () {
    super();

    this.renderHistory = this.renderHistory.bind(this);

    const state = {
      historyList: [
      ]
    };

    this.state = state;
  }

  renderHistory () {
    const history = [];
    const data = this.state.historyList;
    let length = data.length;

    for (let i = 0; i < length; i++) {
      data[i][1] = numeral( data[i][1] ).format( '0,0.0000' );
      history.push(<tr key={ i }><td><T.span text={data[i][0]}/></td><td>{data[i][1]}</td><td>{data[i][2]}</td></tr>)
    }

    return history;
  }

  render () {
    return (
      <div className="history-table-container">
        <p><T.span text="wallet_view.history"/></p>
        <table>
          <tbody>
            {this.renderHistory()}
          </tbody>
        </table>
      </div>
    )
  }

  componentWillReceiveProps( nextProps ) {
    if( nextProps.payment && nextProps.payment.type === 'payment' ) {
      const payment = nextProps.payment;
      const transaction = payment.transaction;
      let action = 'wallet_view.send';
      if( transaction.source_account !== this.props.keypair.publicKey() ) {
        action = 'wallet_view.receive';
      }
      const amount = payment.amount;
      const date = moment( transaction.created_at ).format( 'YYYY.MM.DD HH:mm' );
      this.setState( {
        historyList: [
          [ action, amount, date ],
          ...this.state.historyList,
        ]
      } );
    }
  }
}

const mapStoreToProps = ( store ) => ( {
  keypair: store.keypair.keypair,
  payment: store.stream.payment,
} );

HistoryTable = connect( mapStoreToProps )( HistoryTable );

export default HistoryTable;