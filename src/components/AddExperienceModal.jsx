import React from 'react';
import { createUserExperience } from '../Utilities/fetches';
import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import AddIcon from '@material-ui/icons/Add';

const ExperienceModal = ({ id }) => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [userEx, setUserEx] = useState({
		role: '',
		company: '',
		startDate: '',
		endDate: '', //could be null
		description: '',
		area: '',
	});
	const handleInput = (e, propertyName) => {
		setUserEx({
			...userEx,

			[propertyName]: e.target.value,
		});
	};
	const handleSubmit = async (e) => {
		// with async/await
		e.preventDefault();
		await createUserExperience(id, userEx);
	};
	console.log(userEx);
	return (
		<>
			<button
				onClick={handleShow}
				style={{ border: 'none', backgroundColor: 'none' }}>
				<AddIcon className='AddIcon' />
			</button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add Your Experience</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit}>
						<Form.Group className='mb-3'>
							<Form.Label>Role</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter role'
								value={userEx.role}
								onChange={(e) => handleInput(e, 'role')}
							/>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>Company</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter Company name'
								value={userEx.company}
								onChange={(e) => handleInput(e, 'company')}
							/>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>Start Date</Form.Label>
							<Form.Control
								type='date'
								placeholder='yyyy-mm-dd'
								value={userEx.startDate}
								onChange={(e) => handleInput(e, 'startDate')}
							/>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>End Date</Form.Label>
							<Form.Control
								type='date'
								placeholder='yyyy-mm-dd'
								value={userEx.endDate}
								onChange={(e) => handleInput(e, 'endDate')}
							/>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>Description</Form.Label>
							<Form.Control
								type='text'
								placeholder='description'
								value={userEx.description}
								onChange={(e) => handleInput(e, 'description')}
							/>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>Location</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter location'
								value={userEx.area}
								onChange={(e) => handleInput(e, 'area')}
							/>
						</Form.Group>

						<Button variant='primary' type='submit'>
							Submit
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
		</>
	);
};

export default ExperienceModal;
