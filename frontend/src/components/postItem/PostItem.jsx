import "./postItem.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { likePost, deletePost } from "../../redux/actions/postActions";
import { getProfileById } from "../../redux/actions/prifileActions";
import { format } from "timeago.js";

const PostItem = ({ post }) => {
	const [toggle, setToggle] = useState(false);
	const [like, setLike] = useState(post?.likes?.length);
	const [isLiked, setIsLiked] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const userLogin = useSelector((state) => state.userLogin);
	const { isAuthenticated, user } = userLogin;

	const profile = useSelector((state) => state.profile);
	const { profile: currentProfile } = profile;

	const id = post?.user;

	useEffect(() => {
		dispatch(getProfileById(id));
	}, [dispatch, id]);

	const currentLike = post?.likes?.find((like) => like.user === user._id);

	useEffect(() => {
		setIsLiked(post?.likes?.includes(currentLike));
	}, [post?.likes, currentLike]);

	const userData = {
		name: user.name,
		user,
		profilePic: user.profilePic,
	};

	const handleLikes = () => {
		dispatch(likePost(post?._id, userData));
		setLike(isLiked ? like - 1 : like + 1);
		setIsLiked(!isLiked);

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
		if (isAuthenticated && user._id === post.user) {
			dispatch(deletePost(post._id));
			navigate("/");

			window.location.reload();
		}
	};

	return (
		<div className="homeCenterPostItem">
			<div className="homeCenterTop">
				<div className="topLeft">
					<div className="userDiv">
						<Link to={`/profiles/${post?.user}`}>
							<img className="topLeftImg" src={post?.profilePic} alt="" />
						</Link>
						<Link to={`/profiles/${post?.user}`}>
							<div className="topLeftUserInfo">
								<h4 className="username">{post?.name}</h4>
								<p className="skillsList">{currentProfile?.headline}</p>
								<span className="followersCount">20,334 followers</span>
								<span className="time">{format(post?.createdAt)}</span>
							</div>
						</Link>
					</div>
					<div className="topRight">
						<div className="topRightFollowDiv">
							<i className="fa-solid fa-plus"></i>
							<span>Follow</span>
						</div>
						{isAuthenticated && user?._id === post?.user && (
							<i
								class="fa-solid fa-ellipsis-vertical"
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
					<img className="commentImg" src={user.profilePic} alt="" />
					<div className="commentInput">
						<input
							className="commentInputText"
							type="text"
							placeholder="Add your comment below."
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
