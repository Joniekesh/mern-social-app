import "./commentItem.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { format } from "timeago.js";
import { deleteComment, likeComment } from "../../redux/actions/postActions";
import ReplyItem from "../../components/replieItem/ReplyItem";
import { getProfiles } from "../../redux/actions/profilesActions";
import { toast } from "react-toastify";
import EditComment from "../../components/commentItem/EditComment";

const CommentItem = ({ post, comment }) => {
	const [openModal, setOpenModal] = useState(false);
	const [like, setLike] = useState(comment?.likes?.length);
	const [isLiked, setIsLiked] = useState(false);
	const [isEdit, setIsEdit] = useState(false);

	const userInfo = JSON.parse(localStorage.getItem("token"));
	const isAuthenticated = userInfo?.token;

	const auth = useSelector((state) => state.auth);
	const { userInfo: user, isLoading } = auth;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const profiles = useSelector((state) => state.profiles);
	const { profiles: userProfiles } = profiles;

	const profileExist = userProfiles.some(
		(userProfile) => userProfile?.user?._id === comment?.user
	);

	useEffect(() => {
		dispatch(getProfiles());
	}, [dispatch]);

	const currentLike = comment?.likes?.find((like) => like?.user === user._id);

	useEffect(() => {
		setIsLiked(comment?.likes?.some((like) => like.user === user?._id));
	}, [comment?.likes, user?._id]);

	const likeData = {
		user: user?._id,
		name: user.name,
		followers: user.follower,
		followings: user.followings,
		profilePic: user.profilePic,
	};

	const handleLike = () => {
		if (isAuthenticated) {
			dispatch(likeComment(post?._id, comment?._id, likeData));
			setLike(isLiked ? like - 1 : like + 1);
			setIsLiked(!isLiked);
		}
	};

	const deleteHandler = () => {
		if (isAuthenticated && user?._id === comment?.user) {
			dispatch(deleteComment(post?._id, comment?._id));
			setOpenModal(false);
			navigate(`/posts/${post?._id}`);
		}
	};

	const editHandler = () => {
		setIsEdit(true);
		setOpenModal(false);
	};

	const handleNavigate = () => {
		if (profileExist) {
			if (comment.user === user?._id) {
				navigate("/dashboard");
			} else {
				navigate(`/profiles/${comment.user}`);
			}
		} else {
			toast.error("This user has no profile yet!", { theme: "colored" });
		}
	};

	return (
		<div className="commentsListItem">
			<div className="singleLeftDiv" onClick={handleNavigate}>
				<img
					className="singlePostcommentImg"
					src={comment?.profilePic}
					alt=""
					style={{ cursor: "pointer" }}
				/>
			</div>
			<div className="commentDivWrapper">
				<div className="commentsDiv">
					<div className="commentTop">
						<div className="commentTopLeft" onClick={handleNavigate}>
							<p className="commentUserName" style={{ cursor: "pointer" }}>
								{comment?.name}
							</p>

							<span className="commentTime">{format(comment?.date)}</span>
						</div>
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
						{post.user._id === comment.user && (
							<div className="author">Author</div>
						)}
						{!isLoading && isAuthenticated && user?._id === comment?.user && (
							<i
								className="fa-solid fa-ellipsis-vertical elipsis"
								style={{ color: "teal" }}
								onClick={() => setOpenModal(!openModal)}
							></i>
						)}
					</div>
					<hr className="line" style={{ margin: "0px" }} />
					<div className="commentBottom">
						<p className="commentDesc" style={{ fontSize: "15px" }}>
							{comment?.desc}
						</p>
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
								<span className="likesCount">{comment?.likes?.length}</span>
								<i className="fa-solid fa-thumbs-up likeThumb"></i>
							</div>
						</Link>
					</div>
					<div className="commentReplyDiv">
						<Link to={`/posts/${post?._id}/comments/${comment?._id}`}>
							<span className="replyItem">Reply</span>
						</Link>

						<span className="replyCount">
							{comment?.replies?.length} Replies
						</span>
					</div>
					<span className="timeCount">{format(comment?.date)}</span>
				</div>
			</div>
			{isEdit && (
				<EditComment
					comment={comment}
					currentPost={post}
					setIsEdit={setIsEdit}
				/>
			)}
		</div>
	);
};

export default CommentItem;
