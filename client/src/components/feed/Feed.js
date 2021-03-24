import React, { useEffect, useState } from 'react';
import './css/feed.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import CroakBox from './CroakBox';
import Post from '../post/Post';

export default function Feed() {
	const [posts, setPosts] = useState([]);
	const dispatch = useDispatch();
	const user = useSelector((state) => state.userSlice.user);
	const authenticated = useSelector((state) => state.userSlice.authenticated);

	const api = 'https://raven-x.herokuapp.com/api/posts';
	//const api = 'http://localhost:5000/api/posts';

	useEffect(() => {
		axios
			.get(api)
			.then((res) => setPosts(res.data))
			.catch((err) => console.error(err));
	}, [posts]);

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
