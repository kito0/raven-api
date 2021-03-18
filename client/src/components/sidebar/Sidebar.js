import React from 'react';
import './css/Sidebar.css';
import { Button } from '@material-ui/core';
import {
	Home,
	Search,
	NotificationsNone,
	MailOutline,
	BookmarkBorder,
	ListAlt,
	PermIdentity,
	MoreHoriz,
} from '@material-ui/icons';
import SidebarOption from './SidebarOption';

export default function Sidebar() {
	return (
		<div className="sidebar">
			<div className="sidebar__title">
				<img
					src={process.env.PUBLIC_URL + '/raven.svg'}
					className="logo"
					alt="Raven"
				/>
				{/* <h2 className="title">Raven</h2> */}
			</div>
			<div className="sidebar__options">
				<SidebarOption active Icon={Home} text="Home" />
				<SidebarOption Icon={Search} text="Explore" />
				<SidebarOption Icon={NotificationsNone} text="Notifications" />
				<SidebarOption Icon={MailOutline} text="Messages" />
				<SidebarOption Icon={BookmarkBorder} text="Bookmarks" />
				<SidebarOption Icon={ListAlt} text="Lists" />
				<SidebarOption Icon={PermIdentity} text="Profile" />
				<SidebarOption Icon={MoreHoriz} text="More" />
			</div>
			<Button variant="outlined" className="sidebar__post" fullWidth>
				Croak
			</Button>
		</div>
	);
}
