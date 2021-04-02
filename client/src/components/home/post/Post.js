import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeletePost } from '../../../redux/posts';
import './css/post.css';
import { Avatar, IconButton, Typography } from '@material-ui/core';
import {
	ChatBubbleOutline,
	FavoriteBorder,
	Publish,
	Repeat,
	Delete,
} from '@material-ui/icons';
import moment from 'moment';
import axios from 'axios';

export default function Post({ post }) {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.userSlice.user);
	const [creatorName, setCreatorName] = useState('');
	const [creatorAvatar, setCreatorAvatar] = useState('');

	axios
		.get(`https://raven-x.herokuapp.com/api/user/${post.handle}`)
		.then((res) => {
			setCreatorName(res.data.name);
			setCreatorAvatar(res.data.avatar);
		})
		.catch((err) => console.error(err));

	return (
		<div className="post">
			<div className="post__avatar">
				<Avatar src={creatorAvatar} />
			</div>
			<div className="post__body">
				<div className="post__header">
					<div className="post__header__text">
						<div className="post__header__user">
							<Typography variant="h6" className="post__header__name">
								{creatorName}
							</Typography>
							<Typography variant="h6" className="post__header__handle">
								@{post.handle}
							</Typography>
						</div>
						{user.handle === post.handle && (
							<IconButton
								className="post__header__delete"
								onClick={() => DeletePost(dispatch, post._id)}
							>
								<Delete fontSize="small" />
							</IconButton>
						)}
					</div>
					<Typography variant="caption" className="post__header__timestamp">
						{moment(post.timestamp).fromNow()}
					</Typography>
					<Typography variant="body2" className="post__header__description">
						{post.text}
					</Typography>
				</div>
				{post.image && <img src={post.image} alt="" className="post__img" />}
				<div className="post__footer">
					<IconButton>
						<ChatBubbleOutline fontSize="small" />
					</IconButton>
					<IconButton>
						<Repeat fontSize="small" />
					</IconButton>
					<IconButton>
						<FavoriteBorder fontSize="small" />
					</IconButton>
					<IconButton>
						<Publish fontSize="small" />
					</IconButton>
				</div>
			</div>
		</div>
	);
}
