import React, {Component} from 'react';
import numeral from 'numeral';
import T from 'i18n-react';
import './HistoryTable.scss';

class HistoryTable extends Component {
  constructor () {
    super();

    this.renderHistory = this.renderHistory.bind(this);

    const state = {
      historyList: [
        ['wallet_view.send', 12334.456, '2017.04.16 13:22'],
        ['wallet_view.receive', 2233.456, '2017.04.16 13:22'],
        ['wallet_view.send', 12344223.456, '2017.04.16 13:22']
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
}

export default HistoryTable;