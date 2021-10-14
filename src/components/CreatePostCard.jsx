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
import { getPosts,updatePost } from "../Utilities/fetches";

const CreatePostCard = ({ loadingState,fetchPosts,showPostModal,setShowPostModal,thisPostId,setThisPostId }) => {
  const[thisUser,setThisUser]=useState('6165f83709b1c7080226a026')//MARCO (just because I've filled Manish's profile with useless posts)
  const [post, setPost] = useState({
    text: "",
    username:'',
    image:'https://via.placeholder.com/540x285.png?text=Strive%20LinkedIn%20Placeholder' 
  });
  const [latestPost, setLatestPost] = useState(null)
  const [file, setFile] = useState(null);
  const [posts, setPosts] = useState([]);
  //const [show, setShow] = useState(false);
  const handleClose=()=>setShowPostModal(false);
  const handleShow=()=>setShowPostModal(true);

  const [profile, setProfile] = useState(null);
  const getProfile = async () => {
    let myProfile = await getMyProfile(thisUser);
    setProfile(myProfile);
    setPost({
      ...post,
      username:myProfile.username
    })
    //console.log('PROFILE IN USE + POST STATE: ',myProfile, post)
    getPosts()
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
//**********************************USELESS FUNCTION*********************************** */

  const Sendpost = async (e) => {
    console.log('SENDPOOOOOOOOSSSSTT!!!!!!!!!!!!!')
    e.preventDefault();
    //const postToSend={text:'hardcoding',username:'Bimal',image:'aParrot'}
    //console.log('POST DATA',post);
    if(thisPostId===undefined){
      console.log('THIS POST ID FROM CreatePostCard.jsx IF UNDEFINED')
      let data = await createPost(post); // post
      setLatestPost(data);
      setPost({
        text: ""
      });
      handleClose()
      fetchPosts()
    }else{
      console.log('THIS POST ID FROM CreatePostCard.jsx',thisPostId)
      const data=await updatePost(thisPostId,post)
      
      setLatestPost(data);
      setPost({
        text: ""
      });
      handleClose()
      fetchPosts()
    }
  };

  //***************************************************************** */
  const fileUpLoadHandler = async (e) => {
    e.preventDefault();
    
    if(thisPostId===undefined){
      //console.log('THIS POST ID FROM CreatePostCard.jsx IF UNDEFINED',thisPostId)
      let data = await createPost(post); // post
      setLatestPost(data);
      console.log('DATA ', data)
      setPost({
        text: ""
      });
      //console.log('POSTID UNDEFINED ', 'DATA',data,'FILE',file,'THIS POST ID',thisPostId)
      await uploadPostPicture(data,file)
      loadingState(true);
      handleClose()
      fetchPosts()
      setThisPostId()
    }else{
      //console.log('THIS POST ID FROM CreatePostCard.jsx',thisPostId)
      let data=await updatePost(thisPostId,post)
      setLatestPost(data);
      setPost({
        text: ""
      });
      console.log('POSTID UNDEFINED ','DATA',data,'FILE',file,'THIS POST ID',thisPostId)
      await uploadPostPicture(thisPostId,file)
      loadingState(true);
      handleClose()
      fetchPosts()
      setThisPostId()
    }
  }
/*
    let postId = await createPost(post); //postId=data from fetch.POST
    setLatestPost(postId);
    setPost({
      text: ""
    });
    // END
    console.log('DATA',postId)
    await uploadPostPicture(postId,file)//(latestPost?._id, file);
    //console.log('LOOOOOK',latestPost)
    loadingState(true);
    handleClose();
    fetchPosts()
  };
  */
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

            <Modal show={showPostModal} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>
                  <Avatar src={profile && profile.image} />
                </Modal.Title>
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

                  {/* <Button
                    variant="success"
                    type="submit"
                    className="mx-2 my-3"
                    onClick={() => fetchPost()}
                  >
                    Send post
                  </Button> */}
                  <Form>
                    <Form.Group className="mb-3">
                      {/* <Form.Label>Choose image </Form.Label> */}
                      <Form.Control
                        className="border-0"
                        type="file"
                        placeholder="Upload a image "
                        onChange={(e) => {
                          setFile(e.target.files[0]);
                          // console.log(e.target.files);
                          // console.log(file);
                        }}
                      />
                    </Form.Group>

                    <Button
                      variant="success"
                      type="submit"
                      onClick={fileUpLoadHandler}
                    >
                      Send Post
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
