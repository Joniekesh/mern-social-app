import "./commentReply.css";
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPostById } from "../../redux/actions/postActions";
// import { getProfileById } from "../../redux/actions/prifileActions";
import ReplyForm from "../../components/forms/replyForm/ReplyForm";
import CommentItem from "../../components/commentItem/CommentItem";
import ReplyItem from "../../components/replieItem/ReplyItem";
import { useRef } from "react";

const CommentReply = () => {
	const scrollRef = useRef();
	const location = useLocation();
	const postId = location.pathname.split("/")[2];
	const commentId = location.pathname.split("/")[4];

	const post = useSelector((state) => state.post);
	const { post: currentPost } = post;

	const comment = currentPost?.comments?.find(
		(comment) => comment._id === commentId
	);

	const profile = useSelector((state) => state.profile);
	const { profile: userProfile } = profile;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPostById(postId));
	}, [dispatch, postId]);

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [comment?.replies]);

	return (
		<div className="commentReply">
			<div className="container">
				<div className="cRWrapper">
					<div className="cRTop">
						<p className="cRTitle">
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
						<CommentItem comment={comment} post={currentPost} />
						<div className="cReplyList">
							{comment?.replies.length > 0 ? (
								comment?.replies.map((reply) => (
									<ReplyItem
										postId={currentPost._id}
										comment={comment}
										reply={reply}
										key={reply._id}
									/>
								))
							) : (
								<div className="cRNull">
									No replies yet for this comment! <br />
									You can add your reply.
								</div>
							)}
						</div>
						<div ref={scrollRef}></div>
					</div>
					<div className="cRbottom">
						<ReplyForm
							postId={postId}
							commentId={commentId}
							profile={userProfile}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CommentReply;
