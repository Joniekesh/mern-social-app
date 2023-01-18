import "./editCommentReply.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { format } from "timeago.js";
import { upDateReply } from "../../redux/actions/postActions";

const EditCommentReply = ({ postId, commentId, reply, setIsEdit }) => {
	const [desc, setDesc] = useState("");
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();

	// const {
	// 	state: { reply },
	// } = useLocation();

	// const postId = location.pathname.split("/")[2];
	// const commentId = location.pathname.split("/")[3];

	const userInfo = JSON.parse(localStorage.getItem("token"));
	const isAuthenticated = userInfo?.token;

	const auth = useSelector((state) => state.auth);
	const { userInfo: user } = auth;

	const replyData = {
		user: user._id,
		name: user.name,
		profilePic: user.profilePic,
		desc,
	};

	const handleUpdate = () => {
		if (isAuthenticated && user._id === reply.user) {
			dispatch(upDateReply(postId, commentId, reply._id, replyData));

			setIsEdit(false);
		}
	};
	const handleCancel = () => {
		setIsEdit(false);
	};

	return (
		<div className="edComment">
			<div className="edCWrapper">
				<h3 className="edCTitle">Edit Your Reply</h3>

				<div className="edCTop">
					<div className="edCUserInfo">
						<img className="edCImg" src={reply?.profilePic} alt="" />
						<p className="edCUserName">{reply?.name}</p>
					</div>
					<span className="edCTime">{format(reply?.date)}</span>
				</div>
				<hr style={{ margin: "6px 0px" }} />
				<form className="edCForm">
					<textarea
						className="edCDesc"
						defaultValue={reply.desc}
						onChange={(e) => setDesc(e.target.value)}
					></textarea>
					<div className="edCBtnGroup">
						<button className="edCCancelBtn" onClick={handleCancel}>
							Cancel
						</button>
						<button className="edCUpdatelBtn" onClick={handleUpdate}>
							Update
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditCommentReply;
