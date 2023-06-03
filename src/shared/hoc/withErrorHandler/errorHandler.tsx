import { FC, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AxiosResponse, AxiosError } from 'axios';

import { axiosInstance } from 'shared/services/http.service';
import { createAction } from 'shared/util/utility';
import { IResponseObj } from 'shared/interface';
import Notification, { notify } from 'shared/components/notification/notification';

let resInterceptor: number;

const ErrorHandler: FC = () => {
	const dispatch = useDispatch();

	const logout = useCallback(() => {
		// dispatch(createAction(actionTypes.LOGOUT_SUCCESS));
		dispatch(createAction('RESET_MODAL'));
	}, [dispatch]);

	useEffect(() => {
		resInterceptor = axiosInstance.interceptors.response.use(
			(res: AxiosResponse<IResponseObj<any>>) => {
				if (res.data && res.data.isError) {
					notify(res.data.message, 'error');
					throw new Error(res.data.message);
				} else if (res.data) {
					if (res.data.message) {
						notify(res.data.message, 'success');
					}
				}
				return res;
			},
			(error: AxiosError) => {
				let show = true;
				if (error && error.request && error.request.status === 404) {
					show = false;
				}
				if (error && error.request && error.request.status === 504) {
					throw new Error('504 Timeout');
				}
				// check if error is having data
				if (error.response && error.response.data && error.response.status && show) {
					const status = error.response.status;
					const responseData: any = error.response.data;
					// is http error code is 401, and message contains **SESSION_EXPIRED**, log out of the application
					if (status === 401 && responseData.data && responseData.data.type === 'SESSION_EXPIRED') {
						logout();
					} else if (responseData.errorMessages && Object.keys(responseData.errorMessages).length) {
						// if error response contains any validation message, fetch it from response, and add error notification
						const validationError = responseData.errorMessages[Object.keys(responseData.errorMessages)[0]];
						notify(validationError[0], 'error');
					} else if (error.response && responseData && responseData.message) {
						// if error data contains message field, add error notification
						notify(responseData.message, 'error');
					}
					throw error;
				}
			}
		);
		return () => axiosInstance.interceptors.response.eject(resInterceptor);
	}, [logout]);
	return <Notification />;
};

export default ErrorHandler;
