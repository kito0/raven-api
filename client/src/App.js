import { useEffect } from 'react';
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
import Login from './components/access/Login';
import Signup from './components/access/Signup';
import { GetUser } from './redux/user';

function App() {
	const dispatch = useDispatch();
	const authenticated = useSelector((state) => state.userSlice.authenticated);

	useEffect(() => {
		GetUser(dispatch, localStorage.getItem('handle')).catch((err) => {
			console.error(err);
		});
	}, [dispatch]);

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
					<Route exact path="/signup">
						{authenticated ? <Redirect to="/" /> : <Signup />}
					</Route>
				</Switch>
				<Widgets />
			</div>
		</Router>
	);
}

export default App;
