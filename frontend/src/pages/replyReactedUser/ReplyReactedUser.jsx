import "./replyReactedUser.css";
import PostReactedUsers from "../postReactedUsers/PostReactedUsers";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPostById } from "../../redux/actions/postActions";
import PostReactedUserItem from "../../components/postReactedUserItem/PostReactedUserItem";

const ReplyReactedUser = () => {
	const location = useLocation();
	const postId = location.pathname.split("/")[2];
	const commentId = location.pathname.split("/")[4];
	const replyId = location.pathname.split("/")[6];
	// console.log(postId);
	// console.log(commentId);
	// console.log(replyId);

	const dispatch = useDispatch();

	const post = useSelector((state) => state.post);
	const { post: currentPost } = post;

	const comment = currentPost.comments.find(
		(comment) => comment._id === commentId
	);

	const reply = comment.replies.find((reply) => reply._id === replyId);

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
						<span>{reply?.likes?.length}</span>
					</div>
					<hr className="line" />
					<div className="commentReactedUsersList">
						{reply?.likes?.map((like) => (
							<PostReactedUserItem like={like} key={like?._id} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ReplyReactedUser;
