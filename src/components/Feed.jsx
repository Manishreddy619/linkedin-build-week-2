import React from 'react';
import RightBar from './RightBar';
import './Feed.css';
import LeftFeedProfile from './LeftFeedProfile';
const Feed = () => {
	return (
		<div className='feed'>
			<LeftFeedProfile />
			<RightBar />
		</div>
	);
};

export default Feed;
