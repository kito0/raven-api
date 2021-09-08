import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
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
import { LogoutUser } from '../../redux/user';

const web = window.screen.width >= 768;
const drawerWidth = web ? '40vh' : '100vw';
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
		width: '10vh',
		[theme.breakpoints.up('sm')]: {
			width: '10vh',
		},
	},
}));

export default function Sidebar() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const authenticated = useSelector((state) => state.userSlice.authenticated);
	const [open, setOpen] = useState(web ? true : false);

	const location = useLocation();

	useEffect(() => {
		web ? setOpen(true) : setOpen(false);
	}, []);

	const handleLogout = () => {
		if (authenticated) LogoutUser(dispatch);
	};

	useEffect(() => {
		setOpen(false);
	}, [location])

	return (
		<div className={`sidebar ${!open && 'closed'}`}>
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
					{!web ? (
						!open ? (
							<IconButton onClick={() => setOpen(!open)}>
								<Menu />
							</IconButton>
						) : (
							<IconButton onClick={() => setOpen(!open)}>
								<ChevronLeft />
							</IconButton>
						)
					) : (
						<img src={process.env.PUBLIC_URL + '/login.png'} alt="" />
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
				<div className="sidebar__access">
					{open ? (
						authenticated ? (
							<Button
								variant="outlined"
								className="sidebar__button sidebar__button__text"
								fullWidth
								onClick={handleLogout}
							>
								Logout
							</Button>
						) : (
							<div className="sidebar__buttons">
								<Button
									variant="outlined"
									className="sidebar__button sidebar__button__text"
									href="/login"
									fullWidth
								>
									Login
								</Button>
								<Button
									variant="outlined"
									className="sidebar__button sidebar__button__text"
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
				</div>
			</Drawer>
		</div>
	);
}
