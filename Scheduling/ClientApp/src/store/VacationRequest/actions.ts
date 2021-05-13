import { VacationRequest } from "./types";

export interface SetHistoryAction { type: 'SET_HISTORY', requests: Array<VacationRequest> }
export interface AddVacationRequestAction { type: 'ADD_REQUEST', request: VacationRequest}
export interface RemoveVacationRequestAction { type: 'REMOVE_REQUEST', id: Number}

const setHistory =  (requests: Array<VacationRequest>) => ({ type: 'SET_HISTORY', requests: requests } as SetHistoryAction);
const addVacationRequest =  (newRequest: VacationRequest) => ({ type: 'ADD_REQUEST', request: newRequest } as AddVacationRequestAction);
const removeVacationRequest =  (id: Number) => ({ type: 'REMOVE_REQUEST', id: id } as RemoveVacationRequestAction);

export const actionCreators = {
	setHistory, 
	addVacationRequest,
	removeVacationRequest
};

export type KnownAction = SetHistoryAction | AddVacationRequestAction | RemoveVacationRequestAction;