import React from 'react';
import './PostCard.css';
import { getPosts } from '../Utilities/fetches';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ShareIcon from '@material-ui/icons/Share';
import CommentIcon from '@material-ui/icons/Comment';
import SendIcon from '@material-ui/icons/Send';
import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';

export default function PostCard() {
	const [posts, setPosts] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const [isTextExpanded, setTextExpanded] = useState(false);
	const fetchPosts = async () => {
		const fetchedPosts = await getPosts();
		setPosts(fetchedPosts.reverse());
		setLoading(false);
	};
	useEffect(() => {
		fetchPosts();
	}, []);

	return (
		<div>
			{isLoading && <Spinner animation='grow' />}
			{posts &&
				posts.slice(0, 25).map((post) => (
					<div key={post._id} className='postCard d-flex flex-column'>
						<div className='postCardTop d-flex justify-content-between'>
							<div className='d-flex justify-content-center align-items-center'>
								<img
									src={post.user.image}
									alt=''
									srcset=''
									height='48px'
									width='48px'
								/>
								<div className='ml-1'>
									<div className='profileName'>
										{post.user.name} {post.user.surname}
									</div>
									<div className='profileMuted text-muted'>
										Created at: {new Date(post.createdAt).toLocaleString()}
									</div>
									<div className='profileMuted text-muted'>
										Updated at: {new Date(post.updatedAt).toLocaleString()}
									</div>
								</div>
							</div>
							<div>
								<MoreHorizIcon className='horizontalDots' />
							</div>
						</div>
						<div className='postCardMiddle d-flex flex-column'>
							<div className='postCardMiddle'>{post.text}</div>
							<a className='align-self-end postCardMiddle'>see more...</a>
							<img
								src='https://picsum.photos/540/285'
								alt=''
								srcset=''
								width='540px'
								height='285px'
							/>
						</div>
						<div className='postCardBottom d-flex flex-wrap justify-content-between w-100'>
							<hr className='postCardLine' />
							<div className='d-flex align-items-center justify-content-center bottomIcons'>
								<ThumbUpIcon />
								<div>Like</div>
							</div>
							<div className='d-flex align-items-center justify-content-center bottomIcons'>
								<CommentIcon />
								<div>Comment</div>
							</div>
							<div className='d-flex align-items-center justify-content-center bottomIcons'>
								<ShareIcon />
								<div>Share</div>
							</div>
							<div className='d-flex align-items-center justify-content-center bottomIcons'>
								<SendIcon />
								<div>Send</div>
							</div>
						</div>
					</div>
				))}
		</div>
	);
}
