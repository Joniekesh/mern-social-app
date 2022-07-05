import "./replyItem.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { format } from "timeago.js";
import { deleteReply } from "../../redux/actions/postActions";
import { likeReply } from "../../redux/actions/postActions";

const ReplyItem = ({ post, comment, reply }) => {
	const [openModal, setOpenModal] = useState(false);
	const [like, setLike] = useState(reply.likes.length);
	const [isLiked, setIsLiked] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const userLogin = useSelector((state) => state.userLogin);
	const { isAuthenticated, user, loading } = userLogin;

	const currentLikedUser = reply.likes.find((like) => like.user === user._id);

	const newLike = {
		user: user._id,
		name: user.name,
		followers: user.followers,
		followings: user.followings,
		profilePic: user.profilePic,
	};

	useEffect(() => {
		setIsLiked(reply.likes.includes(currentLikedUser));
	}, [reply.likes, currentLikedUser]);

	const handleReplyLike = () => {
		dispatch(likeReply(post._id, comment._id, reply._id, newLike));
		setLike(isLiked ? like - 1 : like + 1);
		setIsLiked(!isLiked);

		window.location.reload();
	};

	const handleReplyEdit = () => {
		navigate(`/editCommentReply/${post._id}/${comment._id}`, {
			state: {
				reply,
			},
		});
	};

	const handleReplyDelete = () => {
		if (isAuthenticated & (user._id === reply.user)) {
			dispatch(deleteReply(post._id, comment._id, reply._id));

			window.location.reload();
		}
	};

	return (
		<div className="replyListItem">
			<div className="replyTop">
				<div className="replyTopImg">
					<Link to={`/profiles/${reply?.user}`}>
						<img className="replyImg" src={reply?.profilePic} alt="" />
					</Link>
				</div>
				<div className="replyWrapperDiv">
					<div className="replyWrapperTopDiv">
						<div className="replyTopMiddleUserInfoDiv">
							<p className="replyUserName">{reply?.name}</p>
							<span className="replyUserProfileDesc">
								Full Stack Developer: MERN | Socket.io | Redux | Firebase |
								Git...
							</span>
							<span className="userRegDate">{format(reply.date)}</span>
						</div>
						{openModal && (
							<div className="postEditDeletePopup">
								<div className="postUpdate" onClick={handleReplyEdit}>
									<i className="fa-solid fa-pen"></i>
									<span>Edit</span>
								</div>
								<hr className="line" />
								<div className="postDelete" onClick={handleReplyDelete}>
									<i className="fa-solid fa-trash-can"></i>
									<span>Delete</span>
								</div>
							</div>
						)}
						{post.user._id === reply.user && (
							<Link to={`/profiles/${reply.user}`}>
								<div className="author">Author</div>
							</Link>
						)}
						{!loading && isAuthenticated && user._id === reply.user && (
							<i
								style={{ color: "teal" }}
								className="fa-solid fa-ellipsis-vertical replyEllipsis"
								onClick={() => setOpenModal(!openModal)}
							></i>
						)}
					</div>
					<hr className="line" />
					<p className="replyDesc">{reply?.desc}</p>
				</div>
			</div>
			<div className="replyReactionsDiv">
				<div className="replyplyLikesDiv">
					<span
						className={isLiked ? "replylikeItem replyLiked" : "replylikeItem"}
						onClick={handleReplyLike}
					>
						Like
					</span>
					<Link
						to={`/posts/${post?._id}/comments/${comment?._id}/replies/${reply?._id}/replyReactedUsers`}
					>
						<div className="replylikeCountThumb">
							<span className="replylikesCount">{reply?.likes.length}</span>
							<i className="fa-solid fa-thumbs-up replyThumb"></i>
						</div>
					</Link>
				</div>
				<div className="replyItemDiv">
					<Link
						to={`/posts/${post._id}/comments/${comment._id}/replies/${reply._id}}}`}
					>
						<span className="replyItemTitle">Reply</span>
					</Link>
					<span className="replyItemCount">{reply.length} Replies</span>
				</div>
				<span className="replytimeCount">{format(reply.date)}</span>
			</div>
		</div>
	);
};

export default ReplyItem;
