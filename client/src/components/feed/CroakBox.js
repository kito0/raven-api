import React, { useState } from 'react';
import './css/croakbox.css';
import { Avatar, Button, TextField } from '@material-ui/core';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

export default function CroakBox() {
	const [text, setText] = useState('');
	const [image, setImage] = useState('');
	const [post, setPost] = useState({});

	const user = useSelector((state) => state.userSlice.user);
	const token = useSelector((state) => state.userSlice.token);

	const api = 'https://raven-x.herokuapp.com/api/posts';
	//const api = 'http://localhost:5000/api/posts';

	const onSubmit = (e) => {
		e.preventDefault();
		let config = {
			headers: {
				'content-type': 'application/json',
				'auth-token': token,
			},
		};
		console.log(user.name, user.handle, user.avatar);
		axios
			.post(
				api,
				{
					name: user.name,
					handle: user.handle,
					avatar: user.avatar,
					text,
					image,
					timestamp: Date.now(),
				},
				config
			)
			.then((res) => setPost(res.data))
			.catch((err) => console.error(err));
		console.log(post);
	};

	return (
		<div className="croakbox">
			<div className="croakbox__avatar">
				<Avatar src={user.avatar} />
			</div>
			<form onSubmit={onSubmit}>
				<TextField
					placeholder="croak away"
					className="croakbox__input__text"
					onChange={(e) => setText(e.target.value)}
					required
				/>
				<TextField
					className="croakbox__input__img croakbox__input__text"
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
