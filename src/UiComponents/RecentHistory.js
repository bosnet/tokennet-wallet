import React, {Component} from 'react';
import numeral from 'numeral';
import './RecentHistory.scss';
import { connect } from "react-redux";
import T from 'i18n-react';

class RecentHistory extends Component {
  constructor () {
    super();

    const state = {
      recent: ['received', 765000.0072]
    }

    this.state = state;
  }
  render () {
    console.log( this.props.history );
    let amount = 0;
    let DOM = <p data-length={ this.props.history.length } data-lang={ this.props.language } className="recent-history"/>;
    if( this.props.history && this.props.history.length > 0 ) {
      amount = numeral( this.props.history[ 0 ].amount ).format( '0,0.0000' );

      if( this.props.history[ 0 ].action === 'wallet_view.receive' ) {
        DOM = <p data-lang={ this.props.language } className="recent-history">
          <T.span text={{ key: 'wallet_view.you_just_received', amount }}/>
        </p>;
      }
      else if( this.props.history[ 0 ].action === 'wallet_view.send' ) {
        DOM = <p data-lang={ this.props.language } className="recent-history">
          <T.span text={{ key: 'wallet_view.you_just_sended', amount }}/>
        </p>;
      }
    }

    return DOM;
  }

  componentWillUpdate( nextProps ) {
    console.log( nextProps.history );
  }
}

const mapStoreToProps = ( store ) => ( {
  history: store.stream.history,
  language: store.language.language,
} );

RecentHistory = connect( mapStoreToProps )( RecentHistory );

export default RecentHistory;