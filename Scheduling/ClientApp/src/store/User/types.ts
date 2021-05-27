export interface UserState {
	logged: boolean,
	token: string | null,
	user: UserData
}

export interface Permission {
	id: number,
	name: string
}
export interface ComputedProps {
	permissions: Array<Permission>
}

export interface Team {
	id: number,
	name: string
}

export interface UserPermission {
	permission: Permission,
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

