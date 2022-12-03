import { Routes, Route } from 'react-router-dom';
import { Login } from '../components/Login/Login';
import { Register } from '../components/Register/Register';
import { Navigate } from 'react-router-dom';

export const Public = () => {
	return (
		<>
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='*' element={<Navigate to='/login' replace={true} />} />
			</Routes>
		</>
	);
};
