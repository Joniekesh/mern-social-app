import axios from "axios";
import {
	GET_USER,
	GET_USERS,
	USER_ERROR,
	USER_FOLLOW,
} from "../constants/userConstants";

// Get Users
export const getUsers = () => async (dispatch, getState) => {
	const { userLogin } = getState();

	const config = {
		headers: {
			Authorization: `Bearer ${userLogin.token}`,
		},
	};

	try {
		const { data } = await axios.get("/users", config);
		dispatch({
			type: GET_USERS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: USER_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

// Get User By ID
export const getUserById = (userId) => async (dispatch, getState) => {
	const { userLogin } = getState();

	const config = {
		headers: {
			Authorization: `Bearer ${userLogin.token}`,
		},
	};

	try {
		const { data } = await axios.get(`/users/${userId}`, config);
		dispatch({
			type: GET_USER,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: USER_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

// Follow a User
export const followUser =
	(userId, followerData) => async (dispatch, getState) => {
		const { userLogin } = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userLogin.token}`,
			},
		};

		try {
			const { data } = await axios.put(
				`/users/${userId}/follow`,
				followerData,
				config
			);
			dispatch({
				type: USER_FOLLOW,
				payload: {
					userId,
					data,
				},
			});
		} catch (err) {
			dispatch({
				type: USER_ERROR,
			});
		}
	};

// Unfollow User
export const unFollowUser =
	(userId, followerData) => async (dispatch, getState) => {
		const { userLogin } = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userLogin.token}`,
			},
		};

		try {
			const { data } = await axios.put(
				`/users/${userId}/unfollow`,
				followerData,
				config
			);
			dispatch({
				type: USER_FOLLOW,
				payload: {
					userId,
					data,
				},
			});
		} catch (err) {
			dispatch({
				type: USER_ERROR,
				payload: {
					msg: err.response.statusText,
					status: err.response.status,
				},
			});
		}
	};
