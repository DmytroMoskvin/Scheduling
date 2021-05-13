export interface UserState {
	logged: boolean,
	token: string | null,
	user: UserData
}

export interface Permission {
	name: string
}
export interface ComputedProps {
	permissions: Array<Permission>
}

export interface Team {
	name: string
}

export interface UserPermission {
	permissionName: Permission,
}

export type UserData = { 
	email: string, 
	password: string, 
	name: string,
	surname: string, 
	position: string, 
	department: string, 
	//computedProps: ComputedProps
	userPermissions: Array<UserPermission>,
	team: Team
} | null;

