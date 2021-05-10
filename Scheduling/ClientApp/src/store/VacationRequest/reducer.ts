import { Action, Reducer } from "redux";
import { KnownAction } from "./actions";
import { VacationRequestState } from "./types";

const vacReducer: Reducer<VacationRequestState> = (state: VacationRequestState | undefined, incomingAction: Action): VacationRequestState => {
	if (state === undefined) {
		return { requestHistory: [] };
	}

	const action = incomingAction as KnownAction;
	switch (action.type) {
			case 'SET_HISTORY':
				console.log('set history' + action.requests);
				if(action.requests.length > 0){
					return { requestHistory: action.requests };
				}
				return { requestHistory: state.requestHistory }
			case 'ADD_REQUEST':
				let requests = state.requestHistory;
				requests.push(action.request);
				return { requestHistory: requests };
			case 'REMOVE_REQUEST':
				let oldRequests = state.requestHistory;
				console.log(oldRequests, action.id);
				let i = oldRequests.find(r => r.id === action.id);
				console.log(i);
				let j;
				if(i !== undefined){
					j = oldRequests.indexOf(i)
					oldRequests.splice(j, 1);
					console.log(oldRequests);
				}
				return { requestHistory: oldRequests };
			default:
				return state;
	}
};

export default vacReducer;