import axios from 'axios';
import { useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { UserContext } from '../../context/UserContext';
import { Input } from '../Input/Input';

export const Login = () => {
	const { token, setToken } = useContext(AuthContext);
	const { user, setUser } = useContext(UserContext);
	const emailRef = useRef();
	const passwordRef = useRef();
	const navigate = useNavigate();

	const hendleFormSubmit = (evt) => {
		evt.preventDefault();

		axios
			.post('http://localhost:8080/login', {
				email: emailRef.current.value,
				password: passwordRef.current.value,
			})
			.then((res) => {
				if (res.status === 200) {
					setToken(res.data.accessToken);
					setUser(res.data.user);
					navigate('/');
				}
			})
			.catch((error) => console.log(error));
	};

	return (
		<div className='w-50 mx-auto p-5 shadow mt-5'>
			<h1 className='text-center mb-5 h1'>Login</h1>
			<p>
				Do you not have an account? <Link to={'/register'}>Sign up</Link>
			</p>
			<form onSubmit={hendleFormSubmit}>
				<Input ref={emailRef} type='email' placeholder='Enter your email' />
				<Input
					ref={passwordRef}
					type='password'
					placeholder='Enter your password'
				/>
				<button type='submit' className='btn btn-primary'>
					SEND
				</button>
			</form>
		</div>
	);
};
