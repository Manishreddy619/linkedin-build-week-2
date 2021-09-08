import './App.css';
import ProfileDetails from './components/ProfileDetails';
import RightBar from './components/RightBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavigation from './components/AppNavigation';
import Footer from './components/Footer';

function App() {
	return (
		<div className='app'>
			<div className='profileBody'>
				<AppNavigation/>
				<ProfileDetails />
				<RightBar />
				<Footer/>
			</div>
		</div>
	);
}

export default App;
