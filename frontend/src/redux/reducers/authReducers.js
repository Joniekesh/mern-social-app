import {
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOADED_FAIL,
	USER_LOGOUT,
	USER_LOADED_SUCCESS,
	USER_UPDATE_REQUEST,
	USER_UPDATE_SUCCESS,
	USER_UPDATE_FAIL,
	USER_UPDATE_RESET,
} from "../constants/authConstants";

const initialState = {
	token: localStorage.getItem("token"),
	isAuthenticated: null,
	loading: true,
	user: null,
	users: [],
};

export const userLoginReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case USER_REGISTER_SUCCESS:
		case USER_LOGIN_SUCCESS:
			localStorage.setItem("token", payload.token);
			return {
				...state,
				...payload,
				isAuthenticated: true,
				loading: false,
			};
		case USER_REGISTER_FAIL:
		case USER_LOGIN_FAIL:
		case USER_LOADED_FAIL:
		case USER_LOGOUT:
			localStorage.removeItem("token");
			return {
				...state,
				isAuthenticated: false,
				token: null,
				loading: false,
				user: null,
				users: [],
			};
		case USER_LOADED_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
				user: payload,
				loading: false,
			};

		default:
			return state;
	}
};

export const userUpdateReducer = (
	state = { loading: false, success: false, error: null, user: {} },
	action
) => {
	const { type, payload } = action;

	switch (type) {
		case USER_UPDATE_REQUEST:
			return {
				loading: true,
			};

		case USER_UPDATE_SUCCESS:
			return {
				...state,
				success: true,
				loading: false,
				user: payload,
			};
		case USER_UPDATE_FAIL:
			return {
				loading: false,
				error: payload,
			};
		case USER_UPDATE_RESET:
			return {
				loading: false,
				user: {},
			};
		default:
			return state;
	}
};
