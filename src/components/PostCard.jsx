import React from "react";
import "./PostCard.css";
import { deletePost, getPosts,like,getMyProfile,postAComment,getCommentsFromDB,updateComment,getPost } from "../Utilities/fetches";
import "./Feed.css";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ShareIcon from "@material-ui/icons/Share";
import CommentIcon from "@material-ui/icons/Comment";
import SendIcon from "@material-ui/icons/Send";
import { useEffect, useState } from "react";
import { Spinner, Button, Modal,Form } from "react-bootstrap";
import EditPictureModal from "./EditPictureModal";
import CreatePostCard from "./CreatePostCard";

import { Avatar } from "@material-ui/core";
import { SettingsInputAntennaTwoTone } from "@material-ui/icons";

export default function PostCard({ loadingState }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isTextExpanded, setTextExpanded] = useState(false);

  const [myPost, setMypost] = useState(null);
  // *********** POSTS MODAL SECTION (STATE LIFT FOR CreatePostCard.jsx)************
  const[showPostModal,setShowPostModal]=useState(false)
  
  // *********** THIS PROFILE SECTION ********************
  const[thisUser,setThisUser]=useState('6165f83709b1c7080226a026') // HARDCODING MARCO 
  const [profile, setProfile] = useState();
  const getProfile=async()=>{
    let myProfile=await getMyProfile(thisUser);
    //console.log('THIS IS MY PROFILE: ',myProfile)
    setProfile(myProfile);
  };

  // ********************** COMMENTS SECTION ****************************
  const[comment,setComment]=useState()
  //________________________________________ADD a COMMENT
  const handleComment=(e,propertyName)=>{
    setComment({
      ...comment,
      [propertyName]: e.target.value
    });
  }
  const addComment=async(postId)=>{
    //const thisUserId={'id':thisUser}
    const newComment=await postAComment(postId,comment)
    //console.log('FOR ADDING A COMMENT, POST ID: ',postId, 'COMMENT TEXT: ', comment,'RESPONSE: ',newComment)
  }
  //________________________________GET COMMENTS by Post Id
  const[showComments,setShowComments]=useState(false);
  const handleClose=()=>setShowComments(false);
  const handleShow=()=>setShowComments(true);
  const[thisPostComments,setThisPostComments]=useState()
  const[thisPostId,setThisPostId]=useState()
  const getComments=async(postId)=>{
    if(showComments===true){
      handleClose()
    }else{
      setThisPostId(postId)
      const response=await getCommentsFromDB(postId,setThisPostComments)
      setThisPostComments(response)
      console.log('THIS POST ID',thisPostId, 'THIS POST COMMENTS: ',thisPostComments,'RESPONSE',response)
      handleShow()
    }
  }
  //__________________________________PUT COMMENT by Comment Id
  const updateThisComment=async(postId,commentId,e)=>{
    const response=await updateComment(postId,commentId,e)
    getComments()
    setShowComments(true)
  }
  // *******************************************************

  let myId = "6135d7437be6c10015f9db99"; // MONGODB:61656206d9b9e312c927feb9
  const fetchPosts = async () => {
    const fetchedPosts = await getPosts();
    setPosts(fetchedPosts);//?.reverse()
    setLoading(false);
    //console.log('HERE I AM')
  };
  const updateMYpicture = async (e, singlePost) => {
    // console.log(e);
    // console.log(singlePost.user?._id);
    // posts
    // .filter((post) => post.user?._id === '6135d7437be6c10015f9db99')
    // .map((b) => {
    // 	// return b && <div>{console.log(b)}</div>;
    // 	return '';
    // });

    if (singlePost.user?._id === myId) {
      //console.log(singlePost);
      setMypost(singlePost);
    }
  };

  //**********USE EFFECT****************
  useEffect(() => {
    fetchPosts();
    //console.log('THIS USER', thisUser)
    getProfile()
    setThisPostId()
  }, []);

  useEffect(() => {
    if (isLoading === true) fetchPosts();
  }, [isLoading]);
  //**********LIKE POST WITH ALERT****************
  const likeThisPost=async(e)=>{
    const thisUserId={'id':thisUser}
    const response=await like(e,thisUserId)
    const isThisUserInLikesArray=response.likes.indexOf(thisUser)
    if(isThisUserInLikesArray==-1){
      alert('You UNLIKED this Post')
    }else{
      alert('You LIKED this Post')
    }
    //console.log('LIKED POST ID: ', e,'RESPONSE FROM FETCH: ', response.likes, 'isThisUserInLikesArray',isThisUserInLikesArray)
  }
  //*********LIKES COUNTER************* */
  const counter=(likes)=>{
    const arrayOfLikes=likes
    const numberOfLikes=arrayOfLikes.length
    return numberOfLikes
  }
  //**********DELETE CLICKED POST********
  const deleteThisPost=async(e)=>{
    console.log('DELETED POST ID: ',e)
    await deletePost(e)
    fetchPosts()
  }
  //**********UPDATE POST*****************
  const [post, setPost] = useState({
    text: "",
    username:'',
    image:'https://via.placeholder.com/540x285.png?text=Strive%20LinkedIn%20Placeholder' 
  });
  const updateThisPost=async(postId)=>{
    console.log('POST ID: ',postId)
    setShowPostModal(true)
    setThisPostId(postId)
    const thisSinglePost=await getPost(postId)
    console.log('THIS SINGLE POST',thisSinglePost)
    setPost({
      text: thisSinglePost.text,
      image:thisSinglePost.image,
      username:thisSinglePost.username
    });
    //console.log('STATE THIS POST ID: ',thisPostId)
  }

  


  return (
    <div className="d-flex flex-column align-items-center">
      <CreatePostCard loadingState={(state) => setLoading(state)}
      fetchPosts={fetchPosts}
      showPostModal={showPostModal}
      setShowPostModal={setShowPostModal}
      thisPostId={thisPostId}
      setThisPostId={setThisPostId}
      post={post}
      setPost={setPost}
      />
      {isLoading && <Spinner className="m-auto" animation="grow" />}
      {posts &&
        posts //.slice(0, 70)
        .slice(Math.max(posts.length - 10, 0))
        .reverse()
        .map((post) => (
          <div key={post._id} className="postCard d-flex flex-column">
            <div className="postCardTop d-flex justify-content-between">
              <div className="d-flex justify-content-center align-items-center">
                <img
                  src={post.user.image}
                  alt=""
                  srcset=""
                  height="48px"
                  width="48px"
                />
                <div className="ml-1">
                  <div className="profileName">
                    {post.user.name} {post.user.surname}
                  </div>
                  <div className="profileMuted text-muted">
                    Created at: {new Date(post.createdAt).toLocaleString()}
                  </div>
                  <div className="profileMuted text-muted">
                    Updated at: {new Date(post.updatedAt).toLocaleString()}
                  </div>
                </div>
              </div>
              <div onClick={(e) => updateMYpicture(e, post)}>
                {post.user._id !== myId && (
                  <MoreHorizIcon className="horizontalDots"
                  // onClick={()=>deleteThisPost(post._id)}
                  />
                )}
              </div>
              {post.user._id === myId && (
                <EditPictureModal
                  loadingState={(state) => setLoading(state)}
                  id={post._id}
                  message={post.text}
                />
              )}
            </div>
            <div className="postCardMiddle d-flex flex-column">
              <div className="postCardMiddle">{post.text}</div>
              <a className="align-self-end postCardMiddle"
              onClick={()=>deleteThisPost(post._id)}
              style={{color:'red'}}
              >delete this post</a>
              <a className="align-self-end postCardMiddle"
              onClick={(e)=>updateThisPost(post._id)}
              style={{color:'green'}}
              >update this post</a>
              {post.image && (
                <img
                  src={post.image}
                  alt=""
                  srcset=""
                  width="540px"
                  height="285px"
                  />
                  )}
              {/* {post.image === undefined && (
                <img
                src="https://picsum.photos/540/285"
                alt=""
                srcset=""
                width="540px"
                height="285px"
                />
              )} */}
            </div>
            {post.likes&&(
              <a>likes number: {counter(post.likes)}</a>
            )}
            <div className="postCardBottom d-flex flex-wrap justify-content-between w-100">
              <hr className="postCardLine" />
              <div className="d-flex align-items-center justify-content-center bottomIcons"
              onClick={(e)=>likeThisPost(post._id)}
              >
                <ThumbUpIcon className="postCardIcons"/>
                <div className="postCardIcon">Like</div>
              </div>
              <div className='d-flex align-items-center justify-content-center bottomIcons "'
              onClick={(e)=>getComments(post._id)}
              >
                <CommentIcon className="postCardIcons" />
                <div className="postCardIcon">Comment</div>
              </div>
              <div className='d-flex align-items-center justify-content-center bottomIcons "'>
                <ShareIcon className="postCardIcons" />
                <div className="postCardIcon">Share</div>
              </div>
              <div className='d-flex align-items-center justify-content-center bottomIcons "'>
                <SendIcon className="postCardIcons" />
                <div className="postCardIcon">Send</div>
              </div>
            </div>
            {(thisPostId===post._id)?profile&&showComments&&thisPostComments&&(
            <>
            <div className="postInput" >
              <Avatar
                src={
                  profile.image
                    ? profile.image
                    : "https://i.pinimg.com/474x/51/d3/89/51d3899b7eedf293e1684d1e70b66c20.jpg"
                }
                className="avatar"
              />
              {/* <CreateIcon /> */}
              <p variant="primary">
                <Form>
                  <Form.Control                       
                    className="border-0"
                    as="textarea"
                    placeholder="Add a comment"
                    
                    onChange={(e)=>handleComment(e,"comment")} />
                </Form>
                <SendIcon className="postCardIcons" onClick={()=>addComment(post._id)} />
              </p>
            </div>
            <div>
              {(thisPostId===post._id)?thisPostComments&&thisPostComments.map((comment)=>(
                <div key={thisPostComments._id} className="border">
                <p>{comment.postWithUser.user.name} {comment.postWithUser.user.surname} said: {comment.comment} </p>
                <a onClick={(e)=>updateThisComment(thisPostId,thisPostComments._id,'comment')}></a>
                </div>
              )):<div></div>}
            </div>
            </>
            ):<div></div>}
          </div>
        ))}
    </div>
  );
}
