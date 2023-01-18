import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
	name: "auth",
	initialState: {
		userInfo: null,
		isLoading: false,
		error: false,
	},
	reducers: {
		getLoggedInUserRequest: (state) => {
			state.isLoading = true;
		},
		getLoggedInUserSuccess: (state, action) => {
			state.isLoading = false;
			state.userInfo = action.payload;
		},
		getLoggedInUserFail: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		userRegisterRequest: (state) => {
			state.isLoading = true;
		},
		userRegisterSuccess: (state, action) => {
			state.isLoading = false;
			state.userInfo = action.payload;
		},
		userRegisterFail: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		userloginRequest: (state) => {
			state.isLoading = true;
		},
		userloginSuccess: (state, action) => {
			state.userInfo = action.payload;
			state.isLoading = false;
		},
		userloginFail: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		resetUser: (state) => {
			state.userInfo = null;
		},
		userLogout: (state) => {
			state.userInfo = null;
			state.error = null;
			state.isLoading = false;
		},
		updateUserRequest: (state) => {
			state.isLoading = true;
		},
		updateUserSuccess: (state, action) => {
			state.isLoading = false;
			state.userInfo = action.payload;
		},
		updateUserFail: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
	},
});

export const {
	getLoggedInUserRequest,
	getLoggedInUserSuccess,
	getLoggedInUserFail,
	userRegisterRequest,
	userRegisterSuccess,
	userRegisterFail,
	userloginRequest,
	userloginSuccess,
	userloginFail,
	resetUser,
	userLogout,
	updateUserRequest,
	updateUserSuccess,
	updateUserFail,
} = authSlice.actions;

export default authSlice.reducer;
