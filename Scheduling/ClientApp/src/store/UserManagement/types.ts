import { Permission, Team, UserData } from "../User/types";

export enum PermissionName{
	UserManagement,
	Accountant,
	TimeTracking,
	VacationApprovals
};

export interface UserManagementState {
	users: Array<UserData>,
    teams: Array<Team>,
    permissions: Array<Permission>,
	userEdit: {
		onEditingUser: UserData,
		message:{
			editedSuccessfuly: boolean | undefined,
			text: string
		}
	}
};

export type UserDataSend = { 
	id: number,
	email: string,  
	name: string,
	surname: string, 
	position: string, 
	department: string, 
	permissionIds: Array<number>,
	teamId: number 
} | null;

export type EditUserResponse = {
	success: boolean,
	message: string,
};
