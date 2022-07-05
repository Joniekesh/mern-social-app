import {
	GET_POST,
	GET_POSTS,
	POST_ERROR,
	ADD_POST,
	ADD_LIKE,
	UPDATE_POST,
	DELETE_POST,
	ADD_COMMENT,
	DELETE_COMMENT,
	LIKE_COMMENT,
	ADD_REPLY,
	DELETE_REPLY,
	LIKE_REPLY,
	UPDATE_COMMENT,
	UPDATE_REPLY,
	TIMELINE_POST_REQUEST,
	TIMELINE_POST_SUCCESS,
	TIMELINE_POST_FAIL,
	TIMELINE_POST_REQUEST_BY_USERID,
	TIMELINE_POST_SUCCESS_BY_USERID,
	TIMELINE_POST_FAIL_BY_USERID,
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
				loading: false,
			};
		case UPDATE_POST:
			const postToUpdate = state.posts.find((post) => post._id === payload.id);
			return {
				...state,
				post: {
					...postToUpdate,
					desc: payload.data,
				},
				loading: false,
			};
		case ADD_LIKE:
			return {
				...state,
				posts: state.posts.find((post) =>
					post._id === payload.id ? { ...post, likes: payload.data } : post
				),
				loading: false,
			};
		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter((post) => post._id !== payload.id),
				loading: false,
			};
		case ADD_COMMENT:
			return {
				...state,
				posts: state.posts.find((post) =>
					post._id === payload.id
						? { ...post, comments: [...state.post.comments, payload.data] }
						: post
				),
				loading: false,
			};
		case UPDATE_COMMENT:
			const postForCommentUpdate = state.posts.find(
				(post) => post._id === payload.postId
			);
			const commentToUpdate = postForCommentUpdate.comments.find(
				(comment) => comment._id === payload.commentId
			);
			return {
				...state,
				post: {
					...postForCommentUpdate,
					comments: [...commentToUpdate, payload.data],
				},
				loading: false,
			};
		case DELETE_COMMENT:
			const post = state.posts.find((post) => post._id === payload.postId);
			return {
				...state,
				post: {
					...post,
					comments: post.comments.filter(
						(comment) => comment._id !== payload.commentId
					),
				},
				loading: false,
			};
		case LIKE_COMMENT:
			const postForComment = state.posts.find(
				(post) => post._id === payload.postId
			);
			const currentComment = postForComment.comments.find(
				(comment) => comment._id === payload.commentId
			);
			return {
				...state,
				post: {
					...postForComment,
					comments: [...currentComment, { likes: payload.data }],
				},
				loading: false,
			};
		case ADD_REPLY:
			const postForReply = state.posts.find(
				(post) => post._id === payload.postId
			);
			const currentCommentForReply = postForReply.find(
				(comment) => comment._id === payload.commentId
			);
			return {
				...state,
				post: {
					...postForReply,
					comments: [...currentCommentForReply, payload.data],
				},
				loading: false,
			};
		case UPDATE_REPLY:
			const postToEditReply = state.posts.find(
				(post) => post._id === payload.postId
			);
			const commentToEditReply = postToEditReply.comments.find(
				(comment) => comment._id === payload.commentId
			);
			const replyToEdit = commentToEditReply.replies.find(
				(reply) => reply._id === payload.replyId
			);
			return {
				...state,
				post: {
					...postToEditReply,
					comments: [...commentToEditReply],
					replies: [...replyToEdit, payload.data],
				},
				loading: false,
			};

		case LIKE_REPLY:
			const postForReplyLike = state.posts.find(
				(post) => post._id === payload.postId
			);
			const commentForReplyLike = postForReplyLike.comments.find(
				(comment) => comment._id === payload.commentId
			);
			const currentReply = commentForReplyLike.replies.find(
				(reply) => reply._id === payload.replyId
			);

			return {
				...state,
				post: {
					...postForReplyLike,
					comments: [...commentForReplyLike],
					replies: [...currentReply, { likes: payload.data }],
				},
				loading: false,
			};
		case DELETE_REPLY:
			const postForReplyDelete = state.posts.find(
				(post) => post._id === payload.postId
			);
			const commentForReplyDelete = postForReplyDelete.comments.find(
				(comment) => comment._id === payload.commentId
			);

			return {
				...state,
				post: {
					...postForReplyDelete,
					comments: [{ ...commentForReplyDelete }],
					replies: commentForReplyDelete.replies.filter(
						(reply) => reply._id !== payload.replyId
					),
				},
				loading: false,
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

export const timelinePostsReducer = (
	state = { posts: [], loading: false, error: null },
	action
) => {
	const { type, payload } = action;

	switch (type) {
		case TIMELINE_POST_REQUEST:
			return {
				loading: true,
			};
		case TIMELINE_POST_SUCCESS:
			return {
				loading: false,
				posts: payload,
			};
		case TIMELINE_POST_FAIL:
			return {
				loading: false,
				error: payload,
			};
		default:
			return state;
	}
};

export const timelinePostsByUserIdReducer = (
	state = { posts: [], loading: false, error: null },
	action
) => {
	const { type, payload } = action;

	switch (type) {
		case TIMELINE_POST_REQUEST_BY_USERID:
			return {
				loading: true,
			};
		case TIMELINE_POST_SUCCESS_BY_USERID:
			return {
				loading: false,
				posts: payload,
			};
		case TIMELINE_POST_FAIL_BY_USERID:
			return {
				loading: false,
				error: payload,
			};
		default:
			return state;
	}
};
