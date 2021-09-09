import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useState } from 'react';
import { updatePost } from '../Utilities/fetches';
const EditPictureModal = ({ id, message }) => {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [post, setPost] = useState({
		text: message,
	});
	const handleInput = (e, propertyName) => {
		setPost({
			...post,

			[propertyName]: e.target.value,
		});
	};

	const Sendpost = async (e) => {
		e.preventDefault();
		await updatePost(id, post);
		setPost({
			text: '',
		});
	};
	return (
		<div>
			<Button variant='primary' onClick={handleShow}>
				editpost
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>edit post</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={Sendpost}>
						<Form.Group className='mb-3'>
							<Form.Label>write something</Form.Label>
							<Form.Control
								className='border-0'
								as='textarea'
								placeholder='What do you want to talk about ?'
								value={post.text}
								onChange={(e) => handleInput(e, 'text')}
							/>
						</Form.Group>

						<Button variant='success' type='submit' onClick={handleClose}>
							Send post
						</Button>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default EditPictureModal;
