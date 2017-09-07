import * as types from 'actions/ActionTypes';

// 초기 상태를 정의합니다
const initialState = {
  isShow: false,
};

function spinner(state = initialState, action) {
  switch (action.type) {
    case types.SHOW_SPINNER:
      return {
        ...state,
        isShow: action.isShow,
      };
    default:
      return state;
  }
};

export default spinner;