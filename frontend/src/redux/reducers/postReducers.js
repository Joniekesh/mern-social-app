import {
	GET_POST,
	GET_POSTS,
	POST_ERROR,
	ADD_POST,
} from "../constants/postConstants";

const initialState = {
	posts: [],
	post: null,
	loading: true,
	error: {},
};

export const postReducers = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_POSTS:
			return {
				...state,
				posts: payload,
				loading: false,
			};
		case GET_POST:
			return {
				...state,
				post: payload,
				loading: false,
			};
		case ADD_POST:
			return {
				...state,
				posts: [payload, ...state.posts],
			};
		case POST_ERROR:
			return {
				...state,
				error: payload,
				loading: false,
				profile: null,
			};

		default:
			return state;
	}
};
