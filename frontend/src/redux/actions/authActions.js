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
} from "../constants/authConstants";

export const loadUser = () => async (dispatch) => {
	try {
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		};
		const res = await axios.get("/api/auth/me", config);

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

export const register = (formData) => async (dispatch) => {
	try {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const res = await axios.post("/api/auth", formData, config);

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

export const login = (formData) => async (dispatch) => {
	try {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const res = await axios.post("/api/auth/login", formData, config);

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

export const logout = () => ({
	type: USER_LOGOUT,
});
