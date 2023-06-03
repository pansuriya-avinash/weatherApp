export interface IAuthState {
	isLogin: boolean;
	userData: IUserData;
}

// export interface ILoginResponse {
// 	data: IUserData;
// 	token: string;
// }

export interface ILoginResponse {
	data: IUserData;
	createdAt: string;
	email: string;
	id: string;
	isActive: boolean;
	updatedAt: string;
	userName: string;
	language?: string;
	token: string;
}

export interface IUserData {
	id: string;
	email: string;
	role: string;
	status: string;
	avatar: string | null;
	name: string;
	token: string;
}

export interface ILogout {
	oldPassword: string;
	newPassword: string;
}
