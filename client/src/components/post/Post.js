import React from 'react';
import { Avatar, Typography } from '@material-ui/core';
import {
	ChatBubbleOutline,
	FavoriteBorder,
	Publish,
	Repeat,
} from '@material-ui/icons';
import './css/post.css';

export default function Post({ name, handle, avatar, text, image, timestamp }) {
	return (
		<div className="post">
			<div className="post__avatar">
				<Avatar src={process.env.PUBLIC_URL + 'avatar.jpg'} />
			</div>
			<div className="post__body">
				<div className="post__header">
					<div className="post__header__text">
						<Typography variant="h6" className="post__header__name">
							Andrew Shah
						</Typography>
						<Typography variant="caption" className="post__header__handle">
							@andrewshah
						</Typography>
					</div>
					<div className="post__header__description">
						<Typography variant="body2">test description</Typography>
					</div>
				</div>
				<img src={image} alt="" />
				<div className="post__footer">
					<ChatBubbleOutline fontSize="small" />
					<Repeat fontSize="small" />
					<FavoriteBorder fontSize="small" />
					<Publish fontSize="small" />
				</div>
			</div>
		</div>
	);
}
