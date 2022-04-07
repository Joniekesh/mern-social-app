import "./singlePost.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import CommentItem from "../../components/commentItem/CommentItem";
import CommentForm from "../../components/forms/commentForm/CommentForm";
import { getPostById } from "../../redux/actions/postActions";
import PostItem from "../../components/postItem/PostItem";

const SinglePost = () => {
	const { postId } = useParams();
	const dispatch = useDispatch();

	const post = useSelector((state) => state.post);
	const { post: singlePost } = post;

	useEffect(() => {
		dispatch(getPostById(postId));
	}, [dispatch, postId]);

	return (
		<div className="singlePost">
			<div className="container">
				<div className="singlePostWrapper">
					<PostItem post={singlePost} />
					<p className="singlePostReaction">Reactions</p>
					<Link to="/111/postReactedUsers">
						<div className="reactionsLists">
							<div className="reactionListItem">
								<img
									className="reactionListItemImg"
									src="/assets/profile2.jpeg"
									alt=""
								/>
								<i className="fa-solid fa-thumbs-up reactionListLike"></i>
							</div>
							<div className="reactionListItem">
								<img
									className="reactionListItemImg"
									src="/assets/profile2.jpeg"
									alt=""
								/>
								<i className="fa-solid fa-thumbs-up reactionListLike"></i>
							</div>
							<div className="reactionListItem">
								<img
									className="reactionListItemImg"
									src="/assets/profile2.jpeg"
									alt=""
								/>
								<i className="fa-solid fa-thumbs-up reactionListLike"></i>
							</div>
							<div className="reactionListItem">
								<img
									className="reactionListItemImg"
									src="/assets/profile2.jpeg"
									alt=""
								/>
								<i className="fa-solid fa-thumbs-up reactionListLike"></i>
							</div>
						</div>
					</Link>
					<p className="singlePostReaction">Comments</p>

					<div className="commentsLists">
						<CommentItem />
						<CommentItem />
						<CommentItem />
						<CommentItem />
						<CommentItem />
						<CommentItem />
						<CommentItem />
						<CommentItem />
					</div>
				</div>
				<CommentForm />
			</div>
		</div>
	);
};

export default SinglePost;
