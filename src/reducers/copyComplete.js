import * as types from 'actions/ActionTypes';

const initialState = {
	isShow: false,
};

function copyComplete( state = initialState, action ) {
	switch ( action.type ) {
		case types.SHOW_COPY_COMPLETE:
			return {
				...state,
				isShow: action.isShow,
			};
		default:
			return state;
	}
}

export default copyComplete;