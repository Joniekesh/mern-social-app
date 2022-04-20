import {
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
