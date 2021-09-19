import { configureStore } from '@reduxjs/toolkit';

import userSlice from './userSlice';
import postsSlice from './postsSlice';
import conversationSlice from './conversationSlice';

export default configureStore({
	reducer: {
		userSlice: userSlice,
		postsSlice: postsSlice,
		conversationSlice: conversationSlice,
	},
});
