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
				current: action.payload,
			};
		},
		setOpen: (state, action) => {
			return {
				...state,
				open: action.payload,
			};
		},
	},
});

export const { setConversations, setCurrent, setOpen } =
	conversationSlice.actions;

export default conversationSlice.reducer;
