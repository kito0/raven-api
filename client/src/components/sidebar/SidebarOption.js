import React from 'react';
import { NavLink } from 'react-router-dom';
import './css/sidebaroption.css';

export default function SidebarOption({ text, Icon, refTo }) {
	return (
		<NavLink
			exact
			to={refTo}
			href={refTo}
			className="sidebarOption"
			activeClassName="sidebarOption--active"
		>
			<Icon />
			<h2>{text}</h2>
		</NavLink>
	);
}
