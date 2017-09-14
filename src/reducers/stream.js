import * as types from 'actions/ActionTypes';
import { find } from 'underscore';

const initialState = {
  account: null,
  effects: null,
  offers: null,
  payment: null,
  history: [],
};

function stream( state = initialState, action ) {
  switch( action.type ) {
    case types.STREAM_ACCOUNT:
      return {
        ...state,
        account: action.account,
      };
    case types.STREAM_EFFECTS:
      return {
        ...state,
        effects: action.effects,
      };
    case types.STREAM_OFFERS:
      return {
        ...state,
        offers: action.offers,
      };
    case types.STREAM_PAYMENT:
      return {
        ...state,
        payment: action.payment,
      };
    case types.UNSHIFT_HISTORY :
      const exist = find( state.history, $item => $item.id === action.historyItem.id );
      if( !exist ) {
        let history = [
          action.historyItem,
          ...state.history
        ];
        return {
          ...state,
          history
        };
      }
      else {
        return state;
      }
    case types.RESET_HISTORY :
      return {
        ...state,
        history: []
      };
    default:
      return state;
  }
}

export default stream;