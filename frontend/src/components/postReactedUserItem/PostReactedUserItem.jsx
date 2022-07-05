import "./postReactedUserItem.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const PostReactedUserItem = ({ like }) => {
	const profiles = useSelector((state) => state.profiles);
	const { profile } = profiles;

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
							{profile?.headline}
						</span>
					</div>
				</Link>
			</div>
			<hr className="line" />
		</div>
	);
};

export default PostReactedUserItem;
