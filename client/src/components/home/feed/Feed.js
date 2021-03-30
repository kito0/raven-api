import React, { useEffect } from 'react';
import './css/feed.css';
import { useDispatch, useSelector } from 'react-redux';
import CroakBox from '../croakbox/CroakBox';
import Post from '../post/Post';
import { GetPosts } from '../../../redux/posts';

export default function Feed() {
	const dispatch = useDispatch();

	const posts = useSelector((state) => state.postsSlice.posts);
	const authenticated = useSelector((state) => state.userSlice.authenticated);
	const loading = useSelector((state) => state.postsSlice.loading);

	useEffect(() => {
		GetPosts(dispatch);
	}, [dispatch, loading]);

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
