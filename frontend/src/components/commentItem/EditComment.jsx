import "./editComment.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { format } from "timeago.js";
import { updateComment } from "../../redux/actions/postActions";

const EditComment = ({ comment, currentPost, setIsEdit }) => {
	const [desc, setDesc] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const userInfo = JSON.parse(localStorage.getItem("token"));

	const isAuthenticated = userInfo?.token;
	const auth = useSelector((state) => state.auth);
	const { userInfo: user } = auth;

	const handleCancel = () => {
		setIsEdit(false);
	};

	const upDatedComment = {
		user: user._id,
		name: user.name,
		profilePic: user.profilePic,
		desc,
	};

	const handleUpdate = (e) => {
		e.preventDefault();
		if (isAuthenticated && user._id === comment?.user) {
			dispatch(updateComment(currentPost._id, comment._id, upDatedComment));
			setIsEdit(false);
		}
	};

	return (
		<div className="edComment">
			<div className="edCWrapper">
				<h3 className="edCTitle">Edit Your Comment</h3>
				<div className="edCTop">
					<div className="edCUserInfo">
						<img className="edCImg" src={comment?.profilePic} alt="" />
						<p className="edCUserName">{comment?.name}</p>
					</div>
					<span className="edCTime">{format(comment?.date)}</span>
				</div>
				<hr style={{ margin: "6px 0px" }} />
				<form className="edCForm">
					<textarea
						className="edCDesc"
						defaultValue={comment.desc}
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

export default EditComment;
