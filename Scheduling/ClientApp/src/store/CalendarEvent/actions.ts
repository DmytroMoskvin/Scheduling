import { CalendarEventType } from "./types";

export interface SetHistoryAction { type: 'SET_HISTORY', events: Array<CalendarEventType> }
export interface CheckUserAction { type: 'CHECK_USER' }

const setHistory = (events: Array<CalendarEventType>) => ({ type: 'SET_HISTORY', events: events} as SetHistoryAction);
const checkUser = () => ({ type: 'CHECK_USER' } as CheckUserAction);

export const actionCreators = {
	setHistory,
	checkUser
};

export type KnownAction = SetHistoryAction | CheckUserAction;