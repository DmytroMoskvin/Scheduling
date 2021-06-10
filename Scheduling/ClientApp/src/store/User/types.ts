export interface UserState {
	logged: boolean,
	token: string | null,
	user: UserData
}

export interface Permission {
	id: number,
	name: string
}

export interface UserTeam {
	team: Team
}

export interface ComputedProps {
	userPermissions: Array<UserPermission>,
	userTeam: UserTeam
}

export interface Team {
	id: number,
	name: string
}

export interface UserPermission {
	permission: Permission,
}

export type UserData = { 
	id: number,
	email: string,  
	name: string,
	surname: string, 
	position: string, 
	department: string, 
	computedProps: ComputedProps
	//userPermissions: Array<UserPermission>,
	//team: Team
} | null;

