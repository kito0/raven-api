import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Redirect } from 'react-router-dom';
import './css/login.css';
import { useDispatch, useSelector } from 'react-redux';
import { LoginUser } from '../../redux/user';
import {
	Typography,
	TextField,
	CircularProgress,
	Button,
} from '@material-ui/core';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();
	const loading = useSelector((state) => state.userSlice.loading);
	const errors = useSelector((state) => state.userSlice.errors);

	async function onSubmit(e) {
		e.preventDefault();

		try {
			LoginUser(dispatch, { email, password });
			return <Redirect to="/" />;
		} catch (e) {
			alert(e.message);
		}
	}

	return (
		<div className="login">
			<img
				src={process.env.PUBLIC_URL + '/login.png'}
				alt="login"
				width="150"
			/>
			<Typography variant="h2" className="login__title">
				Login
			</Typography>
			<form onSubmit={onSubmit} className="login__form">
				<TextField
					type="email"
					placeholder="email"
					className="login__input"
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<TextField
					type="password"
					placeholder="password"
					className="login__input"
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<Button
					type="submit"
					variant="contained"
					className="login__button"
					disabled={loading}
				>
					Login
					{loading && (
						<CircularProgress size={30} className="login__progress" />
					)}
				</Button>
				{errors ? (
					<Typography variant="body2" className="login__errors">
						{errors}
					</Typography>
				) : (
					<br />
				)}
				<Router>
					<small>
						Don't have an account? Sign up <Link to="/signup">here</Link>
					</small>
				</Router>
			</form>
		</div>
	);
}
