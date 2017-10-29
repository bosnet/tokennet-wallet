import * as types from 'actions/ActionTypes';

const initialState = {
	isShow: false,
};

function generatorConfirm( state = initialState, action ) {
	switch ( action.type ) {
		case types.SHOW_GENERATOR_CONFIRM:
			return {
				...state,
				isShow: action.isShow,
			};
		default:
			return state;
	}
};

export default generatorConfirm;