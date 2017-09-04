import React, {Component} from 'react';
import numeral from 'numeral';
import './RecentHistory.scss';

class RecentHistory extends Component {
  constructor () {
    super();

    const state = {
      recent: ['received', 765000.0072]
    }

    this.state = state;
  }
  render () {
    return (
      <p className="recent-history">You just {this.state.recent[0]} { numeral( this.state.recent[1] ).format( '0,0.0000' ) } BOS</p>
    )
  }
}

export default RecentHistory;