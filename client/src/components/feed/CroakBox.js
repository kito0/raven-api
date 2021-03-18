import React from 'react';
import './css/croakbox.css';
import { Avatar, Button } from '@material-ui/core';

export default function CroakBox() {
	return (
		<div className="croakbox">
			<form>
				<div className="croakbox__input">
					<Avatar src={process.env.PUBLIC_URL + 'avatar.jpg'} />
					<input placeholder="croak away" type="text" />
				</div>
				<input
					className="croakbox__inputimg"
					placeholder="optional: enter img url"
					type="text"
				/>
				<Button className="croakbox__button">Croak</Button>
			</form>
		</div>
	);
}
