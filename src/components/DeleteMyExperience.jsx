import React from 'react';
import { Alert, Modal, Button } from 'react-bootstrap';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteUserExperience } from '../Utilities/fetches';
import { useState } from 'react';
import './DeleteMyExperience.css';
const DeleteMyExperience = ({ exid, userId }) => {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const Delete = async () => {
		let del = await deleteUserExperience(userId, exid);
	};

	return (
		<div>
			<div>
				<div onClick={handleShow}>
					<DeleteIcon className='DeleteIcon' />
				</div>

				<Modal
					show={show}
					onHide={handleClose}
					backdrop='static'
					keyboard={false}>
					<Modal.Header closeButton>
						<Modal.Title>Delete Experience</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						Are you sure you want to delete your Experience
					</Modal.Body>
					<Modal.Footer>
						<Button variant='secondary' onClick={handleClose}>
							No
						</Button>
						<Button variant='primary' onClick={Delete}>
							Yes
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		</div>
	);
};

export default DeleteMyExperience;
