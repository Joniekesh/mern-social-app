import "./createPost.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../redux/actions/postActions";
import axios from "axios";
import { toast } from "react-toastify";

const CreatePost = () => {
	const [close, setClose] = useState(true);
	const [file, setFile] = useState("");
	const [desc, setDesc] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const userLogin = useSelector((state) => state.userLogin);
	const { isAuthenticated, user } = userLogin;

	const handleClose = () => {
		setClose(true);

		navigate(-1);
	};

	const handleCreate = async (e) => {
		e.preventDefault();

		const data = new FormData();
		data.append("file", file);
		data.append("upload_preset", "upload");

		try {
			const uploadRes = await axios.post(
				"https://api.cloudinary.com/v1_1/joniekesh/image/upload",
				data
			);

			const { url } = uploadRes.data;

			const postData = {
				user,
				desc,
				photo: url,
			};

			if (isAuthenticated) {
				dispatch(createPost(postData));
				navigate("/");
				toast.success("Post Updated", { theme: "colored" });
			}
		} catch (error) {}
	};

	return (
		<div className="createPost">
			<div className="container">
				{close && (
					<div className="createPostWrapper">
						<div className="createPostwrapperTop">
							<h3 className="createPostIntro">Create a new post</h3>
							<span className="cancelBtn" onClick={handleClose}>
								X
							</span>
						</div>
						<hr className="line" />
						<div className="createPostTop">
							<img
								className="createPostUserImg"
								src={user.profilePic ? user.profilePic : "/assets/avatar.jpeg"}
								alt=""
							/>
							<p className="createPostUsername" style={{ color: "teal" }}>
								{user.name}
							</p>
						</div>
						<form onSubmit={handleCreate}>
							<textarea
								type="text"
								value={desc}
								className="createPostTextarea"
								placeholder="Create a post"
								onChange={(e) => setDesc(e.target.value)}
							></textarea>
							{file && (
								<div className="ImgDiv">
									<img
										className="createPostBodyImg"
										src={URL.createObjectURL(file)}
										alt=""
									/>
								</div>
							)}
							<hr className="line" />
							<div className="postCreateBottom">
								<label className="postCreatePhoto" htmlFor="fileInput">
									<i className="fa-solid fa-image"></i>
									<span>Add Photo</span>
								</label>
								<input
									type="file"
									id="fileInput"
									style={{ display: "none" }}
									onChange={(e) => setFile(e.target.files[0])}
								/>
								<div className="postCreateVideo">
									<i className="fa-solid fa-video"></i>
									<span>Add Vidoe</span>
								</div>
								<button type="submit" className="postCreateButton">
									Post
								</button>
							</div>
						</form>
					</div>
				)}
			</div>
		</div>
	);
};

export default CreatePost;
