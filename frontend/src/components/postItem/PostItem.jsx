import "./postItem.css";
import { Link } from "react-router-dom";

const PostItem = () => {
	return (
		<div className="homeCenterPostItem">
			<div className="homeCenterTop">
				<div className="topLeft">
					<Link to="/profiles/111">
						<img className="topLeftImg" src="/assets/profile.jpeg" alt="" />
					</Link>
					<Link to="/profiles/111">
						<div className="topLeftUserInfo">
							<h4 className="username">Okoro John</h4>
							<p className="skillsList">
								Full Stack Developer: MERN | Socket.io | Redux | Firebase |
								Git...
							</p>
							<span className="followersCount">20,334 followers</span>
							<span className="time">2 years</span>
						</div>
					</Link>
					<div className="topRight">
						<i className="fa-solid fa-plus"></i>
						<span>Follow</span>
					</div>
				</div>
			</div>
			<hr className="line" />
			<p className="postText">
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis cum
				repellat officia hic ipsa aliquid in asperiores, modi perspiciatis...see
				more.
			</p>
			<Link to="/111">
				<img className="homeCenterPostImg" src="/assets/postImg.jpeg" alt="" />
			</Link>
			<div className="reactionsDiv">
				<Link to="/111">
					<div className="reactions">
						<i className="fa-solid fa-thumbs-up thumb"></i>
						<i className="fa-solid fa-heart heart"></i>
						<i className="fa-solid fa-face-laugh laugh"></i>
						<span>26</span>
					</div>
				</Link>
				<Link to="/111">
					<span className="commentCount">43 Comments</span>
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
		</div>
	);
};

export default PostItem;
