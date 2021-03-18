import React from 'react';
import { Avatar } from '@material-ui/core';
import {
	ChatBubbleOutline,
	FavoriteBorder,
	Publish,
	Repeat,
} from '@material-ui/icons';
import './css/post.css';

export default function Post({
	displayName,
	handle,
	timestamp,
	text,
	image,
	avatar,
}) {
	return (
		<div className="post">
			<div className="avatar">
				<Avatar src={process.env.PUBLIC_URL + 'avatar.jpg'} />
			</div>
			<div className="body">
				<div className="header">
					<div className="header__text">
						<h3>
							Andrew Shah {'  '}
							<span className="handle">@andrewshah</span>
						</h3>
					</div>
					<div className="header__description">
						<p>test description</p>
					</div>
				</div>
				<img src={image} alt="" />
				<div className="footer">
					<ChatBubbleOutline fontSize="small" />
					<Repeat fontSize="small" />
					<FavoriteBorder fontSize="small" />
					<Publish fontSize="small" />
				</div>
			</div>
		</div>
	);
}
