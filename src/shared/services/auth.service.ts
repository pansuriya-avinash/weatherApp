import CryptoJS from 'crypto-js';
import { ILoginResponse } from 'features/login/interface/login';

const KEY: string = process.env.REACT_APP_ENCRYPTION_KEY as string;

/**
 * function to check if user is logged in or not
 */
const isLogin = (): boolean => {
	if (localStorage.authData) {
		return true;
	} else {
		return false;
	}
};

/**
 * function to get authentication data
 */
const getAuthData = () => {
	try {
		const data = localStorage.authData;
		if (data) {
			const bytes = CryptoJS.AES.decrypt(data.toString(), KEY);
			const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) as ILoginResponse;
			return decryptedData;
		} else {
			return false;
		}
	} catch (e) {
		return false;
	}
};

/**
 * function to set user authentication data
 */
const setAuthData = (data: ILoginResponse): void => {
	const cipherText = CryptoJS.AES.encrypt(JSON.stringify(data), KEY);
	localStorage.setItem('authData', cipherText.toString());
};

/**
 * function to remove user authentication data
 */
const removeAuthData = (): void => {
	localStorage.removeItem('authData');
};

/**
 * function to get user access token
 */
const getAccessToken = (): string => {
	const data = getAuthData();
	if (data && data.token) {
		return data.token;
	} else {
		return '';
	}
};

/**
 * function to get user language
 */
export const getUserLanguage = (): string => {
	const data = localStorage.userData;
	// return german as default, if user is not logged in
	if (!data) {
		return 'en';
	}
	const bytes = CryptoJS.AES.decrypt(data.toString(), KEY);
	const decryptedData: ILoginResponse = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
	// return german as default, if user data not found
	if (!decryptedData) {
		return 'en';
	}
	return (decryptedData || {}).language || 'en';
};

const AuthService = {
	isLogin: isLogin,
	getAccessToken: getAccessToken,
	setAuthData: setAuthData,
	getAuthData: getAuthData,
	removeAuthData: removeAuthData,
	getUserLanguage: getUserLanguage
};

export default AuthService;
