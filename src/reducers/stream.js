import * as types from 'actions/ActionTypes';

const initialState = {
	list: [],
	account: null,
	effects: null,
	offers: null,
	payment: null,
	paymentHistory: [],
};

function stream( state = initialState, action ) {
	switch ( action.type ) {
		case types.STREAM_ACCOUNT:
			return {
				...state,
				account: action.account,
			};
		case types.STREAM_EFFECTS:
			return {
				...state,
				effects: action.effects,
			};
		case types.STREAM_OFFERS:
			return {
				...state,
				offers: action.offers,
			};
		case types.STREAM_PAYMENT:
			let paymentHistory = [ action.payment, ...state.paymentHistory ];
			paymentHistory = paymentHistory.sort( ( $x, $y ) => {
				if( $x.transaction.created_at > $y.transaction.created_at ) {
					return -1;
				}
				else {
					return 1;
				}
			} );
			return {
				...state,
				payment: action.payment,
				paymentHistory,
			};
		case types.RESET_HISTORY :
			return {
				...state,
				paymentHistory: [],
			};
		default:
			return state;
	}
}

export default stream;