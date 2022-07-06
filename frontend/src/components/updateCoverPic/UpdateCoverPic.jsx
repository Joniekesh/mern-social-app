import "./updateCoverPic.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/actions/authActions";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UpdateCoverPic = ({ profile, setUpdateModal }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [file, setFile] = useState("");

	const userLogin = useSelector((state) => state.userLogin);
	const { isAuthenticated, user, loading } = userLogin;

	const updateCoverPhoto = async (e) => {
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

			const userData = {
				user: user._id,
				name: user.name,
				email: user.email,
				coverPhoto: url,
			};

			if (isAuthenticated) {
				dispatch(updateUser(userData));
				navigate(`/dashboard`);
				toast.success("Cover photo Updated", { theme: "colored" });
				window.location.reload();
			}
		} catch (error) {}
	};

	return (
		<div className="updateCoverPic">
			<div className="updateTop">
				<span className="cancel1" onClick={() => setUpdateModal(false)}>
					Cancel
				</span>
				{file && (
					<span className="save" onClick={updateCoverPhoto} disabled={loading}>
						Save
					</span>
				)}
			</div>
			{file ? (
				<img src={URL.createObjectURL(file)} alt="" />
			) : (
				<img src={user.coverPhoto} alt="" />
			)}
			<div className="updateBottom">
				<label htmlFor="inputFile" className="updateLabel">
					<i className="fa-solid fa-image"></i>
				</label>
				<input
					type="file"
					id="inputFile"
					style={{ display: "none", cursor: "pointer" }}
					// value={file}
					onChange={(e) => setFile(e.target.files[0])}
				/>
			</div>
		</div>
	);
};

export default UpdateCoverPic;
