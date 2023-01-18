import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
	name: "profile",
	initialState: {
		currentProfile: null,
		repos: [],
		isLoading: false,
		error: false,
	},
	reducers: {
		getProfileRequest: (state) => {
			state.isLoading = true;
		},
		getProfileSuccess: (state, action) => {
			state.isLoading = false;
			state.currentProfile = action.payload;
		},
		getProfileFailure: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		createProfileRequest: (state) => {
			state.isLoading = true;
		},
		createProfileSuccess: (state, action) => {
			state.isLoading = false;
			state.currentProfile = action.payload;
		},
		createProfileFailure: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		addProfileEducation: (state, action) => {
			state.isLoading = false;
			state.currentProfile = action.payload;
		},
		updateProfileEducation: (state, action) => {
			state.isLoading = false;
			state.currentProfile = action.payload;
		},
		addProfileExperience: (state, action) => {
			state.isLoading = false;
			state.currentProfile = action.payload;
		},
		updateProfileExperience: (state, action) => {
			state.isLoading = false;
			state.currentProfile = action.payload;
		},
		deleteProfileEducation: (state, action) => {
			state.currentProfile = action.payload;
		},
		deleteProfileExperience: (state, action) => {
			state.currentProfile = action.payload;
		},
		getCurrentUserRepoRequest: (state) => {
			state.isLoading = true;
		},
		getCurrentUserRepoSuccess: (state, action) => {
			state.isLoading = false;
			state.repos = action.payload;
		},
		getCurrentUserRepoFailure: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		resetProfile: (state) => {
			state.currentProfile = null;
		},
	},
});

export const {
	getProfileRequest,
	getProfileSuccess,
	getProfileFailure,
	createProfileRequest,
	createProfileSuccess,
	createProfileFailure,
	addProfileEducation,
	updateProfileEducation,
	addProfileExperience,
	updateProfileExperience,
	deleteProfileEducation,
	deleteProfileExperience,
	getCurrentUserRepoRequest,
	getCurrentUserRepoSuccess,
	getCurrentUserRepoFailure,
	resetProfile,
} = profileSlice.actions;

export default profileSlice.reducer;
