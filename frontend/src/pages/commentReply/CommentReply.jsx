import "./commentReply.css";
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPostById } from "../../redux/actions/postActions";
// import { getProfileById } from "../../redux/actions/prifileActions";
import CommentItem from "../../components/commentItem/CommentItem";
import ReplyForm from "../../components/forms/replyForm/ReplyForm";

const CommentReply = () => {
	const location = useLocation();
	const postId = location.pathname.split("/")[2];
	const commentId = location.pathname.split("/")[4];

	const post = useSelector((state) => state.post);
	const { post: currentPost } = post;

	const comment = currentPost?.comments.find(
		(comment) => comment._id === commentId
	);

	const profile = useSelector((state) => state.profile);
	const { profile: userProfile } = profile;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPostById(postId));
	}, [dispatch, postId]);

	return (
		<div className="commentReply">
			<div className="container">
				<div className="commentReplyWrapper">
					<p className="replyTitle">
						Replies to a comment by{" "}
						<Link style={{ color: "teal" }} to={`/profiles/${comment?.user}`}>
							{comment?.name}
						</Link>{" "}
						on this{" "}
						<Link
							style={{ borderBottom: "2px dotted teal" }}
							to={`/posts/${postId}`}
						>
							post
						</Link>
					</p>
					<div className="replyWrappAll">
						<CommentItem post={currentPost} comment={comment} />
					</div>
					<ReplyForm
						postId={postId}
						commentId={commentId}
						profile={userProfile}
					/>
				</div>
			</div>
		</div>
	);
};

export default CommentReply;
