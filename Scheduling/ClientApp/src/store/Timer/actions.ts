import { TimerType } from "./types";

export interface SetTimerHistoryAction { type: 'SET_TIMERHISTORY', requests: Array<TimerType> }
export interface CheckUserAction { type: 'CHECK_USER' }
export interface AddTimeAction { type: 'ADD_TIME', time: TimerType }
export interface DeleteTimeAction { type: 'DELETE_TIME', time: number }
export interface SetDateAction { type: 'SET_DATE', time: Date }

const setTimerHistory = (requests: Array<TimerType>) => ({
	type: 'SET_TIMERHISTORY',
	requests: requests
} as SetTimerHistoryAction);


const checkUser =  () => ({ type: 'CHECK_USER'} as CheckUserAction);

const addTime = (time: TimerType) => ({
	type: "ADD_TIME",
	time
} as AddTimeAction);

const deleteTime = (time: number) => ({
	type: "DELETE_TIME",
	time
	
}) as DeleteTimeAction;

const setDate = (time: Date) => ({
	type: "SET_DATE",
	time
}) as SetDateAction;


export const actionCreators = {
	addTime,
	deleteTime,
	setTimerHistory,
	checkUser,
	setDate,
};

export type KnownAction = SetTimerHistoryAction | AddTimeAction | CheckUserAction | DeleteTimeAction | SetDateAction;