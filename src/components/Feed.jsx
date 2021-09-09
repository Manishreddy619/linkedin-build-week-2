import React from 'react';
import RightBar from './RightBar';
import './Feed.css';
import LeftFeedProfile from './LeftFeedProfile';
import CreatePostCard from './CreatePostCard';
const Feed = () => {
	return (
		<div className='feed'>
			<LeftFeedProfile />
			<CreatePostCard />
			<RightBar />
		</div>
	);
};

export default Feed;
