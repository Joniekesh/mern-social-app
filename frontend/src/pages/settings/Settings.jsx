import "./settings.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/spinner/Spinner";
import { updateUser } from "../../redux/actions/authActions";
import axios from "axios";
import { deleteAccount } from "../../redux/actions/profileActions";
import { axiosInstance } from "../../utils/config";

const Settings = () => {
	const [file, setFile] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [profilePic, setProfilePic] = useState("");

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const userInfo = JSON.parse(localStorage.getItem("token"));
	const isAuthenticated = userInfo?.token;

	const auth = useSelector((state) => state.auth);
	const { userInfo: user, isLoading } = auth;

	const handleDelete = () => {
		if (isAuthenticated) {
			dispatch(deleteAccount());
			navigate("/register");
		}
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

			dispatch(
				updateUser({
					_id: user._id,
					name,
					email,
					password,
					profilePic: url ? url : user.profilePic,
				})
			);
			navigate("/dashboard");
		} catch (error) {
			console.log(error);
		}
	};

	const handleNavigate = () => {
		navigate(-1);
	};

	return (
		<div className="settings">
			<div className="container">
				{isLoading ? (
					<Spinner />
				) : (
					<div className="settingsWrapper">
						<div className="settingsTop">
							<p className="update">Update Your Account</p>
							<p className="delete" onClick={handleDelete}>
								Delete Your Account
							</p>
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
									defaultValue={user.name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
							<div className="settingsInputGroup">
								<i className="fa-solid fa-envelope"></i>
								<input
									type="email"
									defaultValue={user.email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className="settingsInputGroup">
								<i className="fa-solid fa-lock"></i>
								<input
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<button className="settingsBtn" type="submit">
								{isLoading ? <Spinner /> : "Update"}
							</button>
						</form>
						<button className="goBkBtn" onClick={handleNavigate}>
							Go Back
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Settings;
