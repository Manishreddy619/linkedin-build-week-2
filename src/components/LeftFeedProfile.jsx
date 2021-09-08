import { getMyProfile } from '../Utilities/fetches';
import { useState, useEffect } from 'react';
import './LeftFeedProfile.css';

const LeftFeedProfile = () => {
	const [profile, setProfile] = useState(null);

	useEffect(() => {
		const getProfile = async () => {
			let myProfile = await getMyProfile();
			setProfile(myProfile);
		};
		getProfile();
	}, []);

	return (
		<>
			{profile !== null && (
				<>
					<div className='left-feed-profile-container'>
						<div className='left-feed-profile'>
							<div className='left-feed-profile-deatils'>
								<div className='left-feed-profile-background'>
									<div className='left-feed-profile-img-container'>
										<img
											src={profile.image}
											alt='user'
											className='left-feed-profile-img'></img>
									</div>
								</div>
								<div className='left-feed-profile-name'>
									<p>
										{profile.name}
										{profile.surname}
									</p>
								</div>
								<div className='left-feed-profile-area'>
									<p>{profile.area}</p>
								</div>
							</div>
							<div className='left-feed-profile-item-first'>
								<div className='left-feed-profile-connection'>
									<span className='text-dark-99'>Connections</span>
									<span className='text-blue-c2'>8</span>
								</div>
								<div>
									<span className='text-dark-e6'>Grow your network</span>
								</div>
							</div>
							<div className='left-feed-profile-item'>
								<span className='text-dark-e6'>
									Access exclusive tools &amp; insights
								</span>
								<span className='text-dark-99'>Try Premium for free</span>
							</div>
							<div className='left-feed-profile-item'>
								<div>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='16'
										height='16'
										fill='currentColor'
										className='bi bi-bookmark-fill'
										viewBox='0 0 16 16'>
										<path d='M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z' />
									</svg>
									<span>My items</span>
								</div>
							</div>
						</div>

						<div className='left-feed-profile2'>
							<ul className='left-feed-profile-ul'>
								<li>Groups</li>
								<li>
									<div className='left-feed-profile-event-li'>
										<span>Event</span>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='20'
											height='20'
											fill='currentColor'
											className='bi bi-plus'
											viewBox='0 0 16 16'>
											<path d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z' />
										</svg>
									</div>
								</li>
								<li>Followed Hashtags</li>
							</ul>
							<div className='left-feed-profile-btn-discover'>
								<spam>Discover more</spam>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default LeftFeedProfile;
