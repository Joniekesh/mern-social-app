import "./settings.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/spinner/Spinner";
import { updateUser } from "../../redux/actions/authActions";
import { deleteAccount } from "../../redux/actions/prifileActions";
import axios from "axios";
import { USER_UPDATE_RESET } from "../../redux/constants/authConstants";

const Settings = () => {
	const [file, setFile] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [profilePic, setProfilePic] = useState("");

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { isAuthenticated, user, loading } = userLogin;

	const userUpdate = useSelector((state) => state.userUpdate);
	const { success, loading: loadingUpdate } = userUpdate;

	const handleDelete = () => {
		if (isAuthenticated) {
			dispatch(deleteAccount());
			window.location.reload();
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
					profilePic: url,
				})
			);
		} catch (error) {}
	};

	useEffect(() => {
		if (success) {
			dispatch({ type: USER_UPDATE_RESET });
			navigate("/dashboard");
			window.location.reload();
		} else {
			setName(user.name);
			setEmail(user.email);
			setPassword(user.password);
			setProfilePic(user.profilePic);
		}
	}, [success, user, dispatch, navigate]);

	return (
		<div className="settings">
			<div className="container">
				{loading ? (
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
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
							<div className="settingsInputGroup">
								<i className="fa-solid fa-envelope"></i>
								<input
									type="email"
									value={email}
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
							<button
								className="settingsBtn"
								type="submit"
								disabled={loadingUpdate}
							>
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
