import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import {
  updatePost,
  uploadPostPicture,
  deletePost
} from "../Utilities/fetches";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import DeleteIcon from "@material-ui/icons/Delete";
import SendIcon from "@material-ui/icons/Send";
const EditPictureModal = ({ id, message, loadingState }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [post, setPost] = useState({
    text: message
  });
  const [file, setFile] = useState(null);
  const handleInput = (e, propertyName) => {
    setPost({
      ...post,

      [propertyName]: e.target.value
    });
  };
  const deletePostItem = async (e) => {
    e.preventDefault();
    await deletePost(id);
    handleClose();
    loadingState(true);
  };
  const Sendpost = async (e) => {
    await updatePost(id, post);

    setPost({
      text: ""
    });
    loadingState(true);
  };
  const fileUpLoadHandler = async (e) => {
    Sendpost();
    e.preventDefault();
    if (!file) {
      handleClose();
    }
    await uploadPostPicture(id, file);
    handleClose();
    loadingState(true);
  };
  console.log(id);

  return (
    <div>
      <p variant="primary" onClick={handleShow}>
        <MoreHorizIcon className="horizontalDots" />
      </p>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>edit post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>write something</Form.Label>
              <Form.Control
                className="border-0"
                as="textarea"
                placeholder="What do you want to talk about ?"
                value={post.text}
                onChange={(e) => handleInput(e, "text")}
              />
            </Form.Group>

            {/* <Button variant='success'>
							Send post
						</Button> */}
          </Form>
          <Form>
            <Form.Group className="mb-3">
              {/* <Form.Label>Choose image </Form.Label> */}
              <Form.Control
                className="border-0"
                type="file"
                placeholder="Upload a image "
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  console.log(e.target.files);
                  console.log(file);
                }}
              />
            </Form.Group>
            <Button
              variant="danger"
              type="submit"
              className="mx-3"
              onClick={deletePostItem}
            >
              <DeleteIcon /> delete post
            </Button>
            <Button variant="success" type="submit" onClick={fileUpLoadHandler}>
              <SendIcon /> send post
            </Button>
          </Form>
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

export default EditPictureModal;
