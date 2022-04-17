import "./profile.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getProfileById } from "../../../redux/actions/prifileActions";
import ProfileActions from "../../../components/profile/profileActions/ProfileActions";
import ProfileRightBar from "../../../components/profile/profileRightBar/ProfileRightBar";
import ProfilesTop from "../../../components/profiles/ProfilesTop";
import ProfilesExperience from "../../../components/profiles/ProfilesExperience";
import ProfilesEducation from "../../../components/profiles/ProfilesEducation";
import Spinner from "../../../components/spinner/Spinner";
import GitRepos from "../../../components/profile/gitRepos/GitRepos";
import { getGitRepos } from "../../../redux/actions/prifileActions";
import HomeTop from "../../../components/homeTop/HomeTop";
import { getUserTimeLinePosts } from "../../../redux/actions/postActions";
import PostItem from "../../../components/postItem/PostItem";

const Profile = () => {
	const dispatch = useDispatch();
	const { id } = useParams();

	const profile = useSelector((state) => state.profile);
	const { profile: userProfile, repos, loading } = profile;

	const userLogin = useSelector((state) => state.userLogin);
	const { isAuthenticated, user } = userLogin;

	const post = useSelector((state) => state.post);
	const { post: userTimelinePosts } = post;
	console.log(userTimelinePosts);

	const username = userProfile?.githubusername;

	useEffect(() => {
		dispatch(getProfileById(id));
	}, [dispatch, id]);

	useEffect(() => {
		dispatch(getGitRepos(username));
	}, [dispatch, username]);

	useEffect(() => {
		dispatch(getUserTimeLinePosts(id));
	}, [dispatch, id]);

	return (
		<div className="profile">
			<div className="container">
				{loading && userProfile === null ? (
					<Spinner />
				) : (
					<>
						<div className="dashboard">
							<i className="fa-solid fa-user"></i>
							<span>Dashboard</span>
						</div>
						{userProfile === null && userProfile?.user === user._id && (
							<ProfileActions />
						)}
						<div className="profileWrapper">
							<div className="profilesTopDiv">
								<ProfilesTop profile={userProfile} />
								<div className="profileLeft profilesTopRightDiv">
									<div className="profileRight editThis">
										<h4>{userProfile?.name}'s Followers</h4>
										<hr className="line" />
										<div className="profileRightLists">
											<ProfileRightBar />
											<ProfileRightBar />
											<ProfileRightBar />
										</div>
										<span className="profileFollowersViewMore">
											View More...
										</span>
									</div>
								</div>
							</div>

							<div className="profileBio">
								<h2>{userProfile?.name}'s Bio</h2>
								<p>{userProfile?.bio}</p>
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
											{userProfile?.experience?.length > 0 ? (
												userProfile.experience.map((exp, index) => (
													<ProfilesExperience
														experience={exp}
														key={index}
														profile={userProfile}
													/>
												))
											) : (
												<h4>No Profile experience</h4>
											)}
										</div>
									</div>
									{isAuthenticated && user._id === userProfile?.user && (
										<Link to="/experience">
											<div className="experienceAdd">
												<i className="fa-solid fa-plus"></i>
											</div>
										</Link>
									)}
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
											{userProfile?.education?.length > 0 ? (
												userProfile.education.map((edu, index) => (
													<ProfilesEducation
														education={edu}
														key={index}
														profile={userProfile}
													/>
												))
											) : (
												<h4>No Profile Education</h4>
											)}
										</div>
									</div>
									{isAuthenticated && user._id === userProfile?.user && (
										<Link to="/education">
											<div className="experienceAdd">
												<i className="fa-solid fa-plus"></i>
											</div>
										</Link>
									)}
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
											No Repos to show. Please add your github username to have
											your repos populated.
										</h4>
									)}
								</div>
							</div>

							<div className="timeLinePostWrapper">
								<h2>{userProfile?.name}'s Timeline Posts</h2>
								{isAuthenticated && user._id === userProfile?.user && (
									<HomeTop />
								)}
								<div className="timeLinePostLists">
									<PostItem post={userTimelinePosts} />
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Profile;
