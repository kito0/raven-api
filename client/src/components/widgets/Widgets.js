import React from 'react';
import './css/widgets.css';
import { Search } from '@material-ui/icons';

export default function widgets() {
	return (
		<div className="widgets">
			<div className="widgets__input">
				<Search className="widget__search" />
				<input placeholder="Search Raven" type="text" />
			</div>
		</div>
	);
}
