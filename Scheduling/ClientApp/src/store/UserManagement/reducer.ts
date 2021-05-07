import { Action, Reducer } from "redux";
import { UserData } from "../User/types";
import { KnownAction } from "./actions";
import { UserManagementState } from "./types";

const initialState: UserManagementState = {
    users: []
};

const reducer: Reducer<UserManagementState> =
    (state: UserManagementState = initialState, incomingAction: Action): UserManagementState => {
        const action = incomingAction as KnownAction;

        switch (action.type) {
            case 'RECEIVED_USERS': {
                return {
                    ...state,
                    users: action.payload
                };
            }

            case 'CREATE_USER': {
                if (action.payload === null || action.payload === undefined || action.payload.email === undefined) {
                    return state;
                }
                return {
                    ...state, 
                    users: state.users.concat(action.payload as UserData)
                };
            }
                
            case 'EDIT_USER': {
                return{
                    ...state,
                    users: state.users.map(user => {
                        if (user!.email !== action.payload!.email) {
                            return user;
                        } else {
                            return action.payload.user;
                        }
                    }),
                };
            }
                
            case 'DELETE_USER': {
                return {
                    ...state,
                    users: state.users.filter(u => u!.email !== action.payload)
                };
            }

            default: {
                return state;
            }
        }
    };

export default reducer;