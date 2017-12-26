import * as types from 'actions/ActionTypes';

const initialState = {
	isShow: false,
	hasPostpone: false,
};

function timer( state = initialState, action ) {
	switch ( action.type ) {
		case types.SHOW_TIMER:
			return {
				...state,
				isShow: action.isShow,
			};
		case types.POSTPONE_TIMER:
			return {
				...state,
				hasPostpone: action.postpone,
			};
		default:
			return state;
	}
};

export default timer;