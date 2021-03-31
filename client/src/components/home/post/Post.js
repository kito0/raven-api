import React from 'react';
import { Avatar, IconButton, Typography } from '@material-ui/core';
import {
	ChatBubbleOutline,
	FavoriteBorder,
	Publish,
	Repeat,
	Delete,
} from '@material-ui/icons';
import './css/post.css';

import { useDispatch, useSelector } from 'react-redux';
import { DeletePost } from '../../../redux/posts';

export default function Post({ post }) {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.userSlice.user);

	return (
		<div className="post">
			<div className="post__avatar">
				<Avatar src={post.avatar} />
			</div>
			<div className="post__body">
				<div className="post__header">
					<div className="post__header__text">
						<div className="post__header__user">
							<Typography variant="h6" className="post__header__name">
								{post.name}
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
						{post.timestamp.substring(0, 10)}
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
