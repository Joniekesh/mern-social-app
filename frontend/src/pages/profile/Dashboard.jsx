import "./dashboard.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProfileTop from "../../components/profile/profileTop/ProfileTop";
import ProfileExperience from "../../components/profile/profileExperience/ProfileExperience";
import ProfileEducation from "../../components/profile/profileEducation/ProfileEducation";
import ProfileActions from "../../components/profile/profileActions/ProfileActions";
import ProfileRightBar from "../../components/profile/profileRightBar/ProfileRightBar";
import ProfileUserPosts from "../../components/profile/profileUserPosts/ProfileUserPosts";
import { getCurrentProfile } from "../../redux/actions/prifileActions";
import Spinner from "../../components/spinner/Spinner";

const Dashboard = () => {
	const dispatch = useDispatch();

	const profile = useSelector((state) => state.profile);
	const { profile: currentProfile, loading, error } = profile;

	const userLogin = useSelector((state) => state.userLogin);
	const { user } = userLogin;

	useEffect(() => {
		dispatch(getCurrentProfile());
	}, [dispatch]);

	return (
		<div className="profile">
			<div className="container">
				{loading ? (
					<Spinner />
				) : (
					<>
						<div className="dashboard">
							<i className="fa-solid fa-user"></i>
							<span>Dashboard</span>
						</div>
						{currentProfile === null ? (
							<ProfileActions />
						) : (
							<>
								<div className="profileWrapper">
									<div className="profileLeft">
										<ProfileTop profile={currentProfile} />
										<div className="profileRight">
											<h4>{user.name}'s Followers</h4>
											<hr className="line" />
											<div className="profileRightLists">
												<ProfileRightBar />
												<ProfileRightBar />
												<ProfileRightBar />
												<ProfileRightBar />
												<ProfileRightBar />
											</div>
											<span className="profileFollowersViewMore">
												View More...
											</span>
										</div>
									</div>

									<div className="experienceEduDiv">
										<div className="expContainer">
											<div className="expreienceDiv">
												<div className="experienceTop">
													<div className="experienceTopDiv">
														<i className="fa-solid fa-briefcase"></i>
														<h3>Experience</h3>
													</div>
												</div>
												<hr className="line" />
												<div className="experienceList">
													{currentProfile.experience?.length > 0 ? (
														currentProfile.experience.map((exp) => (
															<ProfileExperience
																experience={exp}
																key={exp._id}
															/>
														))
													) : (
														<h4>No Profile experience</h4>
													)}
												</div>
											</div>
											<Link to="/experience">
												<div className="experienceAdd">
													<i className="fa-solid fa-plus"></i>
												</div>
											</Link>
										</div>
										<div className="eduContainer">
											<div className="educationDiv">
												<div className="experienceTop">
													<div className="experienceTopDiv">
														<i className="fa-solid fa-graduation-cap"></i>
														<h3>Education</h3>
													</div>
												</div>
												<hr className="line" />
												<div className="educationList">
													{currentProfile.education?.length > 0 ? (
														currentProfile.education.map((edu) => (
															<ProfileEducation education={edu} key={edu._id} />
														))
													) : (
														<h4>No Profile Education</h4>
													)}
												</div>
											</div>
											<Link to="/education">
												<div className="experienceAdd">
													<i className="fa-solid fa-plus"></i>
												</div>
											</Link>
										</div>
									</div>
								</div>
								<hr className="line" />
								<div className="profileUserPostDiv">
									<h2>Posts by this user</h2>
									<div className="userPostItems">
										<ProfileUserPosts />
										<ProfileUserPosts />
										<ProfileUserPosts />
										<ProfileUserPosts />
										<ProfileUserPosts />
										<ProfileUserPosts />
									</div>
								</div>
							</>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default Dashboard;
