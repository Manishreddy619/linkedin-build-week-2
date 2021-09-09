import React from 'react';
import InputOption from './InputOption';
import ImageIcon from '@material-ui/icons/Image';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';
import EventNoteIcon from '@material-ui/icons/EventNote';
import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { getPosts } from '../Utilities/fetches';
import { uploadPostPicture } from '../Utilities/fetches';

const PhotoVideoComponent = () => {
	const [file, setFile] = useState(null);
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [posts, setPosts] = useState([]);

	const fetchPosts = async () => {
		const fetchedPosts = await getPosts();
		setPosts(fetchedPosts.reverse());
	};
	useEffect(() => {
		fetchPosts();
	}, []);

	const fileUpLoadHandler = async (e) => {
		e.preventDefault();
		await uploadPostPicture('613a0039fe6c48001525cec8', file);
	};
	console.log(posts);
	return (
		<div className='postInputOptions'>
			<div onClick={() => console.log('clicked')}>
				<div variant='primary' onClick={handleShow}>
					<InputOption title='Photo' Icon={ImageIcon} color='#70b5f9' />
				</div>

				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Upload Image</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form onSubmit={fileUpLoadHandler}>
							<Form.Group className='mb-3'>
								<Form.Label>Choose image </Form.Label>
								<Form.Control
									className='border-0'
									type='file'
									placeholder='Upload a image '
									onChange={(e) => {
										setFile(e.target.files[0]);
										console.log(e.target.files);
										console.log(file);
									}}
								/>
							</Form.Group>

							<Button variant='success' type='submit'>
								Send Image
							</Button>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant='secondary' onClick={handleClose}>
							Close
						</Button>
						<Button variant='primary' onClick={handleClose}>
							Save Changes
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
			<InputOption title='Video' Icon={SubscriptionsIcon} color='#e7a33e' />
			<InputOption title='Event Note' Icon={EventNoteIcon} color='#cocbcd' />
			<InputOption
				title='Write article'
				Icon={CalendarViewDayIcon}
				color='#7fc15e'
			/>
		</div>
	);
};

export default PhotoVideoComponent;
