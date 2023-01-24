import { toast } from "react-toastify";
import { axiosInstance } from "../../utils/config";
import {
	createPostFailure,
	createPostRequest,
	createPostSuccess,
	deletePostRequest,
	deletePostFailure,
	deletePostSuccess,
	getClientTimeLinePostsFailure,
	getClientTimeLinePostsRequest,
	getClientTimeLinePostsSuccess,
	getPostFailure,
	getPostRequest,
	getPostsFailure,
	getPostsRequest,
	getPostsSuccess,
	getPostSuccess,
	getTimeLinePostsFailure,
	getTimeLinePostsRequest,
	getTimeLinePostsSuccess,
	commentOnPost,
	likeDislikePost,
	removeComment,
	addRemoveCommentLike,
	updatePostRequest,
	updatePostSuccess,
	updatePostFailure,
	createCommentReplyRequest,
	createCommentReplySuccess,
	createCommentReplyFailure,
	removeCommentReply,
	commentUpdate,
	replyUpdate,
	likeUnlikeReply,
} from "../reducers/postRedux";

// Get all posts
export const getPosts = () => async (dispatch) => {
	const userInfo = JSON.parse(localStorage.getItem("token"));

	const config = {
		headers: {
			Authorization: `Bearer ${userInfo?.token}`,
		},
	};
	dispatch(getPostsRequest());
	try {
		const { data } = await axiosInstance.get("/posts", config);

		dispatch(getPostsSuccess(data));
	} catch (err) {
		dispatch(getPostsFailure());
	}
};

// Get Post by ID
export const getPostById = (postId) => async (dispatch) => {
	const userInfo = JSON.parse(localStorage.getItem("token"));

	const config = {
		headers: {
			Authorization: `Bearer ${userInfo?.token}`,
		},
	};
	dispatch(getPostRequest());
	try {
		const res = await axiosInstance.get(`/posts/${postId}`, config);

		dispatch(getPostSuccess(res.data));
	} catch (err) {
		dispatch(getPostFailure());
	}
};

// Add post
export const createPost = (postData) => async (dispatch) => {
	const userInfo = JSON.parse(localStorage.getItem("token"));

	const config = {
		headers: {
			Authorization: `Bearer ${userInfo?.token}`,
		},
	};

	dispatch(createPostRequest());
	try {
		const res = await axiosInstance.post("/posts", postData, config);
		if (res.status === 200) {
			dispatch(createPostSuccess(res.data));
			window.location.replace(`/posts/${res.data._id}`);
		}
	} catch (err) {
		dispatch(createPostFailure());
		toast.error(err.response.data, { theme: "colored" });
	}
};

// Like/Dislike Post
export const likePost = (id, userData) => async (dispatch) => {
	const userInfo = JSON.parse(localStorage.getItem("token"));

	const config = {
		headers: {
			Authorization: `Bearer ${userInfo?.token}`,
		},
	};
	try {
		const res = await axiosInstance.put(`/posts/likes/${id}`, userData, config);
		if (res.status === 200) {
			dispatch(likeDislikePost({ payload: { userData: res.data } }));
			dispatch(getPostById(id));
		}
	} catch (err) {
		console.log(err);
	}
};

// Uddate Post
export const updatePost = (id, formData) => async (dispatch) => {
	const userInfo = JSON.parse(localStorage.getItem("token"));

	const config = {
		headers: {
			Authorization: `Bearer ${userInfo?.token}`,
		},
	};
	dispatch(updatePostRequest());
	try {
		const res = await axiosInstance.put(`/posts/${id}`, formData, config);
		if (res.status === 200) {
			dispatch(updatePostSuccess(res.data));
			window.location.replace(`/posts/${res.data._id}`);
		}
	} catch (err) {
		dispatch(updatePostFailure(err.response.data));
		toast.error(err.response.data, { theme: "colored" });
	}
};

// Get Logged in User's Timeline Posts
export const getTimelinePosts = () => async (dispatch) => {
	const userInfo = JSON.parse(localStorage.getItem("token"));

	const config = {
		headers: {
			Authorization: `Bearer ${userInfo?.token}`,
		},
	};
	dispatch(getTimeLinePostsRequest());
	try {
		const { data } = await axiosInstance.get("/posts/me/timeline", config);
		dispatch(getTimeLinePostsSuccess(data));
	} catch (err) {
		dispatch(getTimeLinePostsFailure());
	}
};

// Get User's TimeLine Posts BY USER ID
export const getClientTimeLinePosts = (userId) => async (dispatch) => {
	const userInfo = JSON.parse(localStorage.getItem("token"));

	const config = {
		headers: {
			Authorization: `Bearer ${userInfo?.token}`,
		},
	};

	dispatch(getClientTimeLinePostsRequest());

	try {
		const res = await axiosInstance.get(`/posts/timeline/${userId}`, config);
		if (res.status === 200) {
			dispatch(getClientTimeLinePostsSuccess(res.data));
		}
	} catch (err) {
		dispatch(getClientTimeLinePostsFailure(err.response.data));
	}
};

