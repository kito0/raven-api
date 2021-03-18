import React from 'react';
import './css/feed.css';
import CroakBox from './CroakBox';
import Post from '../post/Post';

export default function Feed() {
	return (
		<div className="feed">
			<div className="feed__header">Raven</div>
			<CroakBox />
			<Post
				name="Andrew Shah"
				handle="@andrewshah"
				avatar="https://s2.wp.com/wp-content/themes/premium/collective/images/default-profile.jpg"
				text="sample text"
				image="https://i.pinimg.com/originals/64/46/c3/6446c3c9adf0ed6cf52f4ba61d13f3e6.gif"
			/>
			<Post
				name="Andrew Shah"
				handle="@andrewshah"
				avatar="https://s2.wp.com/wp-content/themes/premium/collective/images/default-profile.jpg"
				text="sample text"
				image="https://cdn.vox-cdn.com/thumbor/EaUuzIdnUGXAs_LokdLgtdrJZCY=/0x0:420x314/1400x1050/filters:focal(136x115:202x181):format(gif)/cdn.vox-cdn.com/uploads/chorus_image/image/55279403/tenor.0.gif"
			/>
			<Post
				name="Andrew Shah"
				handle="@andrewshah"
				avatar="https://s2.wp.com/wp-content/themes/premium/collective/images/default-profile.jpg"
				text="sample text"
				image="https://cdn2.scratch.mit.edu/get_image/gallery/723870_200x130.png?v=1417640727.0"
			/>
			<Post
				name="Andrew Shah"
				handle="@andrewshah"
				avatar="https://s2.wp.com/wp-content/themes/premium/collective/images/default-profile.jpg"
				text="sample text"
				image="https://eanbowman.com/gif/jake_check_it_dude_100_percent_awesome_atude.gif"
			/>
			<Post
				name="Andrew Shah"
				handle="@andrewshah"
				avatar="https://s2.wp.com/wp-content/themes/premium/collective/images/default-profile.jpg"
				text="sample text"
				image="https://i.pinimg.com/originals/64/46/c3/6446c3c9adf0ed6cf52f4ba61d13f3e6.gif"
			/>
			<Post
				name="Andrew Shah"
				handle="@andrewshah"
				avatar="https://s2.wp.com/wp-content/themes/premium/collective/images/default-profile.jpg"
				text="sample text"
				image="https://cdn.vox-cdn.com/thumbor/EaUuzIdnUGXAs_LokdLgtdrJZCY=/0x0:420x314/1400x1050/filters:focal(136x115:202x181):format(gif)/cdn.vox-cdn.com/uploads/chorus_image/image/55279403/tenor.0.gif"
			/>
			<Post
				name="Andrew Shah"
				handle="@andrewshah"
				avatar="https://s2.wp.com/wp-content/themes/premium/collective/images/default-profile.jpg"
				text="sample text"
				image="https://cdn2.scratch.mit.edu/get_image/gallery/723870_200x130.png?v=1417640727.0"
			/>
			<Post
				name="Andrew Shah"
				handle="@andrewshah"
				avatar="https://s2.wp.com/wp-content/themes/premium/collective/images/default-profile.jpg"
				text="sample text"
				image="https://eanbowman.com/gif/jake_check_it_dude_100_percent_awesome_atude.gif"
			/>
		</div>
	);
}
