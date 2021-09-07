import './App.css';
import ProfileDetails from './components/ProfileDetails';
import RightBar from './components/RightBar';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	return (
		<div className='app'>
			<div className='profileBody'>
				<ProfileDetails />
				<RightBar />
			</div>
		</div>

	);
}

export default App;
