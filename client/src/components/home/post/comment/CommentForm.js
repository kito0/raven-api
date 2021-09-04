import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddComment } from '../../../../redux/posts';
import { Avatar, TextField } from '@material-ui/core';

export default function CommentForm({ post }) {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.userSlice.user);

	const [text, setText] = useState('');

	const onSubmit = (e) => {
		e.preventDefault();

		if (text !== '') {
			AddComment(dispatch, post._id, user.name, user.handle, user.avatar, text);
			setText('');
		}
	};

	return (
		<div className="commentform">
			<div className="commentform__avatar">
				<Avatar src={user.avatar} />
			</div>
			<form onSubmit={onSubmit}>
				<TextField
					placeholder="type a response"
					className="commentform__input"
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
			</form>
		</div>
	);
}
