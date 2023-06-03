import { IAuthState } from 'features/login/interface/login';

export interface IState {
	loading: ILoadingState;
	auth: IAuthState;
}

export interface ILoadingState {
	api: {
		[key: string]: boolean;
	};
}

export interface IAction {
	type: string;
	payload: any;
}
