import "./commentItem.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const CommentItem = () => {
	const [openModal, setOpenModal] = useState(false);

	return (
		<div className="commentsListItem">
			<Link to="/profiles/111">
				<div className="singleLeftDiv">
					<img
						className="singlePostcommentImg"
						src="/assets/profile2.jpeg"
						alt=""
					/>
				</div>
			</Link>
			<div className="commentDivWrapper">
				<div className="commentsDiv">
					<div className="commentTop">
						<Link to="/profiles/111">
							<div className="commentTopLeft">
								<p className="commentUserName">Okoro John</p>
								<span className="commentUserProfileDesc">
									Full Stack Developer: MERN | Socket.io | Redux | Firebase |
									Git...
								</span>
								<span className="commentTime">1 day</span>
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
							className="fa-solid fa-ellipsis-vertical elipsis"
							onClick={() => setOpenModal(!openModal)}
						></i>
					</div>
					<hr className="line" />
					<div className="commentBottom">
						<p className="commentDesc">
							Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam
							possimus pariatur corporis delectus magnam aspernatur. Nisi rem
							eveniet similique sapiente reprehenderit reiciendis in facilis
							possimus tempora quae praesentium dicta aspernatur rerum,
							distinctio iure exercitationem iste laboriosam facere aliquid non
							porro! Excepturi rem veniam harum minus sapiente illum. Veritatis,
							molestiae quae?{" "}
						</p>
					</div>
				</div>
				<div className="commentReactionsDiv">
					<div className="commentReplyLikesDiv">
						<span className="likeItem">Like</span>
						<Link to="/:111/comment/:111/commentReactedUsers">
							<div className="likeCountThumb">
								<span className="likesCount">12</span>
								<i className="fa-solid fa-thumbs-up likeThumb"></i>
							</div>
						</Link>
					</div>
					<div className="commentReplyDiv">
						<Link to="/:111/comment/:111/replies">
							<span className="replyItem">Reply</span>
						</Link>
						<span className="replyCount">5 Replies</span>
					</div>
					<span className="timeCount">2 mins ago</span>
				</div>
			</div>
		</div>
	);
};

export default CommentItem;
