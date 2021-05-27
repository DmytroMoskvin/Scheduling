import { UserData } from "../User/types";
import { ReceivedUsersDataAction } from "./actions";

export enum PermissionName{
	UserManagement,
	Accountant,
	TimeTracking,
	VacationApprovals
};

export interface UserManagementState {
	users: Array<UserData>,
	userEdit: {
		onEditingUser: UserData,
		message:{
			editedSuccessfuly: boolean | undefined,
			text: string
		}
	}
};

export type EditUserResponse = {
	success: boolean,
	message: string,
};
