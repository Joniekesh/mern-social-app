import "./profile.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import ProfileTop from "../../components/profile/profileTop/ProfileTop";
import ProfileExperience from "../../components/profile/profileExperience/ProfileExperience";
import ProfileEducation from "../../components/profile/profileEducation/ProfileEducation";
import ProfileActions from "../../components/profile/profileActions/ProfileActions";
const Profile = () => {
	const navigate = useNavigate();

	const userLogin = useSelector((state) => state.userLogin);
	const { isAuthenticated } = userLogin;

	useEffect(() => {
		if (!isAuthenticated) {
			navigate("/login");
		}
	}, [isAuthenticated, navigate]);

	return (
		<div className="profile">
			<div className="container">
				<ProfileActions />
				<div className="profileWrapper">
					<div className="profileLeft">
						<div className="profileLeftWrapper">
							<ProfileTop />
						</div>
						<div className="expreienceDiv">
							<div className="experienceTop">
								<div className="experienceTopDiv">
									<i className="fa-solid fa-briefcase"></i>
									<h3>Experience</h3>
								</div>
							</div>
							<hr className="line" />
							<div className="experienceList">
								<ProfileExperience />
								<ProfileExperience />
								<ProfileExperience />
								<ProfileExperience />
							</div>
						</div>
						<Link to="/experience">
							<div className="experienceAdd">
								<i className="fa-solid fa-plus"></i>
							</div>
						</Link>
						<div className="educationDiv">
							<div className="experienceTop">
								<div className="experienceTopDiv">
									<i className="fa-solid fa-graduation-cap"></i>
									<h3>Education</h3>
								</div>
							</div>
							<hr className="line" />
							<div className="educationList">
								<ProfileEducation />
								<ProfileEducation />
								<ProfileEducation />
								<ProfileEducation />
								<ProfileEducation />
								<ProfileEducation />
							</div>
						</div>
						<Link to="/education">
							<div className="experienceAdd">
								<i className="fa-solid fa-plus"></i>
							</div>
						</Link>
					</div>
					<div className="profileRight">Right</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
