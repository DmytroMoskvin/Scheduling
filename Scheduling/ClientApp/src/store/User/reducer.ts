import Cookies from "js-cookie";
import { Action, Reducer } from "redux";
import { KnownAction } from "./actions";
import { UserState } from "./types";

const initialState = {
	logged: !!Cookies.get('token'), 
	token: Cookies.get('token') || null, 
	user: null
}

const reducer: Reducer<UserState> = (state: UserState = initialState , incomingAction: Action): UserState => {

	const action = incomingAction as KnownAction;
	switch (action.type) {
			case 'LOGIN_USER':
					if (action.token !== null) {
							Cookies.set('token', action.token);
							return { logged: true, token: action.token, user: null };
					}
					return { logged: false, token: null, user: null  };
					
			case 'GET_USER':
					return { ...state, user: action.userData };
			case 'LOGOUT_USER':
					Cookies.remove('token');
					return { logged: false, token: null, user: null };
			default:
					return state;
	}
};

export default reducer;