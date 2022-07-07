import "./postItem.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { likePost, deletePost } from "../../redux/actions/postActions";
import { getProfileById } from "../../redux/actions/profilesActions";
import { format } from "timeago.js";
import { followUser, unFollowUser } from "../../redux/actions/userActions";
import { toast } from "react-toastify";

const PostItem = ({ post }) => {
	const id = post?.user?._id;
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const userLogin = useSelector((state) => state.userLogin);
	const { isAuthenticated, user: currentUser } = userLogin;

	const profiles = useSelector((state) => state.profiles);
	const { profile: currentProfile } = profiles;

	const follower = post?.user?.followers?.find(
		(follower) => follower.user === currentUser?._id
	);

	const [toggle, setToggle] = useState(false);
	const [like, setLike] = useState(post?.likes?.length);
	const [isLiked, setIsLiked] = useState(false);
	const [isFollowed, setIsFollowed] = useState(
		post?.user?.followers?.includes(follower)
	);

	useEffect(() => {
		setIsFollowed(post?.user.followers?.includes(follower));
	}, [post?.user, follower]);

	useEffect(() => {
		dispatch(getProfileById(id));
	}, [dispatch, id]);

	const currentLike = post?.likes?.find(
		(like) => like.user === currentUser?._id
	);

	useEffect(() => {
		setIsLiked(post?.likes?.includes(currentLike));
	}, [post?.likes, currentLike]);

	const userData = {
		user: currentUser?._id,
		name: currentUser?.name,
		profilePic: currentUser?.profilePic,
		followers: currentUser?.followers,
		followings: currentUser?.followings,
	};

	const handleLikes = () => {
		dispatch(likePost(post?._id, userData));
		setLike(isLiked ? like - 1 : like + 1);
		setIsLiked(!isLiked);

		window.location.reload();
	};

	const handleFollow = () => {
		if (isFollowed) {
			dispatch(unFollowUser(post.user._id, { user: currentUser._id }));
		} else {
			dispatch(followUser(post.user._id, userData));
		}
		setIsFollowed(!isFollowed);
		window.location.reload();
	};

	const handleUpdate = () => {
		navigate("/editPost", {
			state: {
				post,
			},
		});
	};

	const handleDelete = () => {
		if (isAuthenticated && currentUser._id === post.user._id) {
			dispatch(deletePost(post._id));
			toast.success("Post Deleted", { theme: "colored" });

			window.location.reload();
		}
	};

	return (
		<div className="homeCenterPostItem">
			<div className="homeCenterTop">
				<div className="topLeft">
					<div className="userDiv">
						<Link to={`/profiles/${id}`}>
							<img className="topLeftImg" src={post?.user?.profilePic} alt="" />
						</Link>
						<Link to={`/profiles/${id}`}>
							<div className="topLeftUserInfo">
								<h4 className="username">{post?.user?.name}</h4>
								<p className="skillsList">{currentProfile?.headline}</p>
								{post?.user?.followers?.length > 0 && (
									<span className="followersCount">
										<b>
											{post?.user?.followers.length}{" "}
											{post?.user?.followers.length > 1
												? "Followers"
												: "Follower"}
										</b>
									</span>
								)}
								<span className="time">{format(post?.createdAt)}</span>
							</div>
						</Link>
					</div>
					<div className="topRight">
						{post?.user._id !== currentUser?._id && (
							<div className="topRightFollowDiv" onClick={handleFollow}>
								{isFollowed ? (
									<>
										<i className="fa-solid fa-minus"></i>
										<span>Unfollow</span>
									</>
								) : (
									<>
										<i className="fa-solid fa-plus"></i>
										<span>Follow</span>
									</>
								)}
							</div>
						)}
						{isAuthenticated && currentUser?._id === post?.user._id && (
							<i
								class="fa-solid fa-ellipsis-vertical"
								style={{ color: "teal", fontSize: "20px" }}
								onClick={() => setToggle(!toggle)}
							></i>
						)}
					</div>
					{toggle && (
						<div className="deleteUpdateBtns">
							<div className="updateBtns">
								<i className="fa-solid fa-pen" onClick={handleUpdate}></i>
								<span>Edit</span>
							</div>
							<hr className="line" />
							<div className="deleteBtns">
								<i className="fa-solid fa-trash" onClick={handleDelete}></i>
								<span>Delete</span>
							</div>
						</div>
					)}
				</div>
			</div>

			<hr className="line" />
			<p className="postText">{post?.desc}</p>
			<Link to={`/posts/${post?._id}`}>
				<img className="homeCenterPostImg" src={post?.photo} alt="" />
			</Link>
			<div className="reactionsDiv">
				<Link to={`/posts/${post?._id}/postReactedUsers`}>
					<div className="reactions">
						<i className="fa-solid fa-thumbs-up thumb"></i>
						<i className="fa-solid fa-heart heart"></i>
						<i className="fa-solid fa-face-laugh laugh"></i>
						<span>{post?.likes?.length}</span>
					</div>
				</Link>
				<Link to={`/posts/${post?._id}`}>
					<span className="commentCount">
						{post?.comments?.length} Comments
					</span>
				</Link>
			</div>
			<hr className="line" />
			<div className="reactioncontainer">
				<div className="likes">
					<i
						className={
							isLiked
								? "fa-solid fa-thumbs-up showLiked"
								: "fa-solid fa-thumbs-up"
						}
						onClick={handleLikes}
					></i>
					<span>Like</span>
				</div>
				<Link to={`/posts/${post?._id}`}>
					<div className="likes">
						<i className="fa-solid fa-comment"></i>
						<span>Comment</span>
					</div>
				</Link>
				<div className="likes">
					<i className="fa-solid fa-share"></i>
					<span>Share</span>
				</div>
			</div>
			<Link to={`/posts/${post?._id}`}>
				<div className="commentInputContainer">
					<img className="commentImg" src={currentUser?.profilePic} alt="" />
					<div className="commentInput">
						<input
							className="commentInputText"
							type="text"
							placeholder="Add your comment or reaction."
							disabled
						/>
						<i className="fa-solid fa-face-laugh commentInputIcon"></i>
						<i className="fa-solid fa-image"></i>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default PostItem;
