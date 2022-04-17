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
		case UPDATE_POST:
			return {
				...state,
				posts: state.posts.find((post) =>
					post._id === payload.id ? { ...post, payload } : post
				),
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
