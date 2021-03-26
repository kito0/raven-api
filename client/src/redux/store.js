import { configureStore } from '@reduxjs/toolkit';

import userSlice from './userSlice';
import postsSlice from './postsSlice';

export default configureStore({
	reducer: {
		userSlice: userSlice,
		postsSlice: postsSlice,
	},
});
