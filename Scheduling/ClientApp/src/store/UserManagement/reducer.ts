import { Action, Reducer } from "redux";
import { UserData } from "../User/types";
import { KnownAction } from "./actions";
import { UserManagementState } from "./types";

const initialState: UserManagementState = {
    users: [],
    onEditingUser: null
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
                    onEditingUser: state.users[action.payload]
                }
            }

            case 'USER_EDITED_SUCCESS': {
                const index = state.users.findIndex(u => u!.id !== state.onEditingUser!.id); //finding index of the item
                const updatedUsers = [...state.users]; //making a new array
                updatedUsers[index] = state.onEditingUser//changing value in the new array
                return {
                    ...state, //copying the orignal state
                    users: updatedUsers,
                    onEditingUser: null //reassingning todos to new array
                }
                // return {
                //     ...state,
                //     users: [...]
                //     users: state.users.map(user => {
                //         if (user!.id === state.onEditingUser!.id) {
                //             user = state.onEditingUser
                //         }
                //     }),

                // };
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