import { Action, Reducer } from "redux";
import { UserData } from "../User/types";
import { KnownAction } from "./actions";
import { UserManagementState } from "./types";

const initialState: UserManagementState = {
    users: [],
    userEdit: {
        message: {
            editedSuccessfuly: undefined,
            text: ''
        },
        onEditingUser: null
    }
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

            case 'USER_CREATED': {
                if (action.payload === null || action.payload === undefined || action.payload.email === undefined) {
                    return state;
                }
                console.log("red");
                return {
                    ...state,
                    users: state.users.concat(action.payload as UserData)
                };
            }

            case 'SET_EDIT_USER': {
                return {
                    ...state,
                    userEdit: {
                        ...state.userEdit,
                        onEditingUser: state.users[action.payload],
                    },
                }
            }

            case 'USER_EDITED_SUCCESS': {
                return {
                    ...state,
                    userEdit: {
                        ...state.userEdit,
                       message: {
                           editedSuccessfuly: true,
                           text: "Success! User is edited."
                       }
                    },
                }
            }

            case 'USER_DELETED': {
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