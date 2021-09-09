import CreateIcon from '@material-ui/icons/Create';
import React, { useEffect, useState } from 'react';
import './Feed.css';
import InputOption from './InputOption';
import ImageIcon from '@material-ui/icons/Image';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';
import EventNoteIcon from '@material-ui/icons/EventNote';
import './CreatePostCard.css';
import { Avatar } from '@material-ui/core';
import PostCard from './PostCard';

const CreatePostCard = () => {
	const [input, setInput] = useState('');
	const sendpost = (e) => {
		e.preventDefault();

		// setInput('');
	};
	return (
		<>
			<div className='post'>
				<div className='postInputContainer'>
					<div className='postInput'>
						<Avatar
							src='https://i.pinimg.com/474x/51/d3/89/51d3899b7eedf293e1684d1e70b66c20.jpg'
							className='avatar'
						/>
						{/* <CreateIcon /> */}
						<form>
							<input
								type='text'
								placeholder='Start a post'
								value={input}
								onChange={(e) => setInput(e.target.value)}
							/>
							<button onClick={sendpost} type='submit'>
								Send
							</button>
						</form>
					</div>
					<div className='postInputOptions'>
						<InputOption title='Photo' Icon={ImageIcon} color='#70b5f9' />
						<InputOption
							title='Video'
							Icon={SubscriptionsIcon}
							color='#e7a33e'
						/>
						<InputOption
							title='Event Note'
							Icon={EventNoteIcon}
							color='#cocbcd'
						/>
						<InputOption
							title='Write article'
							Icon={CalendarViewDayIcon}
							color='#7fc15e'
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default CreatePostCard;
