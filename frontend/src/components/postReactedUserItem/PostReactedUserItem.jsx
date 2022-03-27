import "./postReactedUserItem.css";
import { Link } from "react-router-dom";

const PostReactedUserItem = () => {
	return (
		<div className="postReactedUserItem">
			<div className="postReactedUserInfo">
				<Link to="/profiles/111">
					<div className="singlePostreactionsListItem">
						<img
							className="userReactionImg"
							src="/assets/profile2.jpeg"
							alt=""
						/>
						<i className="fa-solid fa-thumbs-up singlePostThumb"></i>
					</div>
				</Link>
				<Link to="/profiles/111">
					<div className="postReactedUserDesc">
						<p className="postReactedUsername">Okoro John</p>
						<span className="postReactedUserProfileInfo">
							Full Stack Developer: MERN | Socket.io | Redux | Firebase | Git...
						</span>
					</div>
				</Link>
			</div>
			<hr className="line" />
		</div>
	);
};

export default PostReactedUserItem;
