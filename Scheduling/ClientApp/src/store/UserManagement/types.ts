import { UserData } from "../User/types";
import { ReceivedUsersDataAction } from "./actions";

export enum PermissionName{
	UserManagement,
	Accountant,
	TimeTracking,
	VacationApprovals
}

export interface UserManagementState {
	users: Array<UserData>,
	onEditingUser: UserData,
}
