import {
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOADED_FAIL,
	USER_LOGOUT,
	USER_LOADED_SUCCESS,
} from "../constants/authConstants";

const initialState = {
	token: localStorage.getItem("token"),
	isAuthenticated: null,
	loading: true,
	user: null,
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
