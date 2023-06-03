import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';

import { IState } from 'shared/interface/state';
import Layout from '../src/shared/hoc/layout/layout';

const App: React.FC = () => {
	const isLogin: boolean = useSelector((state: IState) => state.auth.isLogin);

	// if (isLogin) {
	return (
		<Layout>
			<Routes>
				<Route path='/' /* element={<LandingPage />} */ />
				<Route path='/canvas' /* element={<Canvas />} */ />
			</Routes>
		</Layout>
	);
	// } else {
	// 	return (
	// 		<Routes>
	// 			{/* <Route path='/login' element={<Login />} />
	// 			<Route path='/forgot-password' element={<ForgotPassword />} />
	// 			<Route path='/reset-password/:token' element={<ResetPassword />} />
	// 			<Route path='*' element={<Navigate replace to='/login' />} /> */}
	// 		</Routes>
	// 	);
	// }
};

export default App;
