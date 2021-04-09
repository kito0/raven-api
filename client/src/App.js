import { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './css/app.css';

import Sidebar from './components/sidebar/Sidebar';
import Widgets from './components/widgets/Widgets';
import Login from './components/access/Login';
import Signup from './components/access/Signup';

import Feed from './components/home/feed/Feed';
import Explore from './components/explore/Explore';
import Notifications from './components/notifications/Notifications';
import Messages from './components/messages/Messages';
import Bookmarks from './components/bookmarks/Bookmarks';
import Lists from './components/lists/Lists';
import Profile from './components/profile/Profile';
import More from './components/more/More';

import { useDispatch, useSelector } from 'react-redux';
import { GetUser } from './redux/user';

function App() {
	const dispatch = useDispatch();
	const authenticated = useSelector((state) => state.userSlice.authenticated);

	useEffect(() => {
		if (localStorage.getItem('id'))
			GetUser(dispatch, localStorage.getItem('id'));
	}, [dispatch]);

	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);

	window.addEventListener('resize', () => {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	});

	return (
		<div className="app">
			<Sidebar />
			<Switch>
				<div className="view">
					<Route exact path="/" component={Feed} />
					<Route exact path="/explore" component={Explore} />
					<Route exact path="/notifications" component={Notifications} />
					<Route exact path="/messages" component={Messages} />
					<Route exact path="/bookmarks" component={Bookmarks} />
					<Route exact path="/lists" component={Lists} />
					<Route exact path="/profile">
						{!authenticated ? <Redirect to="/" /> : <Profile />}
					</Route>
					<Route exact path="/more" component={More} />
					<Route exact path="/login">
						{authenticated ? <Redirect to="/" /> : <Login />}
					</Route>
					<Route exact path="/signup">
						{authenticated ? <Redirect to="/" /> : <Signup />}
					</Route>
				</div>
			</Switch>
			<Widgets />
		</div>
	);
}

export default App;
