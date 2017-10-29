import * as types from 'actions/ActionTypes';

const initialState = {
	isShow: false,
};

function keyGenerator( state = initialState, action ) {
	switch ( action.type ) {
		case types.SHOW_KEY_GENERATOR:
			return {
				...state,
				isShow: action.isShow,
			};
		default:
			return state;
	}
};

export default keyGenerator;