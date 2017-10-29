import * as types from 'actions/ActionTypes';

const initialState = {
	language: 'en',
};

function language( state = initialState, action ) {
	switch ( action.type ) {
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