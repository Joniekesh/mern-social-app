import "./profileEducation.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteEducation } from "../../../redux/actions/prifileActions";

const ProfileEducation = ({ education }) => {
	const userLogin = useSelector((state) => state.userLogin);
	const { user, isAuthenticated } = userLogin;

	const profile = useSelector((state) => state.profile);
	const { profile: currentProfile } = profile;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleDelete = () => {
		if (isAuthenticated && currentProfile.user === user._id) {
			dispatch(deleteEducation(education._id));
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
				<img className="companyImg" src="/assets/companyImg.jpeg" alt="" />
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
				{user._id === currentProfile.user && (
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

export default ProfileEducation;
