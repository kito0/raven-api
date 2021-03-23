import React, { useState, useEffect } from 'react';
import './css/Sidebar.css';
import { Button, Drawer, IconButton, makeStyles } from '@material-ui/core';
import {
	Home,
	Search,
	Menu,
	NotificationsNone,
	MailOutline,
	BookmarkBorder,
	ListAlt,
	PermIdentity,
	MoreHoriz,
	ChevronLeft,
	PostAdd,
} from '@material-ui/icons';
import SidebarOption from './SidebarOption';
import clsx from 'clsx';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: 'hidden',
		width: theme.spacing(7) + 1,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(7) + 1,
		},
	},
}));

export default function Sidebar() {
	const classes = useStyles();
	const [open, setOpen] = useState();

	useEffect(() => {
		window.screen.width >= 768 ? setOpen(true) : setOpen(false);
	}, []);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<div className="sidebar">
			<Drawer
				variant="permanent"
				className={clsx(classes.drawer, {
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open,
				})}
				classes={{
					paper: clsx({
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
					}),
				}}
			>
				<div className="sidebar__drawer">
					{!open ? (
						<IconButton onClick={handleDrawerOpen}>
							<Menu />
						</IconButton>
					) : (
						<IconButton onClick={handleDrawerClose}>
							<ChevronLeft />
						</IconButton>
					)}
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
				{open ? (
					<Button variant="outlined" className="sidebar__post" fullWidth>
						Croak
					</Button>
				) : (
					<IconButton className="sidebar__post" fullWidth>
						<PostAdd />
					</IconButton>
				)}
			</Drawer>
		</div>
	);
}
