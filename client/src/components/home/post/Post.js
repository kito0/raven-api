import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeletePost } from '../../../redux/posts';
import { Follow } from '../../../redux/user';
import './css/post.css';
import {
	Avatar,
	Button,
	Collapse,
	IconButton,
	Typography,
} from '@material-ui/core';
import {
	ChatBubbleOutline,
	FavoriteBorder,
	Publish,
	Repeat,
	Delete,
} from '@material-ui/icons';
import moment from 'moment';
import Comment from './comment/Comment';
import CommentForm from './comment/CommentForm';

export default function Post({ post }) {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.userSlice.user);
	const authenticated = useSelector((state) => state.userSlice.authenticated);

	const [expanded, setExpanded] = useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

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
						{user.handle === post.handle ? (
							<IconButton
								className="post__header__delete"
								onClick={() => DeletePost(dispatch, post._id)}
							>
								<Delete fontSize="small" />
							</IconButton>
						) : (
							<Button
								className="post__follow"
								onClick={() => Follow(dispatch, user.handle, post.handle)}
							>
								{authenticated &&
								user.following &&
								user.following.find(({ handle }) => handle === post.handle)
									? 'Following'
									: 'Follow'}
							</Button>
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
					<IconButton onClick={handleExpandClick}>
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
				<Collapse in={expanded} timeout="auto" unmountOnExit>
					<br />
					{post.comments
						? post.comments
								.slice()
								.map((comment) => (
									<Comment comment={comment} key={comment._id} />
								))
						: 'no comments yet'}
					{authenticated && <CommentForm post={post} />}
				</Collapse>
			</div>
		</div>
	);
}
