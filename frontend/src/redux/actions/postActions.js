import axios from "axios";
import { useState } from "react";
import {
	GET_POSTS,
	GET_POST,
	ADD_POST,
	UPDATE_POST,
	POST_ERROR,
	ADD_LIKE,
	DELETE_POST,
	ADD_COMMENT,
	LIKE_COMMENT,
	DELETE_COMMENT,
	ADD_REPLY,
	LIKE_REPLY,
	DELETE_REPLY,
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

// Uddate Post
// Not working yet
export const updatePost = (id, formData) => async (dispatch, getState) => {
	const { userLogin } = useState();

	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userLogin.token}`,
		},
	};

	try {
		const data = await axios.put(`/posts/${id}`, formData, config);

		dispatch({
			type: UPDATE_POST,
			payload: {
				id,
				data,
			},
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

// Get Logged in User's Timeline Posts
export const getTimelinePosts = () => async (dispatch, getState) => {
	const { userLogin } = getState();

	const config = {
		headers: {
			Authorization: `Bearer ${userLogin.token}`,
		},
	};

	try {
		const { data } = await axios.get("/posts/me/timeline", config);
		dispatch({ type: GET_POST, payload: data });
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

// Get User's TimeLine Posts
export const getUserTimeLinePosts = (userId) => async (dispatch, getState) => {
	const { userLogin } = getState();

	const config = {
		headers: {
			Authorization: `Bearer ${userLogin.token}`,
		},
	};

	try {
		const { data } = await axios.get(`/posts/timeline/${userId}`, config);
		dispatch({ type: GET_POST, payload: data });
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

//Delete Post
export const deletePost = (id) => async (dispatch, getState) => {
	const { userLogin } = getState();

	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userLogin.token}`,
		},
	};

	try {
		if (window.confirm("Are You SURE?")) {
			await axios.delete(`/posts/${id}`, config);
			dispatch({
				type: DELETE_POST,
				payload: id,
			});
		}
	} catch (error) {
		dispatch({
			type: POST_ERROR,
		});
	}
};

// Comment on a post
export const addPostComment =
	(id, commentData) => async (dispatch, getState) => {
		const { userLogin } = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userLogin.token}`,
			},
		};

		try {
			const data = await axios.post(
				`/posts/comments/${id}`,
				commentData,
				config
			);
			dispatch({
				type: ADD_COMMENT,
				payload: {
					id,
					data,
				},
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

// Delete Comment
export const deleteComment =
	(postId, commentId) => async (dispatch, getState) => {
		const { userLogin } = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userLogin.token}`,
			},
		};

		try {
			if (window.confirm("Are You SURE?")) {
				await axios.delete(`/posts/comments/${postId}/${commentId}`, config);

				dispatch({
					type: DELETE_COMMENT,
					payload: {
						postId,
						commentId,
					},
				});
			}
		} catch (err) {
			dispatch({
				type: POST_ERROR,
				// payload: {
				// 	msg: err.response.statusText,
				// 	status: err.response.status,
				// },
			});
		}
	};

// Like Comment
export const likeComment =
	(postId, commentId, commentData) => async (dispatch, getState) => {
		const { userLogin } = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userLogin.token}`,
			},
		};

		try {
			const { data } = await axios.put(
				`/posts/comments/likes/${postId}/${commentId}`,
				commentData,
				config
			);

			dispatch({
				type: LIKE_COMMENT,
				payload: {
					postId,
					commentId,
					data,
				},
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

//Add Reply
export const addReply =
	(postId, commentId, replyData) => async (dispatch, getState) => {
		const { userLogin } = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userLogin.token}`,
			},
		};

		try {
			const { data } = await axios.post(
				`/posts/comments/replies/${postId}/${commentId}`,
				replyData,
				config
			);

			dispatch({
				type: ADD_REPLY,
				payload: {
					postId,
					commentId,
					data,
				},
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

// Add Like to Reply
export const likeReply =
	(postId, commentId, replyId, likeUserData) => async (dispatch, getState) => {
		const { userLogin } = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userLogin.token}`,
			},
		};

		try {
			const { data } = await axios.put(
				`/posts/comments/replies/likes/${postId}/${commentId}/${replyId}`,
				likeUserData,
				config
			);

			dispatch({
				type: LIKE_REPLY,
				payload: {
					postId,
					commentId,
					replyId,
					data,
				},
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

// Delete Reply
export const deleteReply =
	(postId, commentId, replyId) => async (dispatch, getState) => {
		const { userLogin } = getState();

		const config = {
			headers: {
				"Content-Type": "appliacation/json",
				Authorization: `Bearer ${userLogin.token}`,
			},
		};

		try {
			if (window.confirm("Are You SURE?")) {
				await axios.delete(
					`/posts/comments/replies/${postId}/${commentId}/${replyId}`,
					config
				);

				dispatch({
					type: DELETE_REPLY,
					payload: {
						postId,
						commentId,
						replyId,
					},
				});
			}
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

// Add Like to Post
export const likePost = (id, userData) => async (dispatch, getState) => {
	const { userLogin } = getState();

	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userLogin.token}`,
		},
	};

	try {
		const { data } = await axios.put(`/posts/likes/${id}`, userData, config);
		dispatch({
			type: ADD_LIKE,
			payload: {
				id,
				data,
			},
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
