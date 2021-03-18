import React from 'react';
import './css/croakbox.css';
import { Avatar, Button, TextField } from '@material-ui/core';

export default function CroakBox() {
	return (
		<div className="croakbox">
			<form>
				<div className="croakbox__input">
					<Avatar
						src={process.env.PUBLIC_URL + 'avatar.jpg'}
						className="croakbox__avatar"
					/>
					<TextField
						placeholder="croak away"
						className="croakbox__input__text"
					/>
				</div>
				<TextField
					className="croakbox__input__img"
					placeholder="optional: enter img url"
					type="text"
				/>
				<Button className="croakbox__button">Croak</Button>
			</form>
		</div>
	);
}
