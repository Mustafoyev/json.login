import axios from 'axios';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { UserContext } from '../../context/UserContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export const Login = () => {
	const { setToken } = useContext(AuthContext);
	const { setUser } = useContext(UserContext);
	const navigate = useNavigate();

	const initialValues = {
		email: '',
		password: '',
	};

	const onSubmit = (values) => {
		axios
			.post('http://localhost:8080/login', {
				email: values.email,
				password: values.password,
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

	const validationSchema = Yup.object({
		email: Yup.string().email('Invalid email').required('Required !!!'),
		password: Yup.string()
			.min(6, 'Password must not be less than 6 characters')
			.max(9, 'Password must not exceed 9 characters')
			.required('Required !!!'),
	});

	return (
		<div className='w-50 mx-auto p-5 shadow mt-5'>
			<h1 className='text-center mb-5 h1'>Login</h1>
			<p>
				Do you not have an account? <Link to={'/register'}>Sign up</Link>
			</p>
			<Formik
				initialValues={initialValues}
				onSubmit={onSubmit}
				validationSchema={validationSchema}>
				<Form>
					<div>
						<Field
							className='form-control mb-3'
							type='email'
							placeholder='Enter your email'
							name='email'
						/>
						<ErrorMessage
							name='email'
							component={'div'}
							className='text-danger mt-0 mb-3'
						/>
					</div>
					<div>
						<Field
							className='form-control mb-3'
							type='password'
							placeholder='Enter your password'
							name='password'
						/>
						<ErrorMessage
							name='password'
							component={'div'}
							className='text-danger mt-0 mb-3'
						/>
					</div>
					<button type='submit' className='btn btn-primary'>
						SEND
					</button>
				</Form>
			</Formik>
		</div>
	);
};
