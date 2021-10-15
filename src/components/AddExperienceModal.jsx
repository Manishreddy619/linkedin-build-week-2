import React from "react";
import { createUserExperience } from "../Utilities/fetches";
import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import AddIcon from "@material-ui/icons/Add";
import { getUserExperienceList } from "../Utilities/fetches";
import { uploadExperiencePicture } from "../Utilities/fetches";
const ExperienceModal = ({ id, loadingState }) => {
  const [lastExp, setLastExp] = useState({});
  const [inputFile, setInputFile] = useState(null);
  const [show, setShow] = useState(false);
  const [getExid, setExid] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [experience, setExperience] = useState([]);
  const [userEx, setUserEx] = useState({
    role: "",
    company: "",
    startDate: "",
    endDate: "",
    description: "",
    area: "",
    image: "",
    //username:'sacca',
    //image:'placeholder'
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
    //const username=userEx.username
    //console.log('USERNAME',username)
    let exp = await createUserExperience(userEx);
    if (exp) {
      fetchProfileData();
      // setExid(userEx);
      // setLastExp(exp);
    }

    console.log("this is the last exp" + lastExp);
  };
  const fetchProfileData = async () => {
    let ex = await getUserExperienceList();
    setExperience(ex);
    console.log(ex);
  };
  //console.log(getExid);

  return (
    <>
      <button
        onClick={handleShow}
        style={{ border: "none", backgroundColor: "none" }}
      >
        <AddIcon className="AddIcon" />
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Your Experience</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter role"
                value={userEx.role}
                onChange={(e) => setUserEx({ ...userEx, role: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Company</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Company name"
                value={userEx.company}
                onChange={(e) =>
                  setUserEx({ ...userEx, company: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                required
                type="date"
                placeholder="yyyy-mm-dd"
                value={userEx.startDate}
                onChange={(e) =>
                  setUserEx({ ...userEx, startDate: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                required
                type="date"
                placeholder="yyyy-mm-dd"
                value={userEx.endDate}
                onChange={(e) =>
                  setUserEx({ ...userEx, endDate: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="description"
                value={userEx.description}
                onChange={(e) =>
                  setUserEx({ ...userEx, description: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter location"
                value={userEx.area}
                onChange={(e) => setUserEx({ ...userEx, area: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>image</Form.Label>
              <Form.Control
                onChange={(e) =>
                  setUserEx({ ...userEx, image: e.target.files[0] })
                }
                required
                type="file"
                placeholder="select IMG"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          {/* <Form
            onSubmit={(e) => {
              e.preventDefault();
              uploadExperiencePicture(id, lastExp._id, inputFile);
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
          <Button
            variant="secondary"
            onClick={() => {
              handleClose();
              loadingState(true);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ExperienceModal;
