import React from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import {
	ChatBubbleOutline,
	FavoriteBorder,
	Publish,
	Repeat,
} from '@material-ui/icons';
import './css/postskeleton.css';

export default function PostSkeleton() {
	return (
		<div className="postskeleton">
			<div className="postskeleton__avatar">
				<Avatar src="https://oes.semel.ucla.edu/wp-content/themes/collective/images/default-profile.jpg" />
			</div>
			<div className="postskeleton__body">
				<div className="postskeleton__header">
					<div className="postskeleton__header__text" />
					<div className="postskeleton__header__timestamp" />
					<div className="postskeleton__header__description" />
				</div>
				<div className="postskeleton__footer">
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
