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
		dispatch(setAlert("Registration SUCCESFUL", "success"));
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
		dispatch(setAlert("Login SUCCESSFUL", "success"));
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
		dispatch(setAlert("User update SUCCESSFUL", "success"));
	} catch (err) {
		dispatch({
			type: USER_UPDATE_FAIL,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
		dispatch(setAlert("Error with update", "danger"));
	}
};

// Logout User
export const logout = () => ({
	type: USER_LOGOUT,
});
