import axios from 'axios';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { UserContext } from '../../context/UserContext';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

export const Register = () => {
	const { setToken } = useContext(AuthContext);
	const { setUser } = useContext(UserContext);
	const initialValues = {
		firstname: '',
		lastname: '',
		email: '',
		password: '',
	};

	const onSubmit = (values) => {
		axios
			.post('http://localhost:8080/register', {
				firstname: values.firstname,
				lastname: values.lastname,
				email: values.email,
				password: values.password,
			})
			.then((res) => {
				if (res.status === 201) {
					setToken(res.data.accessToken);
					setUser(res.data.user);
					navigate('/');
				}
			})
			.catch((error) => console.log(error));
	};

	const validationSchema = Yup.object({
		firstname: Yup.string().required('Required !!!'),
		lastname: Yup.string().required('Required !!!'),
		email: Yup.string().email('Invalid email').required('Required !!!'),
		password: Yup.string()
			.min(6, 'Password must not be less than 6 characters')
			.max(9, 'Password must not exceed 9 characters')
			.required('Required !!!'),
	});
	const navigate = useNavigate();

	return (
		<div className='w-50 mx-auto p-5 shadow mt-5'>
			<h1 className='text-center mb-5 h1'>Registration</h1>
			<p>
				Do you have an account? <Link to={'/login'}>Sign in</Link>
			</p>
			<Formik
				initialValues={initialValues}
				onSubmit={onSubmit}
				validationSchema={validationSchema}>
				<Form>
					<div>
						<Field
							className='form-control mb-3'
							type='text'
							placeholder='Enter your first name'
							name='firstname'
						/>
						<ErrorMessage
							name='firstname'
							component={'div'}
							className='text-danger mt-0 mb-3'
						/>
					</div>
					<div>
						<Field
							className='form-control mb-3'
							type='text'
							placeholder='Enter your last name'
							name='lastname'
						/>
						<ErrorMessage
							name='lastname'
							component={'div'}
							className='text-danger mt-0 mb-3'
						/>
					</div>
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
