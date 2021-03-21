import React, { useState } from 'react';
import './css/croakbox.css';
import { Avatar, Button, TextField } from '@material-ui/core';
import axios from 'axios';

export default function CroakBox() {
	const [text, setText] = useState('');
	const [image, setImage] = useState('');

	const user = {
		name: 'Andrew Shah',
		handle: 'Drew',
		avatar: 'http://cdn.onlinewebfonts.com/svg/img_258083.png',
	};
	const api = 'http://raven-x.herokuapp.com/api/posts';
	let config = {
		headers: {
			'auth-token':
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDUyZmFlYWViNjlkNjNhNjgzZGNjYmQiLCJpYXQiOjE2MTYyNDQ3OTd9.5_hjapawi2G2t3TICDGVPNPZFSLS6LDIq0buhFVv1Sc',
		},
	};

	const onSubmit = (e) => {
		e.preventDefault();
		axios
			.post(
				api,
				{
					name: user.name,
					handle: user.handle,
					avatar: user.avatar,
					text,
					image,
				},
				config
			)
			.then()
			.catch((err) => console.error(err));
	};

	return (
		<div className="croakbox">
			<form onSubmit={onSubmit}>
				<div className="croakbox__input">
					<Avatar src={user.avatar} className="croakbox__avatar" />
					<TextField
						placeholder="croak away"
						className="croakbox__input__text"
						onChange={(e) => setText(e.target.value)}
						required
					/>
				</div>
				<TextField
					className="croakbox__input__img"
					placeholder="optional: enter img url"
					onChange={(e) => setImage(e.target.value)}
				/>
				<Button className="croakbox__button" type="submit">
					Croak
				</Button>
			</form>
		</div>
	);
}
