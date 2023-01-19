import "./replyItem.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { format } from "timeago.js";
import { deleteReply } from "../../redux/actions/postActions";
import { likeReply } from "../../redux/actions/postActions";
import EditCommentReply from "../../pages/commentReply/EditCommentReply";
import { toast } from "react-toastify";
import { getProfiles } from "../../redux/actions/profilesActions";

const ReplyItem = ({ post, comment, reply }) => {
	const [openModal, setOpenModal] = useState(false);
	const [like, setLike] = useState(reply?.likes?.length);
	const [isLiked, setIsLiked] = useState(false);
	const [isEdit, setIsEdit] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const userInfo = JSON.parse(localStorage.getItem("token"));
	const isAuthenticated = userInfo?.token;

	const auth = useSelector((state) => state.auth);
	const { userInfo: user, isLoading } = auth;

	const profiles = useSelector((state) => state.profiles);
	const { profiles: userProfiles } = profiles;

	const profileExist = userProfiles.some(
		(userProfile) => userProfile?.user._id === reply?.user
	);

	const currentLikedUser = reply?.likes?.find((like) => like.user === user._id);

	const newLike = {
		user: user._id,
		name: user.name,
		followers: user.followers,
		followings: user.followings,
		profilePic: user.profilePic,
	};

	useEffect(() => {
		dispatch(getProfiles());
	}, [dispatch]);

	useEffect(() => {
		setIsLiked(reply?.likes?.includes(currentLikedUser));
	}, [reply.likes, currentLikedUser]);

	const handleReplyLike = () => {
		dispatch(likeReply(post._id, comment._id, reply._id, newLike));
		setLike(isLiked ? like - 1 : like + 1);
		setIsLiked(!isLiked);

		window.location.reload();
	};

	const handleReplyEdit = () => {
		setIsEdit(true);
		setOpenModal(false);
	};

	const handleNavigate = () => {
		if (profileExist) {
			if (reply.user === user._id) {
				navigate("/dashboard");
			} else {
				navigate(`/profiles/${reply.user}`);
			}
		} else {
			toast.error("This user has no profile yet!", { theme: "colored" });
		}
	};

	const handleReplyDelete = () => {
		dispatch(deleteReply(post._id, comment._id, reply._id));
		setOpenModal(false);
	};

	return (
		<div className="replyListItem">
			<div className="replyTop">
				<div
					className="replyTopImg"
					style={{ cursor: "pointer" }}
					onClick={handleNavigate}
				>
					<img className="replyImg" src={reply?.profilePic} alt="" />
				</div>
				<div className="replyWrapperDiv">
					<div className="replyWrapperTopDiv">
						<div className="replyTopMiddleUserInfoDiv">
							<p
								className="replyUserName"
								style={{ cursor: "pointer" }}
								onClick={handleNavigate}
							>
								{reply?.name}
							</p>
							<span className="userRegDate">{format(reply.date)}</span>
						</div>
						{/* {post.user._id === reply.user && (
							<div className="rAuthor">
								<div className="author">Author</div>
							</div>
						)} */}
						<div className="rEllip">
							{!isLoading && isAuthenticated && user._id === reply.user && (
								<i
									style={{ color: "teal" }}
									className="fa-solid fa-ellipsis-vertical replyEllipsis"
									onClick={() => setOpenModal(!openModal)}
								></i>
							)}
						</div>
					</div>
					<hr className="line" style={{ margin: "2px" }} />
					<p className="replyDesc">{reply?.desc}</p>
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
							<span className="replylikesCount">{reply?.likes?.length}</span>
							<i className="fa-solid fa-thumbs-up replyThumb"></i>
						</div>
					</Link>
				</div>

				<span className="replytimeCount">{format(reply.date)}</span>
			</div>
			{isEdit && (
				<EditCommentReply
					postId={post._id}
					commentId={comment._id}
					reply={reply}
					setIsEdit={setIsEdit}
				/>
			)}
		</div>
	);
};

export default ReplyItem;
