export interface CalendarEventState {
	logged: boolean,
	token: string | null,
	active:boolean,
	eventHistory: Array<CalendarEvent>
}

export type CalendarEvent = {
	id: number,
	workDate: Date,
	startWorkTime: Date,
	endWorkTime: Date
}