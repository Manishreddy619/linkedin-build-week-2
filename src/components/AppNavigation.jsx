import { Nav, Navbar } from 'react-bootstrap';
import linkedInLogo from '../Assets/LinkedIn-logo.png';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import {
	BsFillPeopleFill,
	BsBriefcaseFill,
	BsFillBellFill,
	BsGrid3X3Gap,
} from 'react-icons/bs';
import { AiFillMessage, AiOutlineSearch } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { Component } from 'react';
import { getFilteredProfiles } from '../Utilities/fetches';

//Header
class AppNavigation extends Component {
	state = {
		show: false,
		name: this.props.name,
		jobTitle: this.props.jobTitle,
		profilePicture: this.props.profilePicture,
		userID: this.props.userID,
		searchInput: '',
		searchResults: [],
		showSearchResults: false,
	};

	search = async () => {
		const results = await getFilteredProfiles(this.state.searchInput);
		this.setState({
			searchResults: results,
		});
	};

	componentDidUpdate = (prevProps, prevState) => {
		if (this.state.searchInput !== prevState.searchInput) {
			this.search();
			console.log(this.state.searchResults);
		}

		if (this.state.searchInput.length !== prevState.searchInput.length) {
			this.state.searchInput.length !== 0
				? this.setState({ showSearchResults: true })
				: this.setState({ showSearchResults: false });
		}
	};
/*
	componentDidMount = async () => {
		await getFilteredProfiles(this.state.searchResults);
	};
*/
	searchInputTextHandler = (event) => {
		this.setState({ searchInput: event.target.value });
	};

	render() {
		return (
			<>
				<Navbar
					expand='lg'
					fixed='top'
					className='container-fluid'
					style={{ backgroundColor: 'whitesmoke' }}>
					<Link to='/'>
						<div className='nav-brand'>
							<img src={linkedInLogo} alt='LinkedIn-logo' id='linkedIn-logo' />
						</div>
					</Link>
					<Navbar.Toggle aria-controls='navbarScroll' />
					<Navbar.Collapse id='navbarScroll'>
						<Nav
							className='mr-auto my-2 my-lg-0'
							style={{ maxHeight: '100px' }}
							navbarScroll>
							<div className='search-container'>
								<AiOutlineSearch className='search-icon' />
								<input
									type='text'
									placeholder='Search'
									className='mr-2 searchbar'
									onChange={this.searchInputTextHandler}
									value={this.state.searchInput}></input>
								{this.state.showSearchResults && (
									<div className='search-results-container swing-in-top-fwd'>
										{this.state.searchResults.length > 0 &&
											this.state.searchResults.map((user) => (
												<div key={user._id} className='d-flex search-result'>
													<Link
														onClick={() => {
															this.setState({
																searchResults: [],
																searchInput: '',
															});
														}}
														to={'/profile/' + user._id}>
														<div className='mr-auto my-2 my-2 ml-3'>
															<strong href='/'>{user.name} </strong>
															<strong>{user.surname}</strong>
															<small className='connection-degree'>
																{' '}
																??? 1st ???{' '}
															</small>
															<small>{user.title}</small>
														</div>
														<img
															src={user.image}
															alt=''
															className='profile-image mr-3 my-2 text-align-center'
														/>
													</Link>
												</div>
											))}
									</div>
								)}
							</div>
						</Nav>

						<Nav>
							<Link to='/'>
								<div className='d-flex flex-column align-items-center nav-link'>
									<FaHome className='Navbaricon' />
									<small>Home</small>
								</div>
							</Link>
							<Link to='/mynetwork'>
								<div className='d-flex flex-column align-items-center nav-link'>
									<BsFillPeopleFill className='Navbaricon' />
									<small>My Network</small>
								</div>
							</Link>
							<Link to='/jobs'>
								<div className='d-flex flex-column align-items-center nav-link mx-2'>
									<BsBriefcaseFill className='Navbaricon' />
									<small>Jobs</small>
								</div>
							</Link>
							<Link to='/messaging'>
								<div className='d-flex flex-column align-items-center nav-link mx-2'>
									<AiFillMessage className='Navbaricon' />
									<small>Messaging</small>
								</div>
							</Link>
							<Link to='/notifications'>
								<div className='d-flex flex-column align-items-center nav-link mx-2'>
									<BsFillBellFill className='Navbaricon' />
									<small>Notifications</small>
								</div>
							</Link>
							<Link to='/me'>
								<div className='d-flex flex-column align-items-center nav-link mx-2'>
									<CgProfile className='Navbaricon' />

									<small>Me</small>
								</div>
							</Link>
							<Link to='/work'>
								<div className='d-flex flex-column align-items-center nav-link mx-2'>
									<BsGrid3X3Gap className='Navbaricon' />
									<small>Work</small>
								</div>
							</Link>
							<Link to='/premium'>
								<div className='d-flex flex-column align-items-center nav-link mx-2'>
									<div className='premium-container'>
										<small className='try-premium align-top '>
											Try Premium For Free
										</small>
									</div>
								</div>
							</Link>
						</Nav>
					</Navbar.Collapse>
				</Navbar>

				{/*Footer*/}
			</>
		);
	}
}

export default AppNavigation;
