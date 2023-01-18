import "./commentReactedUser.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPostById } from "../../redux/actions/postActions";
import CommentReactedUserItem from "../../components/commentReactedUserItem/CommentReactedUserItem";

const CommentReactedUser = () => {
	const location = useLocation();
	const postId = location.pathname.split("/")[2];
	const commentId = location.pathname.split("/")[4];

	const post = useSelector((state) => state.post);
	const { post: currentPost } = post;

	const currentComment = currentPost.comments.find(
		(comment) => comment._id === commentId
	);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPostById(postId));
	}, [dispatch, postId]);

	return (
		<div className="postReactedUsers">
			<div className="container">
				<div className="postReactedUserItemWrapper">
					<div className="totalReactions">
						<span>ALL</span>
						<i className="fa-solid fa-thumbs-up"></i>
						<span>{currentComment?.likes.length}</span>
					</div>
					<hr className="line" />
					<div className="commentReactedUsersList">
						{currentComment?.likes.map((like) => (
							<CommentReactedUserItem like={like} key={like._id} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CommentReactedUser;
