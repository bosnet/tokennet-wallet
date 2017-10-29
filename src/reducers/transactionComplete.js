import * as types from 'actions/ActionTypes';

const initialState = {
	isShow: false,
};

function transactionComplete( state = initialState, action ) {
	switch ( action.type ) {
		case types.SHOW_TRANSACTION_COMPLETE:
			return {
				...state,
				isShow: action.isShow,
				paymentData: action.paymentData,
			};
		default:
			return state;
	}
};

export default transactionComplete;