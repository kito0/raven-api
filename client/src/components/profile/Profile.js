import React, { useEffect, useState } from 'react';
import './css/profile.css';
import Post from '../home/post/Post';
import PostSkeleton from '../home/post/PostSkeleton';
import { useDispatch, useSelector } from 'react-redux';
import { GetUser, UpdateUser } from '../../redux/user';
import { GetPostsByUser } from '../../redux/posts';
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

	const [numPosts, setNumPosts] = useState(0);
	const [hasMore, setHasMore] = useState(true);
	const [showForm, setShowForm] = useState(false);
	const [loader, setLoader] = useState(false);
	const [name, setName] = useState(user.name);
	const [avatar, setAvatar] = useState(user.avatar);

	useEffect(() => {
		GetUser(dispatch, localStorage.getItem('id'));
		GetPostsByUser(dispatch, user.handle);
	}, [loader, dispatch, user.handle]);

	const { ref } = useInView({
		onEnter: ({ unobserve, observe }) => {
			unobserve();
			setTimeout(() => {
				loadMore();
			}, 2000);
			observe();
		},
	});

	const loadMore = () => {
		if (numPosts > posts.length) setHasMore(false);
		else setNumPosts(numPosts + 10);
	};
	const handleShow = () => {
		setShowForm(!showForm);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		let nameSubmit, avatarSubmit;
		if (name === undefined || name === '') nameSubmit = user.name;
		else nameSubmit = name;
		if (avatar === undefined || avatar === '') avatarSubmit = user.avatar;
		else avatarSubmit = avatar;

		UpdateUser(dispatch, user._id, {
			name: nameSubmit,
			handle: user.handle,
			email: user.email,
			avatar: avatarSubmit,
			password: user.password,
		});

		setLoader(!loader);
		setShowForm(false);
	};

	return (
		<div className="profile">
			<div className="profile__user">
				<div className="profile__left">
					<Avatar src={user.avatar} className="profile__avatar" />
					<Typography className="profile__name">{user.name}</Typography>
					<div className="profile__handle">
						<Typography>@{user.handle}</Typography>
						<IconButton onClick={() => handleShow()}>
							<Edit />
						</IconButton>
					</div>
				</div>
				{showForm && (
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
