export interface CalendarEventState {
	logged: boolean,
	token: string | null,
	active:boolean,
	eventHistory: Array<CalendarEventType>
}

export type CalendarEventType = {
	id: number,
	workDate: Date,
	startWorkTime: Date,
	endWorkTime: Date
}