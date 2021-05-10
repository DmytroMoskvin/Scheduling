export interface VacationRequestState {
	requestHistory: Array<VacationRequest>
}

export type VacationRequest = {
	id: number,
	userId: number,
	startDate: Date, 
	finishDate: Date,
	status: string,
	comment: string,
}