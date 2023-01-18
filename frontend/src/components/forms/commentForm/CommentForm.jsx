import "./commentForm.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPostComment } from "../../../redux/actions/postActions";
import { toast } from "react-toastify";

const CommentForm = ({ post }) => {
	const [desc, setDesc] = useState("");

	const userInfo = JSON.parse(localStorage.getItem("token"));
	const isAuthenticated = userInfo?.token;

	const auth = useSelector((state) => state.auth);
	const { userInfo: user } = auth;

	const dispatch = useDispatch();

	const newComment = {
		user,
		name: user.name,
		profilePic: user.profilePic,
		desc,
	};

	const submitHandler = (e) => {
		e.preventDefault();

		if (!desc)
			return toast.error("Comment text is required", { theme: "colored" });

		if (isAuthenticated) {
			dispatch(addPostComment(post._id, newComment));
			setDesc("");
		}
	};

	return (
		<div className="comF">
			<div className="comFWrapper">
				<form className="comFform">
					<div className="comFformGroup">
						<div className="comFInputDiv">
							<img className="comFImg" src={user.profilePic} />
							<textarea
								placeholder="Add comment"
								value={desc}
								onChange={(e) => setDesc(e.target.value)}
							></textarea>
						</div>
						<button className="comFButtom" onClick={submitHandler}>
							Comment
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CommentForm;
