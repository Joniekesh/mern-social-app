import "./editPost.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { updatePost } from "../../redux/actions/postActions";
import axios from "axios";
import { toast } from "react-toastify";

const EditPost = () => {
	const {
		state: { post },
	} = useLocation();

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

	const handleCancel = () => {
		navigate(-1);
	};

	const handleUpdate = async (e) => {
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
				user: user._id,
				desc,
				photo: url,
			};

			if (isAuthenticated && user._id === post.user._id) {
				dispatch(updatePost(post._id, postData));
				navigate(`/posts/${post._id}`);
				window.location.reload();
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
							<h3 className="createPostIntro">Update Post</h3>
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
							<p className="createPostUsername">{user.name}</p>
						</div>
						<form onSubmit={handleUpdate}>
							<textarea
								type="text"
								defaultValue={post.desc}
								className="createPostTextarea"
								placeholder="Create a post"
								onChange={(e) => setDesc(e.target.value)}
							></textarea>
							{file ? (
								<div className="ImgDiv">
									<img
										className="createPostBodyImg"
										src={URL.createObjectURL(file)}
										alt=""
									/>
								</div>
							) : (
								<div className="ImgDiv">
									<img className="createPostBodyImg" src={post.photo} alt="" />
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
								<div className="editPostBtnGroup">
									<button
										type="submit"
										className="postCreateButton cancel"
										onClick={handleCancel}
									>
										Cancel
									</button>
									<button type="submit" className="postCreateButton">
										Update
									</button>
								</div>
							</div>
						</form>
					</div>
				)}
			</div>
		</div>
	);
};

export default EditPost;
