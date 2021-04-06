import React, { useEffect, useState } from 'react';
import './css/profile.css';
import Post from '../home/post/Post';
import PostSkeleton from '../home/post/PostSkeleton';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateUser } from '../../redux/user';
import { GetPostsByUser, UpdatePosts } from '../../redux/posts';
import {
	Avatar,
	IconButton,
	Typography,
	TextField,
	Button,
} from '@material-ui/core';

import useInView from 'react-cool-inview';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Edit } from '@material-ui/icons';

export default function Profile() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.userSlice.user);
	const posts = useSelector((state) => state.postsSlice.posts);
	const loading = useSelector((state) => state.postsSlice.loading);
	const updateErrors = useSelector((state) => state.userSlice.updateErrors);

	const [numPosts, setNumPosts] = useState(0);
	const [hasMore, setHasMore] = useState(true);
	const [open, setOpen] = useState(false);
	const [loader, setLoader] = useState(false);
	const [name, setName] = useState(user.name);
	const [avatar, setAvatar] = useState(user.avatar);

	useEffect(() => {
		GetPostsByUser(dispatch, user.handle);
	}, [loader, dispatch, user.handle]);

	const { ref } = useInView({
		onEnter: ({ unobserve, observe }) => {
			unobserve();
			setTimeout(() => {
				loadMore();
			}, 1000);
			observe();
		},
	});
	const loadMore = () => {
		if (posts.length < 10) setHasMore(false);
		if (numPosts > posts.length) setHasMore(false);
		else setNumPosts(numPosts + 10);
	};

	const handleOpen = () => {
		setOpen(!open);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		let nameSubmit = name === undefined || name === '' ? user.name : name;
		let avatarSubmit =
			avatar === undefined || avatar === '' ? user.avatar : avatar;

		UpdateUser(dispatch, user._id, {
			name: nameSubmit,
			handle: user.handle,
			email: user.email,
			avatar: avatarSubmit,
			password: user.password,
		});

		UpdatePosts(user.handle, nameSubmit, avatarSubmit);
		setLoader(!loader);
	};
	return (
		<div className="profile">
			<div className="profile__user">
				<div className="profile__left">
					<Avatar src={user.avatar} className="profile__avatar" />
					<Typography className="profile__name">{user.name}</Typography>
					<div className="profile__handle">
						<Typography>@{user.handle}</Typography>
						<IconButton onClick={handleOpen}>
							<Edit />
						</IconButton>
					</div>
				</div>
				{open && (
					<div className="profile__right">
						<form onSubmit={handleSubmit}>
							<TextField
								placeholder="name"
								className="profile__input"
								value={name || ''}
								onChange={(e) => setName(e.target.value)}
							/>
							<TextField
								placeholder="avatar"
								className="profile__input"
								value={avatar || ''}
								onChange={(e) => setAvatar(e.target.value)}
							/>
							<Button className="profile__button" type="submit">
								Update
							</Button>
							{updateErrors ? (
								<Typography variant="body2" className="profile__errors">
									{updateErrors}
								</Typography>
							) : (
								<br />
							)}
						</form>
					</div>
				)}
			</div>
			<div className="profile__posts">
				{loading && (
					<div>
						<PostSkeleton />
						<PostSkeleton />
						<PostSkeleton />
						<PostSkeleton />
						<PostSkeleton />
						<PostSkeleton />
						<PostSkeleton />
						<PostSkeleton />
						<PostSkeleton />
						<PostSkeleton />
					</div>
				)}
				{posts
					.slice()
					.reverse()
					.slice(0, numPosts)
					.map((post) => (
						<Post post={post} key={post._id} />
					))}
				<div ref={ref} className="profile__posts__loading">
					{hasMore ? (
						<LinearProgress />
					) : (
						<div className="feed__end">No more posts to see :/</div>
					)}
				</div>
			</div>
		</div>
	);
}
