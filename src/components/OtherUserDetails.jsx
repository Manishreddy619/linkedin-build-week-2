import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import { Button, Modal } from 'react-bootstrap';
import { getUserProfile, getUserExperienceList } from '../Utilities/fetches';
export const UserDetails = () => {
	const [userDetails, setUserDetails] = useState({});
	const [exList, setExList] = useState([]);
	const params = useParams();
	const getUserData = async () => {
		let data = await getUserProfile(params.id);
		setUserDetails(data);

		console.log(data);
	};
	const getUserEx = async () => {
		let experienceList = await getUserExperienceList(params.id);
		setExList(experienceList);
		console.log(experienceList);
	};
	useEffect(() => {
		getUserData();
		getUserEx();
	}, [params.id]);
	// will recieve params from search
	return (
		userDetails && (
			<div className='profileDetails' key={userDetails._id}>
				<div className='profileBox1'>
					<img
						src='https://cdn.wallpapersafari.com/72/62/bf6Xxh.jpg'
						alt='backimg'
					/>

					<Avatar
						className='Avatar'
						// src={details.image}
						src={userDetails.image}
						style={{ width: '200px', height: '200px' }}
					/>

					<div className='details'>
						<div className='detailsRight'>
							<h2>
								{userDetails.name && userDetails.name.length >= 10
									? userDetails.name.slice(0, 14)
									: userDetails.name}
							</h2>
							<h3>userName: {userDetails.username}</h3>
							<h4>{userDetails.title}</h4>
							<p>email : {userDetails.email}</p>
							<p>{userDetails.area}</p>
							<p>
								<span style={{ color: 'blue', fontWeight: '500' }}>
									35:Connections
								</span>
							</p>
						</div>
						<div className='detailsLeft'>
							<img
								src='https://strive.school/favicon.ico'
								alt='striveschool'
								style={{ marginRight: '20px' }}
							/>
							<span>StriveSchool</span>
						</div>
					</div>
					<div className='buttons'>
						<Button className='btn1'>Message</Button>

						<Button variant='light' className='btn1'>
							More
						</Button>
					</div>
				</div>
				<div className='aboutSection'>
					<h3>About</h3>
					<p>
						{userDetails
							? userDetails.bio
							: "My name is xyzz I'm a Front End Engineer based in  germany☀️. I describe myself as a passionate developer who loves coding"}
					</p>
				</div>
				<div className='experience'>
					<h3>Experience</h3>

					{exList &&
						exList.map((ex) => {
							return (
								<>
									<div className='experience-div' key={ex._id}>
										<img src={ex.image} alt='striveschool' />
										<div className='experienceDetails'>
											<h3>{ex.role}</h3>
											<h5>Role:{ex.description}</h5>
											<h6>Company:{ex.company}</h6>
											<div>
												<p>from: {new Date().toDateString(ex.startDate)}</p>
												<p>To: {new Date().toDateString(ex.endDate)}</p>
											</div>
										</div>
									</div>
								</>
							);
						})}
				</div>
			</div>
		)
	);
};
