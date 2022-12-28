import axios from 'axios';
import { Modal } from '../../../components/Modal/Modal';
import { useEffect, useRef, useState, useContext } from 'react';
import { Input } from '../../Input/Input';
import { UserContext } from '../../../context/UserContext';

export const Posts = () => {
	let timeDate = new Date();
	const [createPosts, setCreatePosts] = useState(false);
	const [posts, setPosts] = useState({});
	const titleRef = useRef();
	const descriptionRef = useRef();
	const { user } = useContext(UserContext);

	useEffect(() => {
		axios
			.get('http://localhost:8080/posts')
			.then((res) => setPosts(res.data))
			.catch((error) => console.log(error));
	}, []);

	const handleAddPost = (evt) => {
		evt.preventDefault();

		axios
			.post('http://localhost:8080/posts', {
				userId: user.id,
				title: titleRef.current.value,
				description: descriptionRef.current.value,
				data: `${timeDate.getDate()}.${
					timeDate.getMonth() + 1
				}.${timeDate.getFullYear()}  ${timeDate.getHours()}:${timeDate.getMinutes()}`,
			})
			.then((res) => console.log(res))
			.catch((error) => console.log(error));
	};

	return (
		<div className='container'>
			<h2 className='h2 my-4 text-center'>Posts</h2>
			<div>
				<button
					onClick={() => setCreatePosts(true)}
					className='btn btn-primary'>
					Create post
				</button>
				{posts.length ? (
					<ul className='list-unstyled'>
						{posts.map((el) => (
							<li key={el.id} className='w-75 p-4 rounded mt-4 border shadow'>
								<h4 className='h4'>Title: {el.title}</h4>
								<p className='text-secondary'>Description: {el.description}</p>
								<span className='text'>Time: {el.data}</span>
							</li>
						))}
					</ul>
				) : (
					''
				)}
			</div>

			{createPosts && (
				<Modal
					setCreatePosts={setCreatePosts}
					createPosts={createPosts}
					title={'Add new post'}>
					<form onSubmit={handleAddPost} className='mt-3'>
						<Input ref={titleRef} type='text' placeholder='Title' />
						<Input ref={descriptionRef} type='text' placeholder='Description' />
						<button type='submit' className='btn btn-primary'>
							Create
						</button>
					</form>
				</Modal>
			)}
		</div>
	);
};
