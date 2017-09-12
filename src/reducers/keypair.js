import * as types from 'actions/ActionTypes';

// 초기 상태를 정의합니다
const initialState = {
  keypair: null,
};

function generatorConfirm(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_KEYPAIR:
      return {
        ...state,
        keypair: action.keypair,
      };
    default:
      return state;
  }
};

export default generatorConfirm;