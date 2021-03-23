import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './css/App.css';
import Sidebar from './components/sidebar/Sidebar';
import Feed from './components/feed/Feed';
import Widgets from './components/widgets/Widgets';
import Login from './components/login/Login';

function App() {
	const user = useSelector((state) => state.userSlice.user);
	const authenticated = useSelector((state) => state.userSlice.authenticated);

	return (
		<Router>
			<div className="app">
				<Sidebar />
				<Switch>
					<Route exact path="/">
						<Feed />
					</Route>
					<Route exact path="/login">
						{authenticated ? <Redirect to="/" /> : <Login />}
					</Route>
				</Switch>
				<Widgets />
			</div>
		</Router>
	);
}

export default App;
