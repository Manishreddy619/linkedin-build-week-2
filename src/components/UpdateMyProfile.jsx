import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import CreateIcon from "@material-ui/icons/Create";
import { updateMyProfile } from "../Utilities/fetches";
import { uploadProfilePicture } from "../Utilities/fetches";
const Example = ({ details, loadingState }) => {
  const [show, setShow] = useState(false);
  const [inputFile, setInputFile] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [profileData, setProfileData] = useState({
    name: details.name,
    surname: details.surname,
    email: details.email,
    bio: details.bio,
    title: details.title,
    area: details.area
  });
  const handleInput = (e, propertyName) => {
    setProfileData({
      ...profileData,
      [propertyName]: e.target.value
    });
  };
  const handleSubmit = async (e) => {
    // with async/await
    e.preventDefault();
    await updateMyProfile(profileData);
    loadingState(true);
  };

  return (
    <>
      <button
        onClick={handleShow}
        style={{ border: "none", backgroundColor: "none" }}
      >
        <CreateIcon />
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={profileData.name}
                onChange={(e) => handleInput(e, "name")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>SurName</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Surname"
                value={profileData.surname}
                onChange={(e) => handleInput(e, "surname")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                value={profileData.title}
                onChange={(e) => handleInput(e, "title")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={profileData.email}
                onChange={(e) => handleInput(e, "email")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter bio"
                value={profileData.bio}
                onChange={(e) => handleInput(e, "bio")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Area</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Area"
                value={profileData.area}
                onChange={(e) => handleInput(e, "area")}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              uploadProfilePicture(details._id, inputFile);
              loadingState(true);
              handleClose();
            }}
          >
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setInputFile(e.target.files[0])}
              />
            </Form.Group>
            <Button type="submit">Upload</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Example;
