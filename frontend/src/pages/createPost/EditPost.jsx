import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { updatePost } from "../../redux/actions/postActions";
import app from "../../firebase";

import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage";

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

		navigate("/");
	};

	const handleUpdate = (e) => {
		e.preventDefault();
		const fileName = new Date().getTime() + file.name;
		const storage = getStorage(app);
		const storageRef = ref(storage, fileName);
		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log("Upload is " + progress + "% done");
				switch (snapshot.state) {
					case "paused":
						console.log("Upload is paused");
						break;
					case "running":
						console.log("Upload is running");
						break;
				}
			},
			(error) => {},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					const postData = {
						user: user._id,
						name: user.name,
						profilePic: user.profilePic,
						desc,
						photo: downloadURL,
					};
					if (isAuthenticated && user._id === post.user) {
						dispatch(updatePost(post._id, postData));
						navigate(`/posts/${post._id}`);

						window.location.reload();
					}
				});
			}
		);
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
								<button type="submit" className="postCreateButton">
									Update
								</button>
							</div>
						</form>
					</div>
				)}
			</div>
		</div>
	);
};

export default EditPost;
