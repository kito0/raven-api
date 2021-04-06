import React from 'react';
import { useSelector } from 'react-redux';
import './css/comment.css';
import { Avatar, IconButton, Typography } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import moment from 'moment';

export default function Comment({ comment }) {
	const user = useSelector((state) => state.userSlice.user);

	return (
		<div className="comment">
			<div className="comment__avatar">
				<Avatar src={comment.avatar} />
			</div>
			<div className="comment__body">
				<div className="comment__header">
					<div className="comment__user">
						<Typography variant="h6" className="comment__name">
							{comment.name}
						</Typography>
						<Typography variant="h6" className="comment__handle">
							@{comment.handle}
						</Typography>
					</div>
					{user.handle === comment.handle && (
						<IconButton className="comment__delete">
							<Delete fontSize="small" />
						</IconButton>
					)}
				</div>
				<Typography variant="caption" className="comment__timestamp">
					{moment(comment.timestamp).fromNow()}
				</Typography>
				<Typography variant="body2" className="comment__text">
					{comment.text}
				</Typography>
			</div>
		</div>
	);
}
