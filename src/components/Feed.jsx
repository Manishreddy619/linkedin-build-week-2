import React from 'react';
import RightBar from './RightBar';
import './Feed.css';
import LeftFeedProfile from './LeftFeedProfile';
import CreatePostCard from './CreatePostCard';
import PostCard from './PostCard';
const Feed = () => {
	return (
		<div className='feed'>
			<LeftFeedProfile />
			<div className='main-feed'>
				<CreatePostCard />
				<PostCard />
			</div>
			<RightBar />
		</div>
	);
};

export default Feed;
