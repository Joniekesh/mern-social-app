import "./profileExperience.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteExperience } from "../../../redux/actions/prifileActions";

const ProfileExperience = ({ experience }) => {
	const userLogin = useSelector((state) => state.userLogin);
	const { user, isAuthenticated } = userLogin;

	const profile = useSelector((state) => state.profile);
	const { profile: currentProfile } = profile;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleDelete = () => {
		if (isAuthenticated && currentProfile.user === user._id) {
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
					<div className="experienceDescDiv">
						<p className="experienceUser">{experience.title}</p>
					</div>
					<div className="employmentDetails">
						<span>
							<b>@</b>
						</span>
						<span>
							<b>{experience.company}</b>
						</span>{" "}
						{experience.location}
					</div>
					<div className="experienceDate">
						<span className="expDate">
							{new Date(experience.from).toDateString()} -
							{experience.to
								? new Date(experience.to).toDateString()
								: "Current"}
						</span>
						<span>
							<b>(2years 3months)</b>
						</span>
					</div>
				</div>
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
			</div>
			<hr className="line" />
		</>
	);
};

export default ProfileExperience;
