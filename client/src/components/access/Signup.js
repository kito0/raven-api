import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import './css/login.css';
import { useDispatch, useSelector } from 'react-redux';
import { SignupUser } from '../../redux/user';
import {
	Typography,
	TextField,
	CircularProgress,
	Button,
} from '@material-ui/core';

export default function Signup() {
	const [name, setName] = useState('');
	const [handle, setHandle] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();
	const loading = useSelector((state) => state.userSlice.loading);
	const authenticated = useSelector((state) => state.userSlice.authenticated);

	async function onSubmit(e) {
		e.preventDefault();

		try {
			SignupUser(dispatch, {
				name,
				handle,
				email,
				avatar:
					'https://oes.semel.ucla.edu/wp-content/themes/collective/images/default-profile.jpg',
				password,
			});
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
					type="name"
					placeholder="name"
					className="login__input"
					onChange={(e) => setName(e.target.value)}
					required
				/>
				<TextField
					type="handle"
					placeholder="handle"
					className="login__input"
					onChange={(e) => setHandle(e.target.value)}
					required
				/>
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
			</form>
		</div>
	);
}
