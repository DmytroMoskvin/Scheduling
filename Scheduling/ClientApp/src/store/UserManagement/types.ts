import { Permission, Team, UserData } from "../User/types";

export enum PermissionName{
	UserManagement,
	Accountant,
	TimeTracking,
	VacationApprovals
}

export interface UserManagementState {
	users: Array<UserData>,
	teams: Array<Team>,
	permissions: Array<Permission>
}
