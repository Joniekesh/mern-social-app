import "./createPost.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPost } from "../../redux/actions/postActions";
import { axiosInstance } from "../../utils/config";
import { toast } from "react-toastify";

const CreatePost = ({ setOpenCreatePost, post, isUpdate, setIsUpdate }) => {
	const [file, setFile] = useState(post?.photo);
	const [desc, setDesc] = useState(post?.desc);

	const dispatch = useDispatch();

	const userInfo = JSON.parse(localStorage.getItem("token"));
	const isAuthenticated = userInfo?.token;

	const auth = useSelector((state) => state.auth);
	const { userInfo: user } = auth;

	const handleClose = () => {
		setOpenCreatePost(false);
		setIsUpdate(false);
	};

	const handleCreate = async (e) => {
		e.preventDefault();

		const data = new FormData();
		data.append("file", file);
		data.append("upload_preset", "upload");

		try {
			const uploadRes = await axiosInstance.post(
				"https://api.cloudinary.com/v1_1/joniekesh/image/upload",
				data
			);

			const { url } = uploadRes.data;

			const postData = {
				user,
				desc,
				photo: url ? url : "",
			};

			if (isAuthenticated) {
				dispatch(createPost(postData));
				if (isUpdate) {
					toast.success("Post Updated!", { theme: "colored" });
				} else {
					toast.success("Post Created", { theme: "colored" });
				}
				setOpenCreatePost(false);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="createPost">
			<div className="cPostWrapper">
				<div className="cPostwrapperTop">
					<div className="cPostTop">
						<img
							className="cPostUserImg"
							src={user.profilePic ? user.profilePic : "/assets/avatar.jpeg"}
							alt=""
						/>
						<p className="cPostUsername">{user.name}</p>
					</div>
					<h3 className="cPostIntro">
						{isUpdate ? "Update your post" : "Create new Post"}
					</h3>
					<div className="cpTitle">
						<span className="cPCancelBtn" onClick={handleClose}>
							X
						</span>
					</div>
				</div>
				<form onSubmit={handleCreate} className="cPForm">
					{isUpdate ? (
						<div className="cPImgDiv">
							<img className="cPostBodyImg" src={file} alt="" />
						</div>
					) : (
						file && (
							<div className="cPImgDiv">
								<img
									className="cPostBodyImg"
									src={URL.createObjectURL(file)}
									alt=""
								/>
							</div>
						)
					)}

					<div className="cpInfo">
						{isUpdate ? (
							<textarea
								type="text"
								defaultValue={desc}
								className="cPostTextarea"
								placeholder="Create a post"
								onChange={(e) => setDesc(e.target.value)}
							></textarea>
						) : (
							<textarea
								type="text"
								value={desc}
								className="cPostTextarea"
								placeholder="Create a post"
								onChange={(e) => setDesc(e.target.value)}
							></textarea>
						)}

						<hr className="line" />
						<div className="postCBottom">
							<label className="postCPhoto" htmlFor="fileInput">
								<i className="fa-solid fa-image"></i>
								<span>{isUpdate ? "Change Photo" : "Add Photo"}</span>
							</label>
							<input
								type="file"
								id="fileInput"
								style={{ display: "none" }}
								onChange={(e) => setFile(e.target.files[0])}
							/>
							<button type="submit" className="postCButton">
								{isUpdate ? "Update" : "Create"}
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreatePost;
