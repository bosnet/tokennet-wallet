import * as types from 'actions/ActionTypes';
import { find } from 'underscore';

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
			const exist = find( state.paymentHistory, $item => $item.id === action.payment.id );
			let returnState = {
				...state,
			};
			if ( !exist ) {
				let paymentHistory = [ action.payment, ...state.paymentHistory ];
				paymentHistory = paymentHistory.sort( ( $x, $y ) => {
					if ( $x.transaction.created_at > $y.transaction.created_at ) {
						return -1;
					}
					else {
						return 1;
					}
				} );

				returnState = {
					...state,
					payment: action.payment,
					paymentHistory,
				}
			}
			return returnState;
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