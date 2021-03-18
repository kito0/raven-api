import React from 'react';
import './css/feed.css';
import CroakBox from './CroakBox';
import Post from '../post/Post';

export default function Feed() {
	return (
		<div className="feed">
			<div className="feed__header">header</div>
			<CroakBox />
			<Post />
			<Post image="https://steamuserimages-a.akamaihd.net/ugc/255965188116948531/1055F0B8522D9DDEDC67058CDA090B109D4C4137/" />
			<Post />
			<Post />
			<Post />
			<Post />
			<Post />
		</div>
	);
}
