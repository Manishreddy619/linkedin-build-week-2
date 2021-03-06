import React from "react";
import {
  updateUserExperience,
  updateUserExperienceTwo,
} from "../Utilities/fetches";
import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import CreateIcon from "@material-ui/icons/Create";
import "./EditMyExperience.css";
import { uploadExperiencePicture } from "../Utilities/fetches";

const EditMyExperience = ({ currentEx, exid, userId, loadingState }) => {
  const [show, setShow] = useState(false);
  const [inputFile, setInputFile] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [updateEx, setUpdateEx] = useState({
    role: currentEx.role,
    company: currentEx.company,
    startDate: currentEx.startDate,
    endDate: currentEx.endDate,
    description: currentEx.description,
    area: currentEx.area,
    image: undefined,
  });
  //console.log(currentEx);
  const handleInput = (e, propertyName) => {
    setUpdateEx({
      ...updateEx,
      [propertyName]:
        propertyName === "image" ? e.target.files[0] : e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    // with async/await
    e.preventDefault();
    if (updateEx.image === undefined) {
      await updateUserExperienceTwo(userId, exid, updateEx);
      handleClose();
    } else {
      await updateUserExperience(userId, exid, updateEx);
      loadingState(true);
      handleClose();
    }
  };
  //console.log(updateEx);
  return (
    <div className="containerEditEx">
      <div
        onClick={handleShow}
        style={{
          border: "none",
          backgroundColor: "none",
          marginLeft: "10rem",
        }}
        className="editIcon"
      >
        <CreateIcon />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Your Experience</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter role"
                value={updateEx.role}
                onChange={(e) => handleInput(e, "role")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Company</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Company name"
                value={updateEx.company}
                onChange={(e) => handleInput(e, "company")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="yyyy-mm-dd"
                value={updateEx.startDate}
                onChange={(e) => handleInput(e, "startDate")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="yyyy-mm-dd"
                value={updateEx.endDate}
                onChange={(e) => handleInput(e, "endDate")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="description"
                value={updateEx.description}
                onChange={(e) => handleInput(e, "description")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Area</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter location"
                value={updateEx.area}
                onChange={(e) => handleInput(e, "area")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>image</Form.Label>
              <Form.Control
                onChange={(e) => handleInput(e, "image")}
                type="file"
                // placeholder="Enter location"
                // value={updateEx.image}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          {/* <Form
            onSubmit={(e) => {
              e.preventDefault();
              uploadExperiencePicture(userId, exid, inputFile);
              handleClose();
              loadingState(true);
            }}
          >
            <Form.Group className="mb-3">
              <Form.Label>Experience Picture</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setInputFile(e.target.files[0])}
              />
            </Form.Group>
            <Button type="submit">Upload</Button>
          </Form> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditMyExperience;
