import React from 'react';
import { Avatar, IconButton, Typography } from '@material-ui/core';
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
				<Avatar src={avatar} />
			</div>
			<div className="post__body">
				<div className="post__header">
					<div className="post__header__text">
						<Typography variant="h6" className="post__header__name">
							{name}
						</Typography>
						<Typography variant="caption" className="post__header__handle">
							{handle}
						</Typography>
					</div>
					<div className="post__header__description">
						<Typography variant="body2">{text}</Typography>
					</div>
				</div>
				<img src={image} alt="" className="post__img" />
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
