import "./commentItem.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { format } from "timeago.js";
import { deleteComment, likeComment } from "../../redux/actions/postActions";
import ReplyItem from "../../components/replieItem/ReplyItem";

const CommentItem = ({ post, comment }) => {
	const [openModal, setOpenModal] = useState(false);
	const [like, setLike] = useState(comment?.likes.length);
	const [isLiked, setIsLiked] = useState(false);

	const userLogin = useSelector((state) => state.userLogin);
	const { isAuthenticated, user, loading } = userLogin;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const currentLike = comment?.likes.find((like) => like?.user === user._id);

	useEffect(() => {
		setIsLiked(comment?.likes.includes(currentLike));
	}, [comment?.likes, currentLike]);

	const likeData = {
		user: user._id,
		name: user.name,
		followers: user.follower,
		followings: user.followings,
		profilePic: user.profilePic,
	};

	const handleLike = () => {
		if (isAuthenticated) {
			dispatch(likeComment(post._id, comment._id, likeData));
			setLike(isLiked ? like - 1 : like + 1);
			setIsLiked(!isLiked);

			window.location.reload();
		}
	};

	const deleteHandler = () => {
		if (isAuthenticated && user._id === comment?.user) {
			dispatch(deleteComment(post._id, comment._id));

			window.location.reload();
		}
	};

	const editHandler = () => {
		navigate(`/editComment/${post._id}`, {
			state: {
				comment,
			},
		});
	};

	return (
		<div className="commentsListItem">
			<Link to={`/profiles/${comment?.user}`}>
				<div className="singleLeftDiv">
					<img
						className="singlePostcommentImg"
						src={comment?.profilePic}
						alt=""
					/>
				</div>
			</Link>
			<div className="commentDivWrapper">
				<div className="commentsDiv">
					<div className="commentTop">
						<Link to={`/profiles/${comment?.user}`}>
							<div className="commentTopLeft">
								<p className="commentUserName">{comment?.name}</p>

								<span className="commentTime">{format(comment?.date)}</span>
							</div>
						</Link>
						{openModal && (
							<div className="postEditDeletePopup">
								<div className="postUpdate" onClick={editHandler}>
									<i className="fa-solid fa-pen"></i>
									<span>Edit</span>
								</div>
								<hr className="line" />
								<div className="postDelete" onClick={deleteHandler}>
									<i className="fa-solid fa-trash-can"></i>
									<span>Delete</span>
								</div>
							</div>
						)}
						{post?.user._id === comment?.user && (
							<Link to={`/profiles/${comment?.user}`}>
								<div className="author">Author</div>
							</Link>
						)}
						{!loading && isAuthenticated && user._id === comment?.user && (
							<i
								className="fa-solid fa-ellipsis-vertical elipsis"
								style={{ color: "teal" }}
								onClick={() => setOpenModal(!openModal)}
							></i>
						)}
					</div>
					<hr className="line" />
					<div className="commentBottom">
						<p className="commentDesc">{comment?.desc}</p>
					</div>
				</div>
				<div className="commentReactionsDiv">
					<div className="commentReplyLikesDiv">
						<span
							className={isLiked ? "likeItem liked" : "likeItem"}
							onClick={handleLike}
						>
							Like
						</span>
						<Link
							to={`/posts/${post?._id}/comments/${comment?._id}/commentReactedUsers`}
						>
							<div className="likeCountThumb">
								<span className="likesCount">{comment?.likes.length}</span>
								<i className="fa-solid fa-thumbs-up likeThumb"></i>
							</div>
						</Link>
					</div>
					<div className="commentReplyDiv">
						<Link to={`/posts/${post?._id}/comments/${comment?._id}`}>
							<span className="replyItem">Reply</span>
						</Link>

						<span className="replyCount">
							{comment?.replies.length} Replies
						</span>
					</div>
					<span className="timeCount">{format(comment?.date)}</span>
				</div>
				{comment?.replies.length > 0 && (
					<Link to={`/posts/${post?._id}/comments/${comment?._id}`}>
						<span>Show previous replies...</span>
					</Link>
				)}
				<div className="replyList">
					{comment?.replies.map((reply) => (
						<ReplyItem
							reply={reply}
							key={reply._id}
							post={post}
							comment={comment}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default CommentItem;
