import { UserData } from "../User/types";


export interface ReceivedUsersDataAction { type: 'RECEIVED_USERS', payload: Array<UserData> };
export interface RequestedUsersDataAction { type: 'REQUESTED_USERS' };
export interface CheckPermissions { type: 'CHECK_PERMISSIONS' };
export interface AccessAllowed { type: 'ACCESS_ALLOWED' };
export interface AccessDenied { type: 'ACCESS_DENIED' };

export interface UserCreatedAction { type: 'USER_CREATED', payload: UserData };
export interface RequestedCreateUserAction { type: 'REQUESTED_CREATE_USER', payload: UserData };

export interface UserDeletedAction { type: 'USER_DELETED', payload: string };
export interface RequestedDeleteUserAction { type: 'REQUESTED_DELETE_USER', payload: string };

export interface UserEditedAction { type: 'USER_EDITED_SUCCESS' };
export interface RequestedEditUserAction { type: 'REQUESTED_EDIT_USER', payload: { id: number, email: string, name: string, surname: string, position: string } };
export interface SetEditUserAction { type: 'SET_EDIT_USER', payload: number };


const receivedUsersData = (users: Array<UserData>) => ({ type: 'RECEIVED_USERS', payload: users } as ReceivedUsersDataAction);
const requestedUsersData = () => ({ type: 'REQUESTED_USERS' } as RequestedUsersDataAction);
const checkPermissions = () => ({ type: 'CHECK_PERMISSIONS' } as CheckPermissions);
const accessAllowed = () => ({ type: 'ACCESS_ALLOWED' } as AccessAllowed);
const accessDenied = () => ({ type: 'ACCESS_DENIED' } as AccessDenied);

const createUser = (user: UserData) => ({ type: 'USER_CREATED', payload: user } as UserCreatedAction);
const requestedCreateUser = (user: UserData) => ({ type: 'REQUESTED_CREATE_USER', payload: user } as RequestedCreateUserAction);

const deleteUser = (email: string) => ({ type: 'USER_DELETED', payload: email } as UserDeletedAction);
const requestedDeleteUser = (email: string) => ({ type: 'REQUESTED_DELETE_USER', payload: email } as RequestedDeleteUserAction);

const editedUserSuccess = () => ({ type: 'USER_EDITED_SUCCESS' } as UserEditedAction);
const requestedEditUser = (id: number, email: string, name: string, surname: string, position: string) => (
    {
        type: 'REQUESTED_EDIT_USER',
        payload: { id, email, name, surname, position }
    } as RequestedEditUserAction);

const setEditUser = (id: number) => ({ type: 'SET_EDIT_USER', payload: id } as SetEditUserAction);

export const actionCreators = {
    receivedUsersData, requestedUsersData,
    checkPermissions,
    accessAllowed,
    accessDenied,
    createUser, requestedCreateUser,
    deleteUser, requestedDeleteUser,
    editedUserSuccess, requestedEditUser, setEditUser
};

export type KnownAction = ReceivedUsersDataAction | CheckPermissions |
    RequestedUsersDataAction | AccessAllowed | AccessDenied |
    UserCreatedAction | RequestedCreateUserAction |
    UserDeletedAction | RequestedDeleteUserAction |
    UserEditedAction | RequestedEditUserAction | SetEditUserAction;