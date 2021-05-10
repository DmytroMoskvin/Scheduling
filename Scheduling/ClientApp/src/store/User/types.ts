export interface UserState {
	logged: boolean,
	token: string | null,
	user: UserData
}

export interface ComputedProps {
	permissions: Array<string>
}

export type UserData = { 
	email: string, 
	password: string, 
	name: string,
	surname: string, 
	position: string, 
	department: string, 
	computedProps: ComputedProps
} | null;

