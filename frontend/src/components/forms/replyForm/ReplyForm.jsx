import "./replyForm.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addReply } from "../../../redux/actions/postActions";
import { toast } from "react-toastify";

const ReplyForm = ({ postId, commentId }) => {
	const [desc, setDesc] = useState("");

	const userInfo = JSON.parse(localStorage.getItem("token"));
	const isAuthenticated = userInfo?.token;

	const auth = useSelector((state) => state.auth);
	const { userInfo: user } = auth;

	const dispatch = useDispatch();

	const newReply = {
		user,
		name: user.name,
		profilePic: user.profilePic,
		desc,
	};

	const submitHandler = (e) => {
		e.preventDefault();

		if (!desc)
			return toast.error("Reply text is required", { theme: "colored" });

		if (isAuthenticated) {
			dispatch(addReply(postId, commentId, newReply));
			setDesc("");
		}
	};

	return (
		<div className="replyForm">
			<form className="rForm">
				<div className="rInputDiv">
					<div className="rImgContainer">
						<img className="rImg" src={user.profilePic} />
					</div>
					<textarea
						placeholder="Add comment"
						value={desc}
						onChange={(e) => setDesc(e.target.value)}
					></textarea>
				</div>
				<button className="rFormButtom" onClick={submitHandler}>
					Reply
				</button>
			</form>
		</div>
	);
};

export default ReplyForm;
