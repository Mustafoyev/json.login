import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { AuthContext } from '../../context/AuthContext';

export const Header = () => {
	const { user, setUser } = useContext(UserContext);
	const { token, setToken } = useContext(AuthContext);
	const navigate = useNavigate();

	return (
		<header className='bg-light p-2 shadow'>
			<div className='container'>
				<nav className='navbar navbar-expand-lg navbar-light '>
					<div className='container-fluid'>
						<Link className='navbar-brand' to='#'>
							Navbar
						</Link>
						<button
							className='navbar-toggler'
							type='button'
							data-bs-toggle='collapse'
							data-bs-target='#navbarSupportedContent'
							aria-controls='navbarSupportedContent'
							aria-expanded='false'
							aria-label='Toggle navigation'>
							<span className='navbar-toggler-icon' />
						</button>
						<div
							className='collapse navbar-collapse'
							id='navbarSupportedContent'>
							<ul className='navbar-nav me-auto mb-2 mb-lg-0'>
								<li className='nav-item'>
									<NavLink
										className={({ isActive }) =>
											isActive ? 'nav-link active' : 'nav-link'
										}
										aria-current='page'
										to='/'>
										Home
									</NavLink>
								</li>
								<li className='nav-item'>
									<NavLink
										className={({ isActive }) =>
											isActive ? 'nav-link active' : 'nav-link'
										}
										to='/posts'>
										Posts
									</NavLink>
								</li>
							</ul>
							<form className='d-flex'>
								<input
									className='form-control me-2'
									type='search'
									placeholder='Search'
									aria-label='Search'
								/>
								<button className='btn btn-outline-success' type='submit'>
									Search
								</button>
							</form>
							<button
								onClick={() => {
									setUser('');
									setToken('');
									navigate('/');
								}}
								className='btn btn-warning rounded-circle  ms-2'>
								{user.firstname.charAt(0) + user.lastname.charAt(0)}
							</button>
						</div>
					</div>
				</nav>
			</div>
		</header>
	);
};
