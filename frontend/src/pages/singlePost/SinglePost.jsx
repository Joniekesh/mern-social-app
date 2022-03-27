import "./singlePost.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import CommentItem from "../../components/commentItem/CommentItem";
import CommentForm from "../../components/forms/commentForm/CommentForm";

const SinglePost = () => {
	const [openModal, setOpenModal] = useState(false);

	const navigate = useNavigate();

	const userLogin = useSelector((state) => state.userLogin);
	const { isAuthenticated } = userLogin;

	useEffect(() => {
		if (!isAuthenticated) {
			navigate("/login");
		}
	});

	return (
		<div className="singlePost">
			<div className="container">
				<div className="singlePostWrapper">
					<div className="singlePostTop">
						<Link to="/profiles/111">
							<img
								className="singlePostUserImg"
								src="/assets/profile.jpeg"
								alt=""
							/>
						</Link>
						<Link to="/profiles/111">
							<div className="singlePostTopRight">
								<span className="singlePostUsername">Okoro John</span>
								<span className="singlePostUserProfile">
									Full stack developer: MERN | Socket.io | Redux | | Context API
									| Firebase | Git
								</span>
								<span className="singlePostTime">5 days</span>
							</div>
						</Link>
						{openModal && (
							<div className="postEditDeletePopup">
								<div className="postUpdate">
									<i className="fa-solid fa-pen"></i>
									<span>Edit</span>
								</div>
								<hr className="line" />
								<div className="postDelete">
									<i className="fa-solid fa-trash-can"></i>
									<span>Delete</span>
								</div>
							</div>
						)}
						<i
							className="fa-solid fa-ellipsis-vertical ellipsisVert"
							onClick={() => setOpenModal(!openModal)}
						></i>
					</div>

					<hr className="line" />
					<p className="singlePostDesc">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias,
						totam quidem suscipit accusamus ut itaque architecto explicabo
						dignissimos qui repellat recusandae atque nesciunt eaque officia
						modi, optio, libero accusantium? Est, quos expedita? Optio natus
						dolore quis corrupti adipisci, alias dolores consequuntur,
						praesentium est ipsum repudiandae neque porro deserunt ipsam
						dignissimos laboriosam. Quisquam ullam a magni placeat quae nostrum
						animi, nisi expedita nihil vel dignissimos fuga numquam ea, sit
						optio iste tempore. Corrupti eveniet voluptatem possimus magni
						minima ad nostrum aut dolorum accusamus quisquam minus itaque
						laudantium maxime adipisci iste expedita quasi nulla, beatae impedit
						incidunt. Odit nobis atque tempore nemo!
					</p>
					<img className="singlePostImg" src="/assets/companyImg.jpeg" />

					<div className="singlePostReactions">
						<Link to="/111/postReactedUsers">
							<div className="leftReactions">
								<i className="fa-solid fa-thumbs-up thumb"></i>
								<i className="fa-solid fa-heart heart"></i>
								<i className="fa-solid fa-face-laugh laugh"></i>
								<span>26</span>
							</div>
						</Link>
						<span className="singlePostCommentCount">43 Comments</span>
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
