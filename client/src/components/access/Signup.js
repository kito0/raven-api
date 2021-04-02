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
	const errors = useSelector((state) => state.userSlice.errors);

	async function onSubmit(e) {
		e.preventDefault();
		setHandle(handle.toLowerCase());

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
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<div className="login">
			<img
				src={process.env.PUBLIC_URL + '/login.png'}
				alt="login"
				width="150"
				className="login__logo"
			/>
			<Typography variant="h2" className="login__title">
				Signup
			</Typography>
			<form onSubmit={onSubmit} className="login__form">
				<TextField
					type="name"
					placeholder="name"
					className="login__input"
					onChange={(e) => setName(e.target.value)}
					autoComplete="off"
				/>
				<TextField
					type="handle"
					placeholder="handle"
					className="login__input"
					onChange={(e) => setHandle(e.target.value)}
					autoComplete="off"
				/>
				<TextField
					type="email"
					placeholder="email"
					className="login__input"
					onChange={(e) => setEmail(e.target.value)}
					autoComplete="off"
				/>
				<TextField
					type="password"
					placeholder="password"
					className="login__input"
					onChange={(e) => setPassword(e.target.value)}
					autoComplete="off"
				/>
				{errors && (
					<Typography variant="body2" className="login__errors">
						{errors}
					</Typography>
				)}
				<Button
					type="submit"
					variant="contained"
					className="login__button"
					disabled={loading}
				>
					Signup
					{loading && (
						<CircularProgress size={30} className="login__progress" />
					)}
				</Button>
			</form>
		</div>
	);
}
