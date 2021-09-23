import { createSlice } from '@reduxjs/toolkit';

export const conversationSlice = createSlice({
	name: 'messenger',
	initialState: {
		conversations: [],
		searchedConversations: [],
		current: 0,
		open: true,
		loading: false,
	},
	reducers: {
		setConversations: (state, action) => {
			return {
				...state,
				conversations: [...action.payload],
				loading: false,
			};
		},
		setSearch: (state, action) => {
			return {
				...state,
				searchedConversations: [...action.payload],
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
		loadingConversation: (state) => {
			return {
				...state,
				loading: true,
			};
		},
	},
});

export const { setConversations, setSearch, setCurrent, setOpen } =
	conversationSlice.actions;

export default conversationSlice.reducer;
