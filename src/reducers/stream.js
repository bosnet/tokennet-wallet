import * as types from 'actions/ActionTypes';

const initialState = {
  account: null,
  effects: null,
  offers: null,
  payment: null,
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
    default:
      return state;
  }
}

export default stream;