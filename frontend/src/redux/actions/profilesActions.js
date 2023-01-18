import { axiosInstance } from "../../utils/config";
import {
	getProfileRequest,
	getProfileSuccess,
	getProfileFailure,
	getProfilesFailure,
	getProfilesRequest,
	getProfilesSuccess,
	getUserReposRequest,
	getUserReposSuccess,
	getUserReposFailure,
} from "../reducers/profilesRedux";

// Get all profiles
export const getProfiles = () => async (dispatch) => {
	const userInfo = JSON.parse(localStorage.getItem("token"));

	const config = {
		headers: {
			Authorization: `Bearer ${userInfo?.token}`,
		},
	};
	dispatch(getProfilesRequest());
	try {
		const { data } = await axiosInstance.get("/profiles", config);

		dispatch(getProfilesSuccess(data));
	} catch (err) {
		dispatch(getProfilesFailure());
	}
};

// Get profile by user ID
export const getProfileById = (id) => async (dispatch) => {
	const userInfo = JSON.parse(localStorage.getItem("token"));

	const config = {
		headers: {
			Authorization: `Bearer ${userInfo?.token}`,
		},
	};
	dispatch(getProfileRequest());
	try {
		const { data } = await axiosInstance.get(`/profiles/user/${id}`, config);

		dispatch(getProfileSuccess(data));
	} catch (err) {
		dispatch(getProfileFailure());
	}
};

// Get User Github Repositories
export const getUserGitRepos = (username) => async (dispatch) => {
	const userInfo = JSON.parse(localStorage.getItem("token"));

	const config = {
		headers: {
			Authorization: `Bearer ${userInfo?.token}`,
		},
	};
	dispatch(getUserReposRequest());
	try {
		const res = await axiosInstance.get(`/profiles/github/${username}`, config);
		if (res.status === 200) {
			dispatch(getUserReposSuccess(res.data));
		}
	} catch (err) {
		dispatch(getUserReposFailure(err.response.data));
	}
};
