import axios from "axios";
import { setAlert } from "./alertActions";
import {
	USER_LOADED_FAIL,
	USER_LOADED_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGIN_SUCCESS,
	USER_REGISTER_FAIL,
	USER_REGISTER_SUCCESS,
	USER_LOGOUT,
	USER_UPDATE_SUCCESS,
	USER_UPDATE_FAIL,
	USER_FOLLOW,
	USER_ERROR,
	GET_USERS,
	GET_USER,
} from "../constants/authConstants";

// Get loggedin user
export const loadUser = () => async (dispatch) => {
	try {
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		};
		const res = await axios.get("/auth/me", config);

		dispatch({
			type: USER_LOADED_SUCCESS,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: USER_LOADED_FAIL,
		});
	}
};

// Register user
export const register = (formData) => async (dispatch) => {
	try {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const res = await axios.post("/auth", formData, config);

		dispatch({
			type: USER_REGISTER_SUCCESS,
			payload: res.data,
		});

		dispatch(loadUser());
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
		}

		dispatch({
			type: USER_REGISTER_FAIL,
		});
	}
};

//Login user
export const login = (formData) => async (dispatch) => {
	try {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const res = await axios.post("/auth/login", formData, config);

		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: res.data,
		});

		dispatch(loadUser());
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
		}

		dispatch({
			type: USER_LOGIN_FAIL,
		});
	}
};

// Update user
export const updateUser = (user) => async (dispatch, getState) => {
	const { userLogin } = getState();

	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userLogin.token}`,
		},
	};

	try {
		const { data } = await axios.put("/users/me", user, config);

		dispatch({
			type: USER_UPDATE_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: USER_UPDATE_FAIL,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

// Get Users
export const getUsers = () => async (dispatch, getState) => {
	const { userLogin } = getState();

	const config = {
		headers: {
			"Content-Type": "application/json",
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

// Follow/Unfollow User
export const followUser =
	(userId, followData) => async (dispatch, getState) => {
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
				followData,
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

// Logout User
export const logout = () => ({
	type: USER_LOGOUT,
});
