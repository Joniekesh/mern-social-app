import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
	name: "post",
	initialState: {
		posts: [],
		timeLinePosts: [],
		clientTimeLinePosts: [],
		post: null,
		isLoading: true,
		error: null,
	},
	reducers: {
		getPostsRequest: (state) => {
			state.isLoading = true;
		},
		getPostsSuccess: (state, action) => {
			state.isLoading = false;
			state.posts = action.payload;
		},
		getPostsFailure: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		getTimeLinePostsRequest: (state) => {
			state.isLoading = true;
		},
		getTimeLinePostsSuccess: (state, action) => {
			state.isLoading = false;
			state.timeLinePosts = action.payload;
		},
		getTimeLinePostsFailure: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		getClientTimeLinePostsRequest: (state) => {
			state.isLoading = true;
		},
		getClientTimeLinePostsSuccess: (state, action) => {
			state.isLoading = false;
			state.clientTimeLinePosts = action.payload;
		},
		getClientTimeLinePostsFailure: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		getPostRequest: (state) => {
			state.isLoading = true;
		},
		getPostSuccess: (state, action) => {
			state.isLoading = false;
			state.post = action.payload;
		},
		getPostFailure: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		createPostRequest: (state) => {
			state.isLoading = true;
		},
		createPostSuccess: (state, action) => {
			state.isLoading = false;
			state.posts.push(action.payload);
		},
		createPostFailure: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		updatePostRequest: (state) => {
			state.isLoading = true;
		},
		updatePostSuccess: (state, action) => {
			state.isLoading = false;
			state.post = action.payload;
		},
		updatePostFailure: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		likeDislikePost: (state, action) => {
			state.post = action.payload;
			// if (!state.post.likes.includes(action.payload)) {
			// 	state.post.likes.push(action.payload);
			// } else {
			// 	state.post.likes.filter((user) => user !== action.payload);
			// }
		},
		deletePostRequest: (state) => {
			state.isLoading = true;
		},
		deletePostSuccess: (state, action) => {
			state.posts.splice(
				state.posts.findIndex((id) => id === action.payload),
				1
			);
		},
		deletePostFailure: (state, action) => {
			state.error = action.payload;
		},
		commentOnPost: (state, action) => {
			state.post.comments.push(action.payload);
		},
		commentUpdate: (state, action) => {
			state.post = action.payload;
		},
		removeComment: (state, action) => {
			state.post.comments.splice(
				state.post.comments.findIndex((_id) => _id === action.payload),
				1
			);
		},
		addRemoveCommentLike: (state, action) => {
			state.post = action.payload;
			// const comment = state.post.comments.find(
			// 	(comment) => comment._id === action.payload.commentId
			// );

			// if (
			// 	comment?.likes.some(
			// 		(like) => like.user === action.payload.commentData.user
			// 	)
			// ) {
			// 	comment.likes.filter(
			// 		(like) => like.user !== action.payload.commentData.user
			// 	);
			// } else {
			// 	comment?.likes.push(action.payload.commentData);
			// }
		},
		createCommentReplyRequest: (state) => {
			state.isLoading = true;
		},
		createCommentReplySuccess: (state, action) => {
			state.isLoading = false;
			state.post.comments.find((comment) =>
				comment._id === action.payload.commentId
					? comment.replies.push(action.payload.replyData)
					: comment
			);
		},
		replyUpdate: (state, action) => {
			state.post = action.payload;
		},
		createCommentReplyFailure: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},

		removeCommentReply: (state, action) => {
			state.post.comments.find((comment) =>
				comment._id === action.payload.commentId
					? comment.replies.filter(
							(reply) => reply._id !== action.payload.replyId
					  )
					: comment
			);
		},
	},
});

export const {
	getPostsRequest,
	getPostsSuccess,
	getPostsFailure,
	getTimeLinePostsRequest,
	getTimeLinePostsSuccess,
	getTimeLinePostsFailure,
	getClientTimeLinePostsRequest,
	getClientTimeLinePostsSuccess,
	getClientTimeLinePostsFailure,
	getPostRequest,
	getPostSuccess,
	getPostFailure,
	createPostRequest,
	createPostSuccess,
	createPostFailure,
	updatePostRequest,
	updatePostSuccess,
	updatePostFailure,
	deletePostRequest,
	deletePostSuccess,
	deletePostFailure,
	commentOnPost,
	commentUpdate,
	likeDislikePost,
	removeComment,
	addRemoveCommentLike,
	createCommentReplyRequest,
	createCommentReplySuccess,
	createCommentReplyFailure,
	replyUpdate,
	removeCommentReply,
} = postSlice.actions;
export default postSlice.reducer;

// export const postReducers = (state = initialState, action) => {
// 	const { type, payload } = action;

