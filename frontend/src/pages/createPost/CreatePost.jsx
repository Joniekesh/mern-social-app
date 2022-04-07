import "./createPost.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../redux/actions/postActions";
import app from "../../firebase";

import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage";

const CreatePost = () => {
	const [close, setClose] = useState(true);
	const [file, setFile] = useState("");
	const [desc, setDesc] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const userLogin = useSelector((state) => state.userLogin);
	const { user } = userLogin;

	const handleClose = () => {
		setClose(true);

		navigate("/");
	};

	const handleCreate = (e) => {
		e.preventDefault();

		const fileName = new Date().getTime() + file.name;
		const storage = getStorage(app);
		const storageRef = ref(storage, fileName);
		const uploadTask = uploadBytesResumable(storageRef, file);

		// Register three observers:
		// 1. 'state_changed' observer, called any time the state changes
		// 2. Error observer, called on failure
		// 3. Completion observer, called on successful completion
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				// Observe state change events such as progress, pause, and resume
				// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
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
			(error) => {
				// Handle unsuccessful uploads
			},
			() => {
				// Handle successful uploads on complete
				// For instance, get the download URL: https://firebasestorage.googleapis.com/...
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					const postData = {
						user: user._id,
						name: user.name,
						profilePic: user.profilePic,
						desc,
						photo: downloadURL,
					};
					dispatch(createPost(postData));
					navigate("/");

					window.location.reload();
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
							<p className="createPostUsername">{user.name}</p>
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
									<span className="ImgCancelBtn">X</span>
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
