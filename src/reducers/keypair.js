import * as types from 'actions/ActionTypes';

const initialState = {
	keypair: null,
};

function generatorConfirm( state = initialState, action ) {
	switch ( action.type ) {
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