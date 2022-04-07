import axios from "axios";
import {
	ADD_POST,
	GET_POST,
	GET_POSTS,
	POST_ERROR,
} from "../constants/postConstants";

// Get all posts
export const getPosts = () => async (dispatch, getState) => {
	const { userLogin } = getState();

	const config = {
		headers: {
			Authorization: `Bearer ${userLogin.token}`,
		},
	};

	try {
		const { data } = await axios.get("/posts", config);

		dispatch({
			type: GET_POSTS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

// Get Post by ID
export const getPostById = (postId) => async (dispatch, getState) => {
	const { userLogin } = getState();

	const config = {
		headers: {
			"Content-Type": "appllication/json",
			Authorization: `Bearer ${userLogin.token}`,
		},
	};

	try {
		const { data } = await axios.get(`/posts/${postId}`, config);

		dispatch({
			type: GET_POST,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

// Add post
export const createPost = (postData) => async (dispatch, getState) => {
	const { userLogin } = getState();

	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userLogin.token}`,
		},
	};

	try {
		const { data } = await axios.post("/posts", postData, config);

		dispatch({
			type: ADD_POST,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};
