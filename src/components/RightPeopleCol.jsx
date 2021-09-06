const RightPeopleCol = ({ profile }) => {
	return (
		profile !== undefined && (
			<li>
				{console.log(profile)}
				<div className='right-people-container'>
					<div className='right-people-img-container'>
						<img
							src={profile.image}
							alt='user images'
							className='right-people-user-image'></img>
					</div>
					<div className='right-people-details'>
						<p className='right-people-name'>{profile.name} &bull;</p>
						<p className='right-people-area'>{profile.area}</p>
					</div>
				</div>
				<div className='right-people-button-container'>
					<span>Connect</span>
				</div>
			</li>
		)
	);
};

export default RightPeopleCol;
