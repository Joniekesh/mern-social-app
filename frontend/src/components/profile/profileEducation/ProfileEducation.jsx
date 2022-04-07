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
					<div className="experienceDescDiv">
						<p className="experienceUser">{education.school}</p>
					</div>
					<div className="employmentDetails">
						<span>
							<b>{education.degree}:</b>
						</span>
						<span>({education.fieldofstudy})</span>
					</div>
					<div className="experienceDate">
						<span className="expDate">
							{new Date(education.from).toDateString()} -
							{education.to ? new Date(education.to).toDateString() : "Current"}
						</span>
						<span>
							<b>(3yrs 2 mos)</b>
						</span>
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
