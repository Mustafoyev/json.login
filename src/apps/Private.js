import { Route, Routes } from 'react-router-dom';
import { Header } from '../components/Header/Header';
import { Home } from '../components/pages/Home/Home';
import { Posts } from '../components/pages/Posts/Posts';

export const Private = () => {
	return (
		<div>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/posts' element={<Posts />} />
			</Routes>
		</div>
	);
};
