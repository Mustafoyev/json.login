import { useEffect, useRef } from 'react';
import './modal.css';

export const Modal = ({ setCreatePosts, createPosts, children, title }) => {
	const overlayRef = useRef();

	const handleCloseModal = (evt) => {
		if (evt.target === overlayRef.current) {
			setCreatePosts(false);
		}
	};

	useEffect(() => {
		function handleModal(evt) {
			if (evt.key === 'Escape') {
				setCreatePosts(false);
			}
		}

		if (createPosts) {
			window.addEventListener('keyup', handleModal);
		}

		return () => window.removeEventListener('keyup', handleModal);
	}, [createPosts]);

	return (
		<div ref={overlayRef} onClick={handleCloseModal} className='overlay'>
			<div className='modal-post w-50'>
				<div className='modal-header'>
					<h3 className='modal-title'>{title}</h3>
					<button
						onClick={() => setCreatePosts(false)}
						className='btn btn-danger'>
						&times;
					</button>
				</div>
				<div className='modal-content'>{children}</div>
			</div>
		</div>
	);
};
