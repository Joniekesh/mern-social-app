import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: {
		users: [],
		randomUsers: [],
		user: null,
		isLoading: true,
		error: null,
	},
	reducers: {
		getUserRequest: (state) => {
			state.isLoading = true;
		},
		getUserSuccess: (state, action) => {
			state.isLoading = false;
			state.user = action.payload;
		},
		getUserFailure: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		getRandomUsersRequest: (state) => {
			state.isLoading = true;
		},
		getRandomUsersSuccess: (state, action) => {
			state.isLoading = false;
			state.randomUsers = action.payload;
		},
		getRandomUsersFailure: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		getUsersRequest: (state) => {
			state.isLoading = true;
		},
		getUsersSuccess: (state, action) => {
			state.isLoading = false;
			state.users = action.payload;
		},
		getUsersFailure: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
	},
});

export const {
	getUserRequest,
	getUserSuccess,
	getUserFailure,
	getRandomUsersRequest,
	getRandomUsersSuccess,
	getRandomUsersFailure,
	getUsersRequest,
	getUsersSuccess,
	getUsersFailure,
} = userSlice.actions;
export default userSlice.reducer;
