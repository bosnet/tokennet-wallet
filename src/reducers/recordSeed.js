import * as types from 'actions/ActionTypes';

const initialState = {
	isShow: false,
};

function recordSeed( state = initialState, action ) {
	switch ( action.type ) {
		case types.SHOW_RECORD_SEED:
			return {
				...state,
				isShow: action.isShow,
			};
		default:
			return state;
	}
}

export default recordSeed;