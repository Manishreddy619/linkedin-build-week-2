import './App.css';
import ProfileDetails from './components/ProfileDetails';
import RightBar from './components/RightBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { UserDetails } from './components/OtherUserDetails';
import FeedRightBar from './components/FeedRightBar'
function App() {
	return (
		<Router>
			<div className='app'>
				{/* header component */}
				<div className='profileBody'>
					<Route path='/' exact>
						<ProfileDetails />
						<RightBar />
						<FeedRightBar />
					</Route>
				</div>
				<div className='profileBody'>
					<Route path='/profile/:id'>
						<UserDetails />
						<RightBar />
					</Route>
				</div>
			</div>
		</Router>
	);
}

export default App;
