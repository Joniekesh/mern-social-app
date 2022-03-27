import "./replyItem.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const ReplyItem = () => {
	const [openModal, setOpenModal] = useState(false);

	return (
		<div className="replyListItem">
			<div className="replyTop">
				<div className="replyTopImg">
					<Link to="/profiles/111">
						<img className="replyImg" src="/assets/profile.jpeg" alt="" />
					</Link>
				</div>
				<div className="replyWrapperDiv">
					<div className="replyTopMiddleUserInfoDiv">
						<p className="replyUserName">Okoro John</p>
						<span className="replyUserProfileDesc">
							Full Stack Developer: MERN | Socket.io | Redux | Firebase | Git...
						</span>
						<span className="userRegDate">5 months</span>
					</div>
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
						className="fa-solid fa-ellipsis-vertical replyEllipsis"
						onClick={() => setOpenModal(!openModal)}
					></i>
					<hr className="line" />
					<p className="replyDesc">
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem,
						voluptates aut. Mollitia, quidem laboriosam? Atque exercitationem
						veritatis ut voluptatum officia?
					</p>
				</div>
			</div>
			<div className="replyReactionsDiv">
				<div className="replyplyLikesDiv">
					<span className="replylikeItem">Like</span>
					<Link to="/111/comment/111/reply/111/replyReactedUsers">
						<div className="replylikeCountThumb">
							<span className="replylikesCount">12</span>
							<i className="fa-solid fa-thumbs-up replyThumb"></i>
						</div>
					</Link>
				</div>
				<div className="replyItemDiv">
					<span className="replyItemTitle">Reply</span>
					<span className="replyItemCount">5 Replies</span>
				</div>
				<span className="replytimeCount">2 mins ago</span>
			</div>
		</div>
	);
};

export default ReplyItem;
