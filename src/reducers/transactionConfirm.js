import * as types from 'actions/ActionTypes';

const initialState = {
	isShow: false,
	paymentData: null,
};

function transactionConfirm( state = initialState, action ) {
	switch ( action.type ) {
		case types.SHOW_TRANSACTION_CONFIRM:
			return {
				...state,
				isShow: action.isShow,
				paymentData: action.paymentData,
			};
		default:
			return state;
	}
};

export default transactionConfirm;