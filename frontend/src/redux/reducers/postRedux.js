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
			// state.post = action.payload;
			if (
				!state.post.likes.some(
					(like) => like.user === action.payload.userData?._id
				)
			) {
				state.post.likes.push(action.payload.userData);
			} else {
				state.post.likes.filter(
					(like) => like.user !== action.payload.userData?._id
				);
			}
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
		likeUnlikeReply: (state, action) => {
			const comment = state.post.comments.find(
				(comment) => comment._id === action.payload.commentId
			);

			const reply = comment?.replies.find(
				(reply) => reply._id === action.payload.replyId
			);

			if (
				reply?.likes.some(
					(like) => like.user === action.payload.likeUserData._id
				)
			) {
				reply?.likes.filter(
					(like) => like.user !== action.payload.likeUserData._id
				);
			} else {
				reply?.likes.push(action.payload.likeUserData);
			}
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
	likeUnlikeReply,
} = postSlice.actions;
export default postSlice.reducer;
