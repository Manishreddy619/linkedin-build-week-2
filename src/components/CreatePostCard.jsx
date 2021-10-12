import CreateIcon from "@material-ui/icons/Create";
import React, { useEffect, useState } from "react";
import "./Feed.css";
// import InputOption from './InputOption';
// import ImageIcon from '@material-ui/icons/Image';
// import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
// import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';
// import EventNoteIcon from '@material-ui/icons/EventNote';
import "./CreatePostCard.css";
import { Modal, Button, Form } from "react-bootstrap";
import { Avatar } from "@material-ui/core";
import { createPost } from "../Utilities/fetches";
import { getMyProfile } from "../Utilities/fetches";
import PhotoVideoComponent from "./PhotoVideoComponent";
import { uploadPostPicture } from "../Utilities/fetches";
import { getPosts } from "../Utilities/fetches";

const CreatePostCard = ({ loadingState }) => {
  const [post, setPost] = useState({
    text: "",
    username:'Bimal',
    image:'anImage'
  });
  const [latestPost, setLatestPost] = useState(null);
  const [show, setShow] = useState(false);
  const [file, setFile] = useState(null);
  const [posts, setPosts] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [profile, setProfile] = useState(null);


  const getProfile = async () => {
    let myProfile = await getMyProfile();
    //console.log('LOOK HERE',myProfile)
    setProfile(myProfile);
  };

  useEffect(() => {
    getProfile();
  }, []);
  const handleInput = (e, propertyName) => {
    setPost({
      ...post,

      [propertyName]: e.target.value
    });
  };
//********************************************************************* */
  const Sendpost = async (e) => {
    e.preventDefault();
    //const postToSend={text:'hardcoding',username:'Bimal',image:'aParrot'}
    console.log('POST DATA',post);
    let data = await createPost(post); // post
    setLatestPost(data);
    setPost({
      text: ""
    });
  };
  //***************************************************************** */
  const fileUpLoadHandler = async (e) => {
    e.preventDefault();

    await uploadPostPicture(latestPost?._id, file);
    loadingState(true);
    handleClose();
  };
  const fetchPost = async () => {
    const fetchedPosts = await getPosts();
    setPosts(fetchedPosts?.reverse());
  };
  
  useEffect(() => {
    fetchPost();
  }, [latestPost]);
  
  // console.log(post);
  // console.log(latestPost);
  // console.log(file);
  return (
    <>
      <div className="post">
        <div className="postInputContainer">
          <div className="postInput">
            <Avatar
              src={
                profile
                  ? profile.image
                  : "https://i.pinimg.com/474x/51/d3/89/51d3899b7eedf293e1684d1e70b66c20.jpg"
              }
              className="avatar"
            />
            {/* <CreateIcon /> */}
            <p variant="primary" onClick={handleShow}>
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

                  <Button
                    variant="success"
                    type="submit"
                    className="mx-2 my-3"
                    onClick={() => fetchPost()}
                  >
                    Send post
                  </Button>
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
                      variant="success"
                      type="submit"
                      onClick={fileUpLoadHandler}
                    >
                      Send Image
                    </Button>
                  </Form>
                </Form>
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
