import * as types from 'actions/ActionTypes';

const initialState = {
	start_time: null,
	end_time: null,
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
				start_time: action.maintenanceData.start_time,
				end_time: action.maintenanceData.end_time,
			};
		default:
			return state;
	}
};

export default maintenance;