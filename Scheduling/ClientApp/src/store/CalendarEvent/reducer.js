/*import Cookies from "js-cookie";
import { Action, Reducer } from "redux";
import { KnownAction } from "./actions";
import { CalendarEventState } from "./types";

const reducer: Reducer<CalendarEventState> = (state: CalendarEventState | undefined, incomingAction: Action): CalendarEventState => {
    if (state === undefined) {
        const token = Cookies.get('token');
        if (token)
            return { logged: true, token: token, eventHistory: [] };
        else
            return { logged: false, token: null, eventHistory: [] };
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'SET_HISTORY':
            if (action.events.length > 0) {
                console.log('set');
                return { logged: state.logged, token: state.token, eventHistory: action.events };
            }
            return { logged: state.logged, token: state.token, eventHistory: [] };

        case 'CHECK_USER':
            const token = Cookies.get('token');
            if (token)
                return { logged: true, token: token, eventHistory: [] };
            else
                return { logged: false, token: null, eventHistory: [] };
        default:
            return state;
    }
};

export default reducer;*/ 
//# sourceMappingURL=reducer.js.map