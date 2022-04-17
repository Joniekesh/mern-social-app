import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteExperience } from "../../redux/actions/prifileActions";

const ProfilesExperience = ({ profile, experience }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const userLogin = useSelector((state) => state.userLogin);
	const { isAuthenticated, user } = userLogin;

	const handleDelete = () => {
		if (isAuthenticated && user._id === profile.user) {
			dispatch(deleteExperience(experience._id));
		}
	};

	const handleNavigate = () => {
		navigate("/editExperience", {
			state: {
				experience,
			},
		});
	};

	return (
		<>
			<div className="experienceListItem">
				<img className="companyImg" src="/assets/companyImg.jpeg" alt="" />
				<div className="experienceDesc">
					<div>
						<p>
							<b>Title:</b>
							{experience?.title}
						</p>
					</div>
					<div>
						<p>
							<b>Company:</b>
							{experience.company}
						</p>
					</div>
					<div>
						<p>
							<b>Location:</b>
							{experience?.location}
						</p>
					</div>

					<div>
						<p>
							<b>Duration:</b> {new Date(experience?.from).toDateString()} -
							{experience?.to
								? new Date(experience.to).toDateString()
								: "Current"}
						</p>
					</div>
					<div>
						<p>
							<b>Description:</b>
							{experience.description}
						</p>
					</div>
				</div>
				{profile.user === user._id && (
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

export default ProfilesExperience;
