export interface TimerHistoryState {
	logged: boolean,
	token: string | null,
	timerHistory: Array<TimerType>,
	date: Date,
}

export type TimerType = {
	id: number,
	startTime: string,
	finishTime: Date,
}