import React from 'react';
import { updateUserExperience } from '../Utilities/fetches';
import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import CreateIcon from '@material-ui/icons/Create';
import './EditMyExperience.css';
const EditMyExperience = ({ currentEx, exid, userId }) => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [updateEx, setUpdateEx] = useState({
		role: currentEx.role,
		company: currentEx.company,
		startDate: new Date().toDateString(currentEx.startDate),
		endDate: new Date().toDateString(currentEx.endDate), //could be null
		description: currentEx.description,
		area: currentEx.area,
	});
	console.log(currentEx);
	const handleInput = (e, propertyName) => {
		setUpdateEx({
			...updateEx,
			[propertyName]: e.target.value,
		});
	};
	const handleSubmit = async (e) => {
		// with async/await
		e.preventDefault();
		await updateUserExperience(userId, exid, updateEx);
	};
	console.log(updateEx);
	return (
		<div className='containerEditEx'>
			<div
				onClick={handleShow}
				style={{
					border: 'none',
					backgroundColor: 'none',
					marginLeft: '10rem',
				}}
				className='editIcon'>
				<CreateIcon />
			</div>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Edit Your Experience</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit}>
						<Form.Group className='mb-3'>
							<Form.Label>Role</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter role'
								value={updateEx.role}
								onChange={(e) => handleInput(e, 'role')}
							/>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>Company</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter Company name'
								value={updateEx.company}
								onChange={(e) => handleInput(e, 'company')}
							/>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>Start Date</Form.Label>
							<Form.Control
								type='date'
								placeholder='yyyy-mm-dd'
								value={updateEx.startDate}
								onChange={(e) => handleInput(e, 'startDate')}
							/>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>End Date</Form.Label>
							<Form.Control
								type='date'
								placeholder='yyyy-mm-dd'
								value={updateEx.endDate}
								onChange={(e) => handleInput(e, 'endDate')}
							/>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>End Date</Form.Label>
							<Form.Control
								type='text'
								placeholder='description'
								value={updateEx.description}
								onChange={(e) => handleInput(e, 'description')}
							/>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>Location</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter location'
								value={updateEx.area}
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
		</div>
	);
};

export default EditMyExperience;
