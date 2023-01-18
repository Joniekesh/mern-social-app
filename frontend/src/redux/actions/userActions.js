import { axiosInstance } from "../../utils/config";
import {
	getRandomUsersFailure,
	getRandomUsersRequest,
	getRandomUsersSuccess,
	getUserFailure,
	getUserRequest,
	getUsersFailure,
	getUsersRequest,
	getUsersSuccess,
	getUserSuccess,
} from "../reducers/userRedux";

// Get Users
export const getUsers = () => async (dispatch) => {
	const userInfo = JSON.parse(localStorage.getItem("token"));

	const config = {
		headers: {
			Authorization: `Bearer ${userInfo?.token}`,
		},
	};
	dispatch(getUsersRequest());
	try {
		const { data } = await axiosInstance.get("/users", config);
		dispatch(getUsersSuccess(data));
	} catch (err) {
		dispatch(getUsersFailure());
	}
};

// Get random users
export const getRandomUsers = () => async (dispatch) => {
	const userInfo = JSON.parse(localStorage.getItem("token"));

	const config = {
		headers: {
			Authorization: `Bearer ${userInfo?.token}`,
		},
	};
	dispatch(getRandomUsersRequest());
	try {
		const { data } = await axiosInstance.get("/users/find/random", config);
		dispatch(getRandomUsersSuccess(data));
	} catch (error) {
		dispatch(getRandomUsersFailure);
	}
};

// Get User By ID
export const getUserById = (userId) => async (dispatch) => {
	const userInfo = JSON.parse(localStorage.getItem("token"));

	const config = {
		headers: {
			Authorization: `Bearer ${userInfo?.token}`,
		},
	};
	dispatch(getUserRequest());

	try {
		const { data } = await axiosInstance.get(`/users/${userId}`, config);
		dispatch(getUserSuccess(data));
	} catch (err) {
		dispatch(getUserFailure());
	}
};

// Follow a User
export const followUser = (userId, followerData) => async (dispatch) => {
	const userInfo = JSON.parse(localStorage.getItem("token"));

	const config = {
		headers: {
			Authorization: `Bearer ${userInfo?.token}`,
		},
	};

	try {
		const { data } = await axiosInstance.put(
			`/users/${userId}/follow`,
			followerData,
			config
		);
		dispatch();
	} catch (err) {
		dispatch();
	}
};

// Unfollow User
export const unFollowUser = (userId, followerData) => async (dispatch) => {
	const userInfo = JSON.parse(localStorage.getItem("token"));

	const config = {
		headers: {
			Authorization: `Bearer ${userInfo?.token}`,
		},
	};
	try {
		const { data } = await axiosInstance.put(
			`/users/${userId}/unfollow`,
			followerData,
			config
		);
		dispatch();
	} catch (err) {
		dispatch();
	}
};
