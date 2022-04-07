import "./postItem.css";
import { Link } from "react-router-dom";

const PostItem = ({ post }) => {
	return (
		<div className="homeCenterPostItem">
			<div className="homeCenterTop">
				<div className="topLeft">
					<div className="userDiv">
						<Link to={`/profile/`}>
							<img className="topLeftImg" src={post?.profilePic} alt="" />
						</Link>
						<Link to={`/profile/${post?.user}`}>
							<div className="topLeftUserInfo">
								<h4 className="username">{post?.name}</h4>
								<p className="skillsList">Profile headline</p>
								<span className="followersCount">20,334 followers</span>
								<span className="time">2 years</span>
							</div>
						</Link>
					</div>
					<div className="topRight">
						<div className="topRightFollowDiv">
							<i className="fa-solid fa-plus"></i>
							<span>Follow</span>
						</div>
						<i class="fa-solid fa-ellipsis-vertical"></i>
					</div>
					<div className="deleteUpdateBtns" style={{ display: "none" }}>
						<div className="updateBtns">
							<i className="fa-solid fa-pen"></i>
							<span>Edit</span>
						</div>
						<div className="updateBtns">
							<i className="fa-solid fa-trash"></i>
							<span>Delete</span>
						</div>
					</div>
				</div>
			</div>
			<hr className="line" />
			<p className="postText">{post?.desc}</p>
			<Link to={`/post/${post?._id}`}>
				<img className="homeCenterPostImg" src={post?.photo} alt="" />
			</Link>
			<div className="reactionsDiv">
				<Link to={`/post/${post?._id}`}>
					<div className="reactions">
						<i className="fa-solid fa-thumbs-up thumb"></i>
						<i className="fa-solid fa-heart heart"></i>
						<i className="fa-solid fa-face-laugh laugh"></i>
						<span>{post?.likes.length}</span>
					</div>
				</Link>
				<Link to={`/post/${post?._id}`}>
					<span className="commentCount">{post?.comments.length} Comments</span>
				</Link>
			</div>
			<hr className="line" />
			<div className="reactioncontainer">
				<div className="likes">
					<i className="fa-solid fa-thumbs-up"></i>
					<span>Like</span>
				</div>
				<div className="likes">
					<i className="fa-solid fa-comment"></i>
					<span>Comment</span>
				</div>
				<div className="likes">
					<i className="fa-solid fa-share"></i>
					<span>Share</span>
				</div>
				<div className="likes">
					<i className="fa-solid fa-paper-plane"></i>
					<span>Send</span>
				</div>
			</div>
			<Link to={`/post/${post?._id}`}>
				<div className="commentInputContainer">
					<img className="commentImg" src="/assets/profile.jpeg" alt="" />
					<div className="commentInput">
						<input
							className="commentInputText"
							type="text"
							placeholder="Add a comment..."
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