// 	switch (type) {
// 		case GET_POSTS:
// 			return {
// 				...state,
// 				posts: payload,
// 				loading: false,
// 			};
// 		case GET_POST:
// 			return {
// 				...state,
// 				post: payload,
// 				loading: false,
// 			};
// 		case ADD_POST:
// 			return {
// 				...state,
// 				posts: [payload, ...state.posts],
// 				loading: false,
// 			};
// 		case UPDATE_POST:
// 			const postToUpdate = state.posts.find((post) => post._id === payload.id);
// 			return {
// 				...state,
// 				post: {
// 					...postToUpdate,
// 					desc: payload.data,
// 				},
// 				loading: false,
// 			};
// 		case ADD_LIKE:
// 			return {
// 				...state,
// 				posts: state.posts.find((post) =>
// 					post._id === payload.id ? { ...post, likes: payload.data } : post
// 				),
// 				loading: false,
// 			};
// 		case DELETE_POST:
// 			return {
// 				...state,
// 				posts: state.posts.filter((post) => post._id !== payload.id),
// 				loading: false,
// 			};
// 		case ADD_COMMENT:
// 			return {
// 				...state,
// 				posts: state.posts.find((post) =>
// 					post._id === payload.id
// 						? { ...post, comments: [...state.post.comments, payload.data] }
// 						: post
// 				),
// 				loading: false,
// 			};
// 		case UPDATE_COMMENT:
// 			const postForCommentUpdate = state.posts.find(
// 				(post) => post._id === payload.postId
// 			);
// 			const commentToUpdate = postForCommentUpdate.comments.find(
// 				(comment) => comment._id === payload.commentId
// 			);
// 			return {
// 				...state,
// 				post: {
// 					...postForCommentUpdate,
// 					comments: [...commentToUpdate, payload.data],
// 				},
// 				loading: false,
// 			};
// 		case DELETE_COMMENT:
// 			const post = state.posts.find((post) => post._id === payload.postId);
// 			return {
// 				...state,
// 				post: {
// 					...post,
// 					comments: post.comments.filter(
// 						(comment) => comment._id !== payload.commentId
// 					),
// 				},
// 				loading: false,
// 			};
// 		case LIKE_COMMENT:
// 			const postForComment = state.posts.find(
// 				(post) => post._id === payload.postId
// 			);
// 			const currentComment = postForComment.comments.find(
// 				(comment) => comment._id === payload.commentId
// 			);
// 			return {
// 				...state,
// 				post: {
// 					...postForComment,
// 					comments: [...currentComment, { likes: payload.data }],
// 				},
// 				loading: false,
// 			};
// 		case ADD_REPLY:
// 			const postForReply = state.posts.find(
// 				(post) => post._id === payload.postId
// 			);
// 			const currentCommentForReply = postForReply.find(
// 				(comment) => comment._id === payload.commentId
// 			);
// 			return {
// 				...state,
// 				post: {
// 					...postForReply,
// 					comments: [...currentCommentForReply, payload.data],
// 				},
// 				loading: false,
// 			};
// 		case UPDATE_REPLY:
// 			const postToEditReply = state.posts.find(
// 				(post) => post._id === payload.postId
// 			);
// 			const commentToEditReply = postToEditReply.comments.find(
// 				(comment) => comment._id === payload.commentId
// 			);
// 			const replyToEdit = commentToEditReply.replies.find(
// 				(reply) => reply._id === payload.replyId
// 			);
// 			return {
// 				...state,
// 				post: {
// 					...postToEditReply,
// 					comments: [...commentToEditReply],
// 					replies: [...replyToEdit, payload.data],
// 				},
// 				loading: false,
// 			};

// 		case LIKE_REPLY:
// 			const postForReplyLike = state.posts.find(
// 				(post) => post._id === payload.postId
// 			);
// 			const commentForReplyLike = postForReplyLike.comments.find(
// 				(comment) => comment._id === payload.commentId
// 			);
// 			const currentReply = commentForReplyLike.replies.find(
// 				(reply) => reply._id === payload.replyId
// 			);

// 			return {
// 				...state,
// 				post: {
// 					...postForReplyLike,
// 					comments: [...commentForReplyLike],
// 					replies: [...currentReply, { likes: payload.data }],
// 				},
// 				loading: false,
// 			};
// 		case DELETE_REPLY:
// 			const postForReplyDelete = state.posts.find(
// 				(post) => post._id === payload.postId
// 			);
// 			const commentForReplyDelete = postForReplyDelete.comments.find(
// 				(comment) => comment._id === payload.commentId
// 			);

// 			return {
// 				...state,
// 				post: {
// 					...postForReplyDelete,
// 					comments: [{ ...commentForReplyDelete }],
// 					replies: commentForReplyDelete.replies.filter(
// 						(reply) => reply._id !== payload.replyId
// 					),
// 				},
// 				loading: false,
// 			};

// 		case POST_ERROR:
// 			return {
// 				...state,
// 				error: payload,
// 				loading: false,
// 				profile: null,
// 			};

// 		default:
// 			return state;
// 	}
// };

// export const timelinePostsReducer = (
// 	state = { posts: [], loading: false, error: null },
// 	action
// ) => {
// 	const { type, payload } = action;

// 	switch (type) {
// 		case TIMELINE_POST_REQUEST:
// 			return {
// 				loading: true,
// 			};
// 		case TIMELINE_POST_SUCCESS:
// 			return {
// 				loading: false,
// 				posts: payload,
// 			};
// 		case TIMELINE_POST_FAIL:
// 			return {
// 				loading: false,
// 				error: payload,
// 			};
// 		default:
// 			return state;
// 	}
// };

// export const timelinePostsByUserIdReducer = (
// 	state = { posts: [], loading: false, error: null },
// 	action
// ) => {
// 	const { type, payload } = action;

// 	switch (type) {
// 		case TIMELINE_POST_REQUEST_BY_USERID:
// 			return {
// 				loading: true,
// 			};
// 		case TIMELINE_POST_SUCCESS_BY_USERID:
// 			return {
// 				loading: false,
// 				posts: payload,
// 			};
// 		case TIMELINE_POST_FAIL_BY_USERID:
// 			return {
// 				loading: false,
// 				error: payload,
// 			};
// 		default:
// 			return state;
// 	}
// };