//Delete Post
export const deletePost = (id) => async (dispatch) => {
	const userInfo = JSON.parse(localStorage.getItem("token"));

	const config = {
		headers: {
			Authorization: `Bearer ${userInfo?.token}`,
		},
	};
	dispatch(deletePostRequest());
	try {
		if (window.confirm("Are You SURE?")) {
			await axiosInstance.delete(`/posts/${id}`, config);
			dispatch(deletePostSuccess());
			toast.success("Post Deleted", { theme: "colored" });
		}
	} catch (err) {
		dispatch(deletePostFailure(err.response.data));
	}
};

// Comment on a post
export const addPostComment = (id, commentData) => async (dispatch) => {
	const userInfo = JSON.parse(localStorage.getItem("token"));

	const config = {
		headers: {
			Authorization: `Bearer ${userInfo?.token}`,
		},
	};

	try {
		const res = await axiosInstance.post(
			`/posts/comments/${id}`,
			commentData,
			config
		);
		if (res.status === 200) {
			dispatch(commentOnPost(res.data));
			toast.success("Comment added.", { theme: "colored" });
		}
	} catch (err) {
		console.log(err);
	}
};

// Update Comment
export const updateComment =
	(postId, commentId, commentData) => async (dispatch) => {
		const userInfo = JSON.parse(localStorage.getItem("token"));

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo?.token}`,
			},
		};

		try {
			const res = await axiosInstance.put(
				`/posts/comments/${postId}/${commentId}`,
				commentData,
				config
			);
			if (res.status === 200) {
				dispatch(dispatch(commentUpdate(res.data)));
				toast.success("Comment updated", { theme: "colored" });
			}
		} catch (err) {
			console.log(err);
		}
	};

// Delete Comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
	const userInfo = JSON.parse(localStorage.getItem("token"));

	const config = {
		headers: {
			Authorization: `Bearer ${userInfo?.token}`,
		},
	};

	try {
		if (window.confirm("Are You SURE?")) {
			const res = await axiosInstance.delete(
				`/posts/comments/${postId}/${commentId}`,
				config
			);
			if (res.status === 200) {
				dispatch(removeComment(res.data._id));
				toast.success("Comment removed.", { theme: "colored" });
			}
		}
	} catch (err) {
		console.log(err);
	}
};

// Like Comment
export const likeComment =
	(postId, commentId, commentData) => async (dispatch) => {
		const userInfo = JSON.parse(localStorage.getItem("token"));

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo?.token}`,
			},
		};

		try {
			const res = await axiosInstance.put(
				`/posts/comments/likes/${postId}/${commentId}`,
				commentData,
				config
			);
			if (res.status === 200) {
				dispatch(addRemoveCommentLike(res.data));
				dispatch(getPostById(postId));
			}
		} catch (err) {
			console.log(err);
		}
	};

//Add Reply
export const addReply = (postId, commentId, replyData) => async (dispatch) => {
	const userInfo = JSON.parse(localStorage.getItem("token"));

	const config = {
		headers: {
			Authorization: `Bearer ${userInfo?.token}`,
		},
	};
	dispatch(createCommentReplyRequest());
	try {
		const res = await axiosInstance.post(
			`/posts/comments/replies/${postId}/${commentId}`,
			replyData,
			config
		);
		if (res.status === 200) {
			toast.success("Reply added.", { theme: "colored" });
			dispatch(getPostById(postId));
			dispatch(
				createCommentReplySuccess({
					payload: { commentId, replyData: res.data },
				})
			);
		}
	} catch (err) {
		dispatch(createCommentReplyFailure());
	}
};

// Update Reply
export const upDateReply =
	(postId, commentId, replyId, replyData) => async (dispatch) => {
		const userInfo = JSON.parse(localStorage.getItem("token"));

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo?.token}`,
			},
		};

		try {
			const res = await axiosInstance.put(
				`/posts/comments/replies/${postId}/${commentId}/${replyId}`,
				replyData,
				config
			);
			if (res.status === 200) {
				dispatch(replyUpdate(res.data));
				toast.success("Reply updated.", { theme: "colored" });
			}
		} catch (err) {
			console.log(err);
		}
	};

// Add Like to Reply
export const likeReply =
	(postId, commentId, replyId, likeUserData) => async (dispatch) => {
		const userInfo = JSON.parse(localStorage.getItem("token"));

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo?.token}`,
			},
		};

		try {
			const res = await axiosInstance.put(
				`/posts/comments/replies/likes/${postId}/${commentId}/${replyId}`,
				likeUserData,
				config
			);
			if (res.status === 200) {
				dispatch(getPostById(postId));
				dispatch(
					likeUnlikeReply({ payload: { commentId, replyId, likeUserData } })
				);
				toast.success("Like added.", { theme: "colored" });
			}
		} catch (err) {
			console.log(err);
		}
	};

// Delete Reply
export const deleteReply = (postId, commentId, replyId) => async (dispatch) => {
	const userInfo = JSON.parse(localStorage.getItem("token"));

	const config = {
		headers: {
			Authorization: `Bearer ${userInfo?.token}`,
		},
	};

	try {
		if (window.confirm("Are You SURE?")) {
			const res = await axiosInstance.delete(
				`/posts/comments/replies/${postId}/${commentId}/${replyId}`,
				config
			);
			if (res.status === 200) {
				dispatch(removeCommentReply({ payload: { commentId, replyId } }));
				dispatch(getPostById(postId));
				toast.success("Reply removed!", { theme: "colored" });
			}
		}
	} catch (err) {
		console.log(err);
	}
};
