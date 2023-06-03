export interface IResponseObj<T> {
	data: T;
	isError: boolean;
	message: string;
}

export interface IIcon {
	height?: string;
	width?: string;
	className?: string;
	color?: string;
	onClick?: () => void;
}
