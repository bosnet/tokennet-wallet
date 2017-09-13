import * as types from 'actions/ActionTypes';

const initialState = {
  account: null,
};

function stream(state = initialState, action) {
  switch (action.type) {
    case types.STREAM_ACCOUNT:
      return {
        ...state,
        account: action.account,
      };
    default:
      return state;
  }
}

export default stream;