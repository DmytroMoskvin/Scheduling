import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { History } from 'history';
import UserReducer from "./User/";
import RequestReducer from "./VacationRequest/";
import TimerReducer from "./Timer/";
import { UserState } from './User/types';
import { VacationRequestState } from './VacationRequest/types';
import { TimerHistoryState } from './Timer/types';

export interface ApplicationState {
    loggedUser: UserState;
    vacationRequest: VacationRequestState;
    timerHistory: TimerHistoryState;
};


export default function configureStore(history: History, initialState?: ApplicationState) {
    const middleware = [
        thunk,
        routerMiddleware(history)
    ];

    const rootReducer = combineReducers({
        loggedUser: UserReducer,
        vacationRequest: RequestReducer,
        timerHistory: TimerReducer,
        router: connectRouter(history)
    });

    const enhancers = [];
    const windowIfDefined = typeof window === 'undefined' ? null : window as any;
    if (windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__) {
        enhancers.push(windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__());
    }

    return createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middleware), ...enhancers)
    );
}
