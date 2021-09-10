import React from "react";
import RightBar from "./RightBar";
import "./Feed.css";
import LeftFeedProfile from "./LeftFeedProfile";
import CreatePostCard from "./CreatePostCard";
import FeedRightBar from "./FeedRightBar";
import PostCard from "./PostCard";
const Feed = () => {
  return (
    <div className="feed">
      <LeftFeedProfile />
      <div className="main-feed">
        <PostCard />
      </div>
      <FeedRightBar />
    </div>
  );
};

export default Feed;
