import React, { useEffect, useState } from 'react';
import './css/feed.css';
import PostBox from '../postbox/PostBox';
import Post from '../post/Post';
import PostSkeleton from '../post/PostSkeleton';
import { useDispatch, useSelector } from 'react-redux';
import { GetPosts } from '../../../redux/posts';
import useInView from 'react-cool-inview';
import LinearProgress from '@material-ui/core/LinearProgress';

export default function Feed() {
	const dispatch = useDispatch();
	const posts = useSelector((state) => state.postsSlice.posts);
	const authenticated = useSelector((state) => state.userSlice.authenticated);
	const loading = useSelector((state) => state.postsSlice.loading);

	const [numPosts, setNumPosts] = useState(10);
	const [hasMore, setHasMore] = useState(true);

	useEffect(() => {
		GetPosts(dispatch);
		// eslint-disable-next-line
	}, []);

	const { ref } = useInView({
		onEnter: ({ unobserve, observe }) => {
			unobserve();
			setTimeout(() => {
				loadMore();
			}, 1000);
			observe();
		},
	});

	function loadMore() {
		if (numPosts > posts.length) setHasMore(false);
		else setNumPosts(numPosts + 10);
	}

	return (
		<div className="feed">
			<div className="feed__header">Raven</div>
			{authenticated && <PostBox />}
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
			<div ref={ref} className="feed__loading">
				{hasMore ? (
					<LinearProgress />
				) : (
					<div className="feed__end">No more posts to see :/</div>
				)}
			</div>
		</div>
	);
}
