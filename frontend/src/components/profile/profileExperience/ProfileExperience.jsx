import "./profileExperience.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteExperience } from "../../../redux/actions/prifileActions";
import { toast } from "react-toastify";

const ProfileExperience = ({ experience }) => {
	const userLogin = useSelector((state) => state.userLogin);
	const { user, isAuthenticated } = userLogin;

	const profile = useSelector((state) => state.profile);
	const { profile: currentProfile } = profile;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleDelete = () => {
		if (isAuthenticated && currentProfile.user._id === user._id) {
			dispatch(deleteExperience(experience._id));
			toast.success("Experience Deleted", { theme: "colored" });
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
