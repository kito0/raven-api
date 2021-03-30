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
	ExitToApp,
} from '@material-ui/icons';
import SidebarOption from './SidebarOption';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { LogoutUser } from '../../redux/user';

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
	const dispatch = useDispatch();

	const [open, setOpen] = useState(window.screen.width >= 768 ? true : false);

	const authenticated = useSelector((state) => state.userSlice.authenticated);

	useEffect(() => {
		window.screen.width >= 768 ? setOpen(true) : setOpen(false);
	}, []);

	const handleDrawerOpen = () => {
		setOpen(true);
	};
	const handleDrawerClose = () => {
		setOpen(false);
	};

	const handleLogout = () => {
		if (authenticated) LogoutUser(dispatch);
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
					<SidebarOption Icon={Home} text="Home" refTo="/" />
					<SidebarOption Icon={Search} text="Explore" refTo="/explore" />
					<SidebarOption
						Icon={NotificationsNone}
						text="Notifications"
						refTo="/notifications"
					/>
					<SidebarOption Icon={MailOutline} text="Messages" refTo="/messages" />
					<SidebarOption
						Icon={BookmarkBorder}
						text="Bookmarks"
						refTo="/bookmarks"
					/>
					<SidebarOption Icon={ListAlt} text="Lists" refTo="/lists" />
					<SidebarOption Icon={PermIdentity} text="Profile" refTo="/profile" />
					<SidebarOption Icon={MoreHoriz} text="More" refTo="/more" />
				</div>

				{open ? (
					authenticated ? (
						<Button
							variant="outlined"
							className="sidebar__button"
							fullWidth
							onClick={handleLogout}
						>
							Logout
						</Button>
					) : (
						<div className="sidebar__buttons">
							<Button
								variant="outlined"
								className="sidebar__button"
								href="/login"
								fullWidth
							>
								Login
							</Button>
							<Button
								variant="outlined"
								className="sidebar__button"
								href="/signup"
								fullWidth
							>
								Signup
							</Button>
						</div>
					)
				) : authenticated ? (
					<IconButton className="sidebar__button" onClick={handleLogout}>
						<ExitToApp />
					</IconButton>
				) : (
					<div className="sidebar__buttons">
						<IconButton className="sidebar__button" href="/login">
							<ExitToApp />
						</IconButton>
						<IconButton className="sidebar__button" href="/signup">
							<ExitToApp />
						</IconButton>
					</div>
				)}
			</Drawer>
		</div>
	);
}
