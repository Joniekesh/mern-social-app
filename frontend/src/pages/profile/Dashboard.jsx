import "./dashboard.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProfileTop from "../../components/profile/profileTop/ProfileTop";
import ProfileExperience from "../../components/profile/profileExperience/ProfileExperience";
import ProfileEducation from "../../components/profile/profileEducation/ProfileEducation";
import ProfileActions from "../../components/profile/profileActions/ProfileActions";
import ProfileRightBar from "../../components/profile/profileRightBar/ProfileRightBar";
import { getCurrentProfile } from "../../redux/actions/prifileActions";
import Spinner from "../../components/spinner/Spinner";
import GitRepos from "../../components/profile/gitRepos/GitRepos";
import { getGitRepos } from "../../redux/actions/prifileActions";
import HomeTop from "../../components/homeTop/HomeTop";
import { getTimelinePosts } from "../../redux/actions/postActions";
import PostItem from "../../components/postItem/PostItem";

const Dashboard = () => {
	const dispatch = useDispatch();

	const profile = useSelector((state) => state.profile);
	const { profile: currentProfile, loading, repos } = profile;

	const username = currentProfile?.githubusername;

	const userLogin = useSelector((state) => state.userLogin);
	const { isAuthenticated, user } = userLogin;

	const post = useSelector((state) => state.post);
	const { post: timeLinePosts, loading: postLoading } = post;

	useEffect(() => {
		dispatch(getCurrentProfile());
	}, [dispatch]);

	useEffect(() => {
		dispatch(getGitRepos(username));
	}, [dispatch, username]);

	useEffect(() => {
		dispatch(getTimelinePosts());
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
						{!loading && isAuthenticated && currentProfile === null ? (
							<ProfileActions />
						) : (
							<>
								<div className="profileWrapper">
									<div className="profileLeft">
										<ProfileTop profile={currentProfile} />
										<div className="profileRight">
											<h4>{currentProfile.name}'s Followers</h4>
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

									<div className="profileBio">
										<h2>{currentProfile.name}'s Bio</h2>
										<p>{currentProfile.bio}</p>
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

									<div className="gitReposWrapper">
										<h2>Github Repos</h2>
										<div className="gitReposList">
											{repos?.length > 0 ? (
												repos.map((repo, index) => (
													<GitRepos repo={repo} key={index} />
												))
											) : (
												<h4>
													No Repos to show. Please add your github username to
													have your repos populated.
												</h4>
											)}
										</div>
									</div>
								</div>
								<div className="timeLinePostWrapper">
									<h2>{currentProfile.name}'s Timeline Posts</h2>

									<HomeTop />
									<div className="timeLinePostLists">
										{!postLoading &&
											timeLinePosts?.map((post) => (
												<PostItem post={post} key={post._id} />
											))}
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
