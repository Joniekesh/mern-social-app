import "./postReactedUsers.css";
import PostReactedUserItem from "../../components/postReactedUserItem/PostReactedUserItem";

const PostReactedUsers = () => {
	return (
		<div className="postReactedUserItem">
			<div className="container">
				<div className="postReactedUserItemWrapper">
					<div className="totalReactions">
						<span>ALL</span>
						<i className="fa-solid fa-thumbs-up"></i>
						<span>28</span>
					</div>
					<hr className="line" />

					<PostReactedUserItem />
					<PostReactedUserItem />
					<PostReactedUserItem />
					<PostReactedUserItem />
					<PostReactedUserItem />
					<PostReactedUserItem />
					<PostReactedUserItem />
					<PostReactedUserItem />
					<PostReactedUserItem />
					<PostReactedUserItem />
				</div>
			</div>
		</div>
	);
};

export default PostReactedUsers;
