import { createSlice } from "@reduxjs/toolkit";

const profilesSlice = createSlice({
	name: "profiles",
	initialState: {
		profiles: [],
		repos: [],
		profile: null,
		isLoading: false,
		error: null,
	},
	reducers: {
		getProfilesRequest: (state) => {
			state.isLoading = true;
		},
		getProfilesSuccess: (state, action) => {
			state.isLoading = false;
			state.profiles = action.payload;
		},
		getProfilesFailure: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		getProfileRequest: (state) => {
			state.isLoading = true;
		},
		getProfileSuccess: (state, action) => {
			state.isLoading = false;
			state.profile = action.payload;
		},
		getProfileFailure: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		getUserReposRequest: (state) => {
			state.isLoading = true;
		},
		getUserReposSuccess: (state, action) => {
			state.isLoading = false;
			state.repos = action.payload;
		},
		getUserReposFailure: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
	},
});

export const {
	getProfilesRequest,
	getProfilesSuccess,
	getProfilesFailure,
	getProfileRequest,
	getProfileSuccess,
	getProfileFailure,
	getUserReposRequest,
	getUserReposSuccess,
	getUserReposFailure,
} = profilesSlice.actions;
export default profilesSlice.reducer;
