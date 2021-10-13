import React from "react";
import "./PostCard.css";
import { deletePost, getPosts,like } from "../Utilities/fetches";
import "./Feed.css";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ShareIcon from "@material-ui/icons/Share";
import CommentIcon from "@material-ui/icons/Comment";
import SendIcon from "@material-ui/icons/Send";
import { useEffect, useState } from "react";
import { Spinner, Button, Modal } from "react-bootstrap";
import EditPictureModal from "./EditPictureModal";
import CreatePostCard from "./CreatePostCard";

export default function PostCard({ loadingState }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isTextExpanded, setTextExpanded] = useState(false);

  const [myPost, setMypost] = useState(null);



  let myId = "6135d7437be6c10015f9db99"; // MONGODB:61656206d9b9e312c927feb9
  const fetchPosts = async () => {
    const fetchedPosts = await getPosts();
    setPosts(fetchedPosts);//?.reverse()
    setLoading(false);
    console.log('HERE I AM')
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
      console.log(singlePost);
      setMypost(singlePost);
    }
  };
  console.log(posts);
  
  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (isLoading === true) fetchPosts();
  }, [isLoading]);

  //**********LIKE POST****************
  const like=()=>{

  }
  //**********DELETE CLICKED POST********
  const deleteThisPost=async(e)=>{
    console.log('POST ID: ',e)
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <CreatePostCard loadingState={(state) => setLoading(state)} fetchPosts={fetchPosts} />
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
                  onClick={()=>deleteThisPost(post._id)}
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
              <a className="align-self-end postCardMiddle">...see more</a>
              {post.image && (
                <img
                  src={post.image}
                  alt=""
                  srcset=""
                  width="540px"
                  height="285px"
                />
              )}
              {post.image === undefined && (
                <img
                  src="https://picsum.photos/540/285"
                  alt=""
                  srcset=""
                  width="540px"
                  height="285px"
                />
              )}
            </div>
            <div className="postCardBottom d-flex flex-wrap justify-content-between w-100">
              <hr className="postCardLine" />
              <div className="d-flex align-items-center justify-content-center bottomIcons">
                <ThumbUpIcon className="postCardIcons" />
                <div className="postCardIcon"
                onClick={()=>like()}
                >Like</div>
              </div>
              <div className='d-flex align-items-center justify-content-center bottomIcons "'>
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
          </div>
        ))}
    </div>
  );
}
