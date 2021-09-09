import CreateIcon from '@material-ui/icons/Create';
import React, { useEffect, useState } from 'react';
import './Feed.css';
import InputOption from './InputOption';
import ImageIcon from '@material-ui/icons/Image';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';
import EventNoteIcon from '@material-ui/icons/EventNote';
import './CreatePostCard.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { Avatar } from '@material-ui/core';
import { createPost } from '../Utilities/fetches';
import { getMyProfile } from '../Utilities/fetches';
import PhotoVideoComponent from './PhotoVideoComponent';

const CreatePostCard = () => {
	const [post, setPost] = useState({
		text: '',
	});
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [profile, setProfile] = useState(null);

	useEffect(() => {
		const getProfile = async () => {
			let myProfile = await getMyProfile();
			setProfile(myProfile);
		};
		getProfile();
	}, []);
	const handleInput = (e, propertyName) => {
		setPost({
			...post,

			[propertyName]: e.target.value,
		});
	};

	const Sendpost = async (e) => {
		e.preventDefault();
		await createPost(post);
		setPost({
			text: '',
		});
	};

	return (
		<>
			<div className='post'>
				<div className='postInputContainer'>
					<div className='postInput'>
						<Avatar
							src={
								profile
									? profile.image
									: 'https://i.pinimg.com/474x/51/d3/89/51d3899b7eedf293e1684d1e70b66c20.jpg'
							}
							className='avatar'
						/>
						{/* <CreateIcon /> */}
						<p variant='primary' onClick={handleShow}>
							Send post
						</p>

						<Modal show={show} onHide={handleClose}>
							<Modal.Header closeButton>
								<Modal.Title>
									<Avatar src={profile && profile.image} />
								</Modal.Title>
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

						{/* <form onClick={Sendpost}>
							<input
								type='text'
								placeholder='Start a post'
								value={post.text}
								onChange={(e) => handleInput(e, 'text')}
							/>
							<button type='submit'>Send</button>
						</form> */}
					</div>
					<PhotoVideoComponent />
				</div>
			</div>
		</>
	);
};

export default CreatePostCard;
