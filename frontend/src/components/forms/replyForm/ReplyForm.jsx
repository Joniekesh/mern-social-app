import "./replyForm.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addReply } from "../../../redux/actions/postActions";

const ReplyForm = ({ postId, commentId }) => {
	const [desc, setDesc] = useState("");

	const userLogin = useSelector((state) => state.userLogin);
	const { isAuthenticated, user } = userLogin;

	const dispatch = useDispatch();

	const newReply = {
		user,
		name: user.name,
		profilePic: user.profilePic,
		desc,
	};

	const submitHandler = (e) => {
		e.preventDefault();

		if (isAuthenticated) {
			dispatch(addReply(postId, commentId, newReply));

			window.location.reload();
		}
	};

	return (
		<div className="commentForm">
			<div className="commentFormWrapper">
				<form className="form">
					<div className="formGroupC">
						<div className="inputDiv">
							<img className="commentFormImg" src={user.profilePic} />
							<textarea
								placeholder="Add comment"
								value={desc}
								onChange={(e) => setDesc(e.target.value)}
							></textarea>
						</div>
						<div className="formButtom">
							<span className="at">@</span>
							<i className="fa-solid fa-camera"></i>
							<i
								className="fa-solid fa-paper-plane"
								onClick={submitHandler}
							></i>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ReplyForm;
