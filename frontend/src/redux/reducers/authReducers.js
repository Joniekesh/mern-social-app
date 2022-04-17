import {
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOADED_FAIL,
	USER_LOGOUT,
	USER_LOADED_SUCCESS,
	USER_UPDATE_SUCCESS,
	USER_UPDATE_FAIL,
	GET_USERS,
	GET_USER,
	USER_FOLLOW,
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
			};
		case USER_LOADED_SUCCESS:
		case GET_USER:
			return {
				...state,
				isAuthenticated: true,
				user: payload,
				loading: false,
			};
		case USER_UPDATE_FAIL:
			return {
				...state,
				loading: false,
				user: payload,
			};
		case GET_USERS:
			return {
				...state,
				users: payload,
				loading: false,
			};
		case USER_FOLLOW:
			return {};

		default:
			return state;
	}
};
