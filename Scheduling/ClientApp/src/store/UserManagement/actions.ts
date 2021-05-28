import { Permission, Team, UserData } from "../User/types";
import { UserDataSend } from "./types";


export interface ReceivedUsersDataAction { type: 'RECEIVED_USERS', payload: Array<UserData> };
export interface RequestedUsersDataAction { type: 'REQUESTED_USERS' };
export interface CheckPermissions { type: 'CHECK_PERMISSIONS' };
export interface AccessAllowed { type: 'ACCESS_ALLOWED' };
export interface AccessDenied { type: 'ACCESS_DENIED' };

export interface UserCreatedAction { type: 'USER_CREATED', payload: UserData };
export interface RequestedCreateUserAction { type: 'REQUESTED_CREATE_USER', payload: UserData };

export interface UserDeletedAction { type: 'USER_DELETED', payload: string };
export interface RequestedDeleteUserAction { type: 'REQUESTED_DELETE_USER', payload: string };

export interface UserEditedAction { type: 'USER_EDITED_SUCCESS', payload: { messageText: string}};
export interface RequestedEditUserAction { type: 'REQUESTED_EDIT_USER', payload: { user: UserDataSend } };
export interface SetEditUserAction { type: 'SET_EDIT_USER', payload: number };


export interface ReceivedTeamsAction { type: 'RECEIVED_TEAMS', payload: Array<Team> };
export interface RequestedTeamsAction { type: 'REQUESTED_TEAMS' };

export interface ReceivedPermissionsAction { type: 'RECEIVED_PERMISSIONS', payload: Array<Permission> };
export interface RequestedPermissionsAction { type: 'REQUESTED_PERMISSIONS' };


const receivedUsersData = (users: Array<UserData>) => ({ type: 'RECEIVED_USERS', payload: users } as ReceivedUsersDataAction);
const requestedUsersData = () => ({ type: 'REQUESTED_USERS' } as RequestedUsersDataAction);
const checkPermissions = () => ({ type: 'CHECK_PERMISSIONS' } as CheckPermissions);
const accessAllowed = () => ({ type: 'ACCESS_ALLOWED' } as AccessAllowed);
const accessDenied = () => ({ type: 'ACCESS_DENIED' } as AccessDenied);

const createUser = (user: UserData) => ({ type: 'USER_CREATED', payload: user } as UserCreatedAction);
const requestedCreateUser = (user: UserData) => ({ type: 'REQUESTED_CREATE_USER', payload: user } as RequestedCreateUserAction);

const deleteUser = (email: string) => ({ type: 'USER_DELETED', payload: email } as UserDeletedAction);
const requestedDeleteUser = (email: string) => ({ type: 'REQUESTED_DELETE_USER', payload: email } as RequestedDeleteUserAction);

const editedUserSuccess = (messageText: string) => ({ type: 'USER_EDITED_SUCCESS', payload: {messageText} } as UserEditedAction);
const requestedEditUser = (user: UserDataSend) => (
    {
        type: 'REQUESTED_EDIT_USER',
        payload: { user }
    } as RequestedEditUserAction);

const setEditUser = (id: number) => ({ type: 'SET_EDIT_USER', payload: id } as SetEditUserAction);

const receivedTeams = (teams: Array<Team>) => ({ type: 'RECEIVED_TEAMS', payload: teams } as ReceivedTeamsAction);
const requestedTeams = () => ({ type: 'REQUESTED_TEAMS' } as RequestedTeamsAction);

const receivedPermissions = (permissions: Array<Permission>) => ({ type: 'RECEIVED_PERMISSIONS', payload: permissions } as ReceivedPermissionsAction);
const requestedPermissions = () => ({ type: 'REQUESTED_PERMISSIONS' } as RequestedPermissionsAction);

export const actionCreators = {
    receivedUsersData, requestedUsersData,
    checkPermissions,
    accessAllowed,
    accessDenied,
    createUser, requestedCreateUser,
    deleteUser, requestedDeleteUser,
    requestedEditUser,
    receivedTeams, requestedTeams,
    receivedPermissions, requestedPermissions,
    editedUserSuccess, setEditUser
};

export type KnownAction = ReceivedUsersDataAction | CheckPermissions |
    RequestedUsersDataAction | AccessAllowed | AccessDenied |
    UserCreatedAction | RequestedCreateUserAction |
    UserDeletedAction | RequestedDeleteUserAction |
    UserEditedAction | RequestedEditUserAction |
    ReceivedTeamsAction | RequestedTeamsAction |
    ReceivedPermissionsAction | RequestedPermissionsAction |
    SetEditUserAction;