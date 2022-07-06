import "./editCommentReply.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { format } from "timeago.js";
import { upDateReply } from "../../redux/actions/postActions";

const EditCommentReply = () => {
	const [desc, setDesc] = useState("");
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();

	const {
		state: { reply },
	} = useLocation();

	const postId = location.pathname.split("/")[2];
	const commentId = location.pathname.split("/")[3];

	const userLogin = useSelector((state) => state.userLogin);
	const { isAuthenticated, user } = userLogin;

	const replyData = {
		user: user._id,
		name: user.name,
		profilePic: user.profilePic,
		desc,
	};

	const handleUpdate = () => {
		if (isAuthenticated && user._id === reply.user) {
			dispatch(upDateReply(postId, commentId, reply._id, replyData));

			navigate(`/posts/${postId}/comments/${commentId}`);
			window.location.reload();
		}
	};
	const handleCancel = () => {
		navigate(-1);
	};

	return (
		<div className="container">
			<div className="editCommentReply">
				<div className="replyListItem">
					<div className="replyTop">
						<div className="replyTopImg">
							<Link to={`/profiles/${reply?.user}`}>
								<img className="replyImg" src={reply?.profilePic} alt="" />
							</Link>
						</div>
						<div className="replyWrapperDiv">
							<div className="replyWrapperTopDiv">
								<div className="replyTopMiddleUserInfoDiv">
									<p className="replyUserName">{reply?.name}</p>
									<span className="replyUserProfileDesc">
										Full Stack Developer: MERN | Socket.io | Redux | Firebase |
										Git...
									</span>
									<span className="userRegDate">{format(reply.date)}</span>
								</div>
							</div>
							<hr className="line" />
							<textarea
								className="editCommentReplyDesc"
								defaultValue={reply.desc}
								onChange={(e) => setDesc(e.target.value)}
							></textarea>
						</div>
					</div>
				</div>
			</div>
			<div className="commentEditBtnGroup">
				<button className="editCancelBtn" onClick={handleCancel}>
					Cancel
				</button>
				<button className="updatelBtn" onClick={handleUpdate}>
					Update
				</button>
			</div>
		</div>
	);
};

export default EditCommentReply;
