import "./singlePost.css";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import CommentItem from "../../components/commentItem/CommentItem";
import CommentForm from "../../components/forms/commentForm/CommentForm";
import { getPostById } from "../../redux/actions/postActions";
import PostItem from "../../components/postItem/PostItem";
import Spinner from "../../components/spinner/Spinner";
import CreatePost from "../createPost/CreatePost";

const SinglePost = ({ setOpenCreatePost, isUpdate, setIsUpdate, socket }) => {
	const { postId } = useParams();
	const dispatch = useDispatch();

	const post = useSelector((state) => state.post);
	const { post: singlePost, isLoading } = post;

	const scrollRef = useRef();
	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
	}, [singlePost?.comments]);

	useEffect(() => {
		dispatch(getPostById(postId));
	}, [dispatch, postId]);

	return (
		<div className="singlePost">
			<div className="container">
				{isLoading ? (
					<Spinner />
				) : (
					<>
						<div className="singlePostWrapper">
							<PostItem
								post={singlePost}
								socket={socket}
								setIsUpdate={setIsUpdate}
							/>
							<p className="singlePostReaction">Reactions</p>
							<div className="reactionsLists">
								{singlePost?.likes?.length > 0 ? (
									singlePost.likes.slice(0, 6).map((like) => (
										<Link
											to={`/posts/${singlePost?._id}/postReactedUsers`}
											key={like?._id}
										>
											<div className="reactionListItem">
												<img
													className="reactionListItemImg"
													src={like?.profilePic}
													alt=""
												/>
												<i className="fa-solid fa-thumbs-up reactionListLike"></i>
											</div>
										</Link>
									))
								) : (
									<h4>No reaction for this post yet</h4>
								)}
							</div>
							<p className="singlePostReaction">Comments</p>

							<div className="commentsLists">
								{singlePost?.comments?.length > 0 ? (
									singlePost.comments.map((comment) => (
										<CommentItem
											comment={comment}
											key={comment._id}
											post={singlePost}
										/>
									))
								) : (
									<h4>No comment for this post yet</h4>
								)}
								<div ref={scrollRef}></div>
							</div>
						</div>
						<CommentForm post={singlePost} socket={socket} />
					</>
				)}
			</div>
			{isUpdate && (
				<CreatePost
					setOpenCreatePost={setOpenCreatePost}
					isUpdate={isUpdate}
					setIsUpdate={setIsUpdate}
					post={singlePost}
				/>
			)}
		</div>
	);
};

export default SinglePost;
