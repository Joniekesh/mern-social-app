import "./createPost.css";
import { useState } from "react";

const CreatePost = () => {
	const [close, setClose] = useState(true);
	const [file, setFile] = useState("");
	const [text, setText] = useState("");

	return (
		<div className="createPost">
			<div className="container">
				{close && (
					<div className="createPostWrapper">
						<h3 className="createPostIntro">Create a new post</h3>
						<span className="cancelBtn" onClick={() => setClose(false)}>
							X
						</span>
						<hr className="line" />
						<div className="createPostTop">
							<img
								className="createPostUserImg"
								src="/assets/profile.jpeg"
								alt=""
							/>
							<p className="createPostUsername">Okoro John</p>
						</div>
						<form>
							<textarea
								type="text"
								value={text}
								className="createPostTextarea"
								placeholder="Create a post"
								onChange={(e) => setText(e.target.value)}
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
