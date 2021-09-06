import React from 'react';
import './ProfileDetails.css';
import { Avatar } from '@material-ui/core';
import { Button } from 'react-bootstrap';
const ProfileDetails = () => {
	return (
		<div className='profileDetails'>
			<div className='profileBox1'>
				<img
					src='https://cdn.wallpapersafari.com/72/62/bf6Xxh.jpg'
					alt='backimg'
				/>
				<Avatar className='Avatar' />
				<div className='details'>
					<div className='detailsRight'>
						<h2>Manish Elaganti</h2>
						<h4>developer</h4>
						<p>Contact info</p>
						<p>Connections</p>
					</div>
					<div className='detailsLeft'>
						<img src='https://strive.school/favicon.ico' alt='striveschool' />
						<span>Striveschool</span>
					</div>
				</div>
				<div className='buttons'>
					<Button variant='primary'>Primary</Button>
					<Button variant='light'>Add section</Button>
					<Button variant='light'>More</Button>
				</div>
			</div>
			<div className='aboutSection'>
				<h3>about</h3>
				<p>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio facere
					est quos nesciunt a, ut voluptatibus harum, in nihil eum autem
					similique! Fugit, omnis. Voluptatum quidem labore accusamus aut, vitae
					totam quibusdam eius neque cum illo nostrum obcaecati.
				</p>
			</div>
			<div className='experience'>
				<h3>Experience</h3>

				<div className='experience-div'>
					<img
						src='https://strive.school/favicon.ico'
						alt='striveschool'
						alt=''
					/>
					<div className='experienceDetails'>
						<h3>Full stack developer</h3>
						<p>experience deatails</p>
					</div>
				</div>
			</div>
			<div className='education'>
				<h3>Education</h3>
				<div className='experience-div'>
					<img
						src='https://strive.school/favicon.ico'
						alt='striveschool'
						alt=''
					/>
					<div className='educationDetails'>
						<h3>Full stack developer</h3>
						<p>education details</p>
					</div>
				</div>
			</div>
			<div className='skills'>
				<h3>Skills & endorsements</h3>
				<Button variant='light'>Take skill quiz</Button>
				<p>skill-1</p>
				<p>skill-2</p>
				<p>skill-3</p>
			</div>
			<div className='interests'>
				<h3>Interests</h3>
				<div className='interests-div'>
					<img
						src='https://strive.school/favicon.ico'
						alt='striveschool'
						alt=''
					/>
					<span>Strive</span>
				</div>
				<div className='interests-div'>
					<img
						src='https://strive.school/favicon.ico'
						alt='striveschool'
						alt=''
					/>
					<span>Strive</span>
				</div>
			</div>
		</div>
	);
};

export default ProfileDetails;
