import * as types from 'actions/ActionTypes';

// 초기 상태를 정의합니다
const initialState = {
  language: 'en',
};

function language(state = initialState, action) {
  switch (action.type) {
    case types.SET_LANGUAGE:
      return {
        ...state,
        language: action.language,
      };
    default:
      return state;
  }
};

export default language;