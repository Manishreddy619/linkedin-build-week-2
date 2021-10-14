import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import CreateIcon from '@material-ui/icons/Create';
import { updateMyProfile, getMyProfile } from '../Utilities/fetches';
import {
	uploadProfilePicture,
	updateMyProfileBody,
} from '../Utilities/fetches';
const Example = ({ details, loadingState }) => {
	const [show, setShow] = useState(false);
	// const [inputFile, setInputFile] = useState(null);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [profileData, setProfileData] = useState({
		name: details.name,
		surname: details.surname,
		email: details.email,
		bio: details.bio,
		title: details.title,
		area: details.area,
		username: details.username,
		image: undefined,
	});

	const handleInput = (e, propertyName) => {
		setProfileData({
			...profileData,
			[propertyName]:
				propertyName === 'image' ? e.target.files[0] : e.target.value,
			// image: inputFile.name,
		});
	};
	useEffect(() => {
		getMyProfile();
	}, [profileData]);
	const handleSubmit = async (e) => {
		// with async/await
		e.preventDefault();
		if (profileData.image === undefined) {
			// console.log(profileData.image);
			await updateMyProfileBody(profileData);
			handleClose();
		} else {
			await updateMyProfile(profileData);
			handleClose();
		}

		console.log('-----------------------', profileData.image);
		loadingState(true);
		handleClose();
	};

	return (
		<>
			<button
				onClick={handleShow}
				style={{ border: 'none', backgroundColor: 'none' }}>
				<CreateIcon />
			</button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Edit Profile</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit}>
						<Form.Group className='mb-3'>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter name'
								value={profileData.name}
								onChange={(e) => handleInput(e, 'name')}
							/>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>username</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter name'
								value={profileData.username}
								onChange={(e) => handleInput(e, 'username')}
							/>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>SurName</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter Surname'
								value={profileData.surname}
								onChange={(e) => handleInput(e, 'surname')}
							/>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>Title</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter Title'
								value={profileData.title}
								onChange={(e) => handleInput(e, 'title')}
							/>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type='email'
								placeholder='Enter email'
								value={profileData.email}
								onChange={(e) => handleInput(e, 'email')}
							/>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>Bio</Form.Label>
							<Form.Control
								as='textarea'
								placeholder='Enter bio'
								value={profileData.bio}
								onChange={(e) => handleInput(e, 'bio')}
							/>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>Area</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter Area'
								value={profileData.area}
								onChange={(e) => handleInput(e, 'area')}
							/>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>Location</Form.Label>
							<Form.Control
								type='file'
								onChange={(e) => handleInput(e, 'image')}
							/>
						</Form.Group>
						<Button variant='primary' type='submit'>
							Submit
						</Button>
					</Form>
					{/* <Form
						onSubmit={(e) => {
							e.preventDefault();
							uploadProfilePicture(details._id, inputFile);
							loadingState(true);
							handleClose();
						}}>
						<Form.Group className='mb-3'>
							<Form.Label>Location</Form.Label>
							<Form.Control
								type='file'
								onChange={(e) => setInputFile(e.target.files[0])}
							/>
						</Form.Group>
						<Button type='submit'>Upload</Button>
					</Form> */}
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};
export default Example;
