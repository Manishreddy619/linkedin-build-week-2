import './App.css';
import ProfileDetails from './components/ProfileDetails';
import RightBar from './components/RightBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import UserDetails from './components/UserDetails';
function App() {
	return (
		<Router>
			<div className='app'>
				{/* header component */}
				<div className='profileBody'>
					<Route path='/' exact>
						<ProfileDetails />
						<RightBar />
					</Route>
					<Route path='/details/:name'>
						<UserDetails path='/details/:Id' />
						<RightBar />
					</Route>
				</div>
			</div>
		</Router>
	);
}

export default App;
