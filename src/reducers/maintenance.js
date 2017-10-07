import * as types from 'actions/ActionTypes';

// 초기 상태를 정의합니다
const initialState = {
	onMaintenance: false,
	message: null,
};

function maintenance( state = initialState, action ) {
	switch ( action.type ) {
		case types.SET_MAINTENANCE:
			return {
				...state,
				onMaintenance: action.maintenanceData.onMaintenance,
				message: action.maintenanceData.message,
			};
		default:
			return state;
	}
};

export default maintenance;