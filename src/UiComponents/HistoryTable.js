import React, {Component} from 'react';
import numeral from 'numeral';
import T from 'i18n-react';
import './HistoryTable.scss';
import { connect } from "react-redux";
import { sortBy } from 'underscore';

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
    const data = this.props.history;
    let length = data.length;

    sortBy( data, 'timestamp' );

    for (let i = 0; i < length; i++) {
      data[i][1] = numeral( data[i][1] ).format( '0,0.0000' );
      history.push(<tr key={ i }><td><T.span text={data[i].action}/></td><td>{data[i].amount}</td><td>{data[i].date}</td></tr>)
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
}

const mapStoreToProps = ( store ) => ( {
  keypair: store.keypair.keypair,
  history: store.stream.history,
} );

HistoryTable = connect( mapStoreToProps )( HistoryTable );

export default HistoryTable;