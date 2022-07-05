import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteEducation } from "../../redux/actions/prifileActions";

const ProfilesEducation = ({ education, profile }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const userLogin = useSelector((state) => state.userLogin);
	const { isAuthenticated, user } = userLogin;

	const handleDelete = () => {
		if (isAuthenticated && user._id === profile.user._id) {
			dispatch(deleteEducation(education._id));
			window.location.reload();
		}
	};

	const handleNavigate = () => {
		navigate("/editEducation", {
			state: {
				education,
			},
		});
	};

	return (
		<>
			<div className="experienceListItem">
				<img
					className="companyImg"
					src="http://res.cloudinary.com/joniekesh/image/upload/v1654870016/upload/kmmfkfxe399wzdsba0np.webp"
					alt=""
				/>
				<div className="experienceDesc">
					<div>
						<p>
							<b>School:</b>
							{education.school}
						</p>
					</div>
					<div>
						<p>
							<b>Degree:</b>
							{education.degree}
						</p>
					</div>
					<div>
						<p>
							<b>Field of Study:</b>
							{education.fieldofstudy}
						</p>
					</div>
					<div>
						<p>
							<b>Duration:</b>
							{new Date(education.from).toDateString()} -
							{education.to ? new Date(education.to).toDateString() : "Current"}
						</p>
					</div>
					<div>
						<p>
							<b>Description:</b>
							{education.description}
						</p>
					</div>
				</div>
				{user._id === profile.user._id && (
					<div className="experienceActions">
						<i
							className="fa-solid fa-pen experienceEdit"
							onClick={handleNavigate}
						></i>
						<i
							className="fa-solid fa-trash-can experienceDelete"
							onClick={handleDelete}
						></i>
					</div>
				)}
			</div>
			<hr className="line" />
		</>
	);
};

export default ProfilesEducation;
