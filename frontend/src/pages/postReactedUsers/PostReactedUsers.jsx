import "./postReactedUsers.css";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostReactedUserItem from "../../components/postReactedUserItem/PostReactedUserItem";
import { getPostById } from "../../redux/actions/postActions";

const PostReactedUsers = () => {
	const location = useLocation();
	const postId = location.pathname.split("/")[2];

	const dispatch = useDispatch();

	const post = useSelector((state) => state.post);
	const { post: currentPost } = post;

	useEffect(() => {
		dispatch(getPostById(postId));
	}, [dispatch, postId]);

	return (
		<div className="postReactedUsers">
			<div className="container">
				<div className="postReactedUserItemWrapper">
					<div className="totalReactions">
						<span>ALL</span>
						<i className="fa-solid fa-thumbs-up"></i>
						<span>{currentPost?.likes?.length}</span>
					</div>
					<hr className="line" />
					<div className="commentReactedUsersList">
						{currentPost?.likes?.map((like) => (
							<PostReactedUserItem like={like} key={like._id} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostReactedUsers;
