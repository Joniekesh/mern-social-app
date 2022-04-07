import "./settings.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/spinner/Spinner";
import { updateUser } from "../../redux/actions/authActions";
import app from "../../firebase";

import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage";

const Settings = () => {
	const [inputs, setInputs] = useState({});
	const [file, setFile] = useState("");

	const navigate = useNavigate();

	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const { user, loading } = userLogin;

	const onChange = (e) => {
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	};

	const handleUpdate = (e) => {
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
					const userInfo = { ...inputs, profilePic: downloadURL };
					dispatch(updateUser(userInfo));

					navigate("/dashboard");
					window.location.reload();
				});
			}
		);
	};

	return (
		<div className="settings">
			<div className="container">
				{loading ? (
					<Spinner />
				) : (
					<div className="settingsWrapper">
						<div className="settingsTop">
							<p className="update">Update Your Account</p>
							<p className="delete">Delete Your Account</p>
						</div>
						<form className="settingsCenter" onSubmit={handleUpdate}>
							<span>Profile Picture</span>
							<div className="settingsImgWrapper">
								<img
									className="settingsImg"
									src={file ? URL.createObjectURL(file) : user.profilePic}
									alt=""
								/>
								<label htmlFor="fileInput">
									<i className="far fa-user-circle"></i>
									<input
										type="file"
										id="fileInput"
										onChange={(e) => setFile(e.target.files[0])}
										style={{ display: "none" }}
									/>
								</label>
							</div>
							<div className="settingsInputGroup">
								<i className="fas fa-user"></i>
								<input
									type="text"
									placeholder={user.name}
									name="name"
									onChange={onChange}
								/>
							</div>
							<div className="settingsInputGroup">
								<i className="fa-solid fa-envelope"></i>
								<input
									type="email"
									placeholder={user.email}
									name="email"
									onChange={onChange}
								/>
							</div>
							<div className="settingsInputGroup">
								<i className="fa-solid fa-lock"></i>
								<input type="password" onChange={onChange} />
							</div>
							<button className="settingsBtn" type="submit">
								Update
							</button>
						</form>
					</div>
				)}
			</div>
		</div>
	);
};

export default Settings;
