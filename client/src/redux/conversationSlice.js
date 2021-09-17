import { createSlice } from '@reduxjs/toolkit';

export const conversationSlice = createSlice({
	name: 'messenger',
	initialState: {
		conversations: [],
		current: 0,
		open: true,
	},
	reducers: {
		setConversations: (state, action) => {
			return {
				...state,
				conversations: [...action.payload],
			};
		},
		setCurrent: (state, action) => {
			return {
				...state,
				current: action,
			};
		},
		setOpen: (state, action) => {
			return {
				...state,
				open: action,
			};
		},
	},
});

export const { setConversations, setCurrent, setOpen } =
	conversationSlice.actions;

export default conversationSlice.reducer;
