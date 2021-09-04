import React, { useState } from 'react';
import { Avatar, Button, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { NewPost } from '../../../redux/posts';

export default function PostBox() {
	const dispatch = useDispatch();
	const loadingUser = useSelector((state) => state.userSlice.loadingUser);

	const [text, setText] = useState('');
	const [image, setImage] = useState('');

	const user = useSelector((state) => state.userSlice.user);

	const onSubmit = (e) => {
		e.preventDefault();

		NewPost(dispatch, {
			name: user.name,
			handle: user.handle,
			avatar: user.avatar,
			text,
			image,
		});

		setText('');
		setImage('');
	};

	return (
		<div className="croakbox">
			<div className="croakbox__avatar">
				{loadingUser ? (
					<Avatar src="https://oes.semel.ucla.edu/wp-content/themes/collective/images/default-profile.jpg" />
				) : (
					<Avatar src={user.avatar} />
				)}
			</div>
			<form onSubmit={onSubmit}>
				<TextField
					placeholder="*something interesting*"
					className="croakbox__input__text"
					value={text}
					onChange={(e) => setText(e.target.value)}
					required
				/>
				<TextField
					className="croakbox__input__img croakbox__input__text"
					placeholder="optional: enter img url"
					value={image}
					onChange={(e) => setImage(e.target.value)}
				/>
				<Button
					className="croakbox__button"
					type="submit"
					disabled={text === ''}
				>
					Post
				</Button>
			</form>
		</div>
	);
}
