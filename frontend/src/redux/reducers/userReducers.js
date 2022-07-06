import {
	GET_RANDOM_USER_FAIL,
	GET_RANDOM_USER_REQUEST,
	GET_RANDOM_USER_SUCCESS,
	// GET_FRIENDS_REQUEST,
	// GET_FRIENDS_FAIL,
	// GET_FRIENDS_SUCCESS,
	GET_USER,
	GET_USERS,
	USER_FOLLOW,
	USER_UNFOLLOW,
} from "../constants/userConstants";

const initialState = {
	users: [],
	user: null,
	loading: true,
};

export const userReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_USERS:
			return {
				...state,
				users: payload,
				loading: false,
			};
		case GET_USER:
		case USER_FOLLOW:
		case USER_UNFOLLOW:
			return {
				...state,
				user: payload,
				loading: false,
			};

		default:
			return state;
	}
};

export const randomUsersReducer = (
	state = { users: [], loading: false, error: null },
	action
) => {
	const { type, payload } = action;

	switch (type) {
		case GET_RANDOM_USER_REQUEST:
			return {
				loading: true,
			};
		case GET_RANDOM_USER_SUCCESS:
			return {
				loading: false,
				users: payload,
			};
		case GET_RANDOM_USER_FAIL:
			return {
				loading: false,
				error: payload,
			};
		default:
			return state;
	}
};
