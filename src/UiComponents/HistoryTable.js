import React, {Component} from 'react';
import numeral from 'numeral';
import T from 'i18n-react';
import './HistoryTable.scss';
import { connect } from "react-redux";
import { sortBy } from 'underscore';

class HistoryTable extends Component {
  RENDER_ITEM_PER = 5;

  constructor () {
    super();

    this.renderHistory = this.renderHistory.bind(this);
    this.readMore = this.readMore.bind(this);

    const state = {
      historyPage: 0,
    };

    this.state = state;
  }

  readMore () {
    this.setState({
      historyPage: this.state.historyPage + 1
    });
  }

  renderHistory () {
    const history = [];
    const data = this.props.history;
    let length = data.length;

    sortBy( data, 'timestamp' );

    if ((this.state.historyPage + 1) * this.RENDER_ITEM_PER < length) {
      length = (this.state.historyPage + 1) * this.RENDER_ITEM_PER;
    }

    for (let i = 0; i < length; i++) {
      data[i].amount = numeral( data[i].amount ).format( '0,0.0000' );
      const DOM = <tr key={ i }>
        <td data-lang={ this.props.language }><T.span text={data[i].action}/></td>
        <td>{data[i].amount}</td><td>{data[i].date}</td>
      </tr>;
      history.push( DOM );
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
        <p className={"more-wrapper " +
          ((this.state.historyPage + 1) * this.RENDER_ITEM_PER < this.props.history.length ? 'is-more' : '')
        }>
          <span onClick={this.readMore}>more </span>
        </p>
      </div>
    )
  }
}

const mapStoreToProps = ( store ) => ( {
  keypair: store.keypair.keypair,
  history: store.stream.history,
  language: store.language.language,
} );

HistoryTable = connect( mapStoreToProps )( HistoryTable );

export default HistoryTable;