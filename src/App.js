import './App.css';
import ProfileDetails from './components/ProfileDetails';
import RightBar from './components/RightBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { UserDetails } from './components/OtherUserDetails';
import AppNavigation from './components/AppNavigation.jsx';

import Feed from './components/Feed';
import Footer from './components/Footer';
function App() {
	return (
		<Router>
			<div className='app'>
				<AppNavigation />
				<Footer />
				<div className='profileBody'>
					<Route path='/' exact>
						<Feed />
					</Route>
					<Route path='/me' exact>
						<ProfileDetails />
						<RightBar />
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
