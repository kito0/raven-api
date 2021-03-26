import React, { useEffect, useState } from 'react';
import './css/feed.css';
//import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import CroakBox from './CroakBox';
import Post from '../post/Post';
import { GetPosts } from '../../redux/posts';

export default function Feed() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.userSlice.user);
	const posts = useSelector((state) => state.postsSlice.posts);
	const authenticated = useSelector((state) => state.userSlice.authenticated);
	const loading = useSelector((state) => state.postsSlice.loading);

	const api = 'https://raven-x.herokuapp.com/api/posts';
	//const api = 'http://localhost:5000/api/posts';

	// useEffect(() => {
	// 	axios
	// 		.get(api)
	// 		.then((res) => setPosts(res.data))
	// 		.catch((err) => console.error(err));
	// }, [posts]);

	useEffect(() => {
		GetPosts(dispatch);
	}, [loading]);

	return (
		<div className="feed">
			<div className="feed__header">Raven</div>
			{authenticated && <CroakBox />}

			{posts ? (
				posts
					.slice(0)
					.reverse()
					.map((post) => (
						<Post
							name={post.name}
							handle={post.handle}
							avatar={post.avatar}
							text={post.text}
							image={post.image}
						/>
					))
			) : (
				<p>no posts available</p>
			)}
		</div>
	);
}
