import "./profileExperience.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteExperience } from "../../../redux/actions/profileActions";

const ProfileExperience = ({ experience }) => {
	const auth = useSelector((state) => state.auth);
	const { userInfo: user } = auth;

	const userInfo = JSON.parse(localStorage.getItem("token"));
	const isAuthenticated = userInfo?.token;

	const profile = useSelector((state) => state.profile);
	const { currentProfile } = profile;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleDelete = () => {
		if (isAuthenticated && currentProfile.user._id === user._id) {
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
				<img
					className="companyImg"
					src="http://res.cloudinary.com/joniekesh/image/upload/v1654870094/upload/gvxn9sbsi70vg01su7zc.webp"
					alt=""
				/>
				<div className="experienceDesc">
					<div>
						<p>
							<b>Job Title:</b> {experience.title}
						</p>
					</div>
					<div>
						<p>
							<b>Company:</b> {experience.company}
						</p>
					</div>
					<div>
						<p>
							<b>Location:</b> {experience.location}
						</p>
					</div>
					<div>
						<p>
							<b>Duration:</b> {new Date(experience.from).toDateString()} -
							{experience.to
								? new Date(experience.to).toDateString()
								: "Current"}
						</p>
					</div>
					<div>
						<p>
							<b>Description:</b> {experience.description}
						</p>
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
