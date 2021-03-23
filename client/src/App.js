import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './css/App.css';
import Sidebar from './components/sidebar/Sidebar';
import Feed from './components/feed/Feed';
import Widgets from './components/widgets/Widgets';
import Login from './components/login/Login';

function App() {
	return (
		<Router>
			<div className="app">
				<Sidebar />
				<Switch>
					<Route exact path="/" component={Feed} />
					<Route exact path="/login" component={Login} />
				</Switch>
				<Widgets />
			</div>
		</Router>
	);
}

export default App;
