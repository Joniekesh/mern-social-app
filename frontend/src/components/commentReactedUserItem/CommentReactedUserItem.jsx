import "./commentReactedUserItem.css";
import { Link } from "react-router-dom";

const CommentReactedUserItem = ({ like }) => {
	return (
		<div className="postReactedUserItem">
			<div className="postReactedUserInfo">
				<Link to={`/profiles/${like.user}`}>
					<div className="singlePostreactionsListItem">
						<img className="userReactionImg" src={like.profilePic} alt="" />
						<i className="fa-solid fa-thumbs-up singlePostThumb"></i>
					</div>
				</Link>
				<Link to={`/profiles/${like.user}`}>
					<div className="postReactedUserDesc">
						<p className="postReactedUsername">{like.name}</p>
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

export default CommentReactedUserItem;
