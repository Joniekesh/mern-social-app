import "./dashboard.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProfileTop from "../../components/profile/profileTop/ProfileTop";
import ProfileExperience from "../../components/profile/profileExperience/ProfileExperience";
import ProfileEducation from "../../components/profile/profileEducation/ProfileEducation";
import ProfileActions from "../../components/profile/profileActions/ProfileActions";
import ProfileRightBar from "../../components/profile/profileRightBar/ProfileRightBar";
import { getCurrentProfile } from "../../redux/actions/profileActions";
import Spinner from "../../components/spinner/Spinner";
import GitRepos from "../../components/profile/gitRepos/GitRepos";
import HomeTop from "../../components/homeTop/HomeTop";
import { getTimelinePosts } from "../../redux/actions/postActions";
import PostItem from "../../components/postItem/PostItem";
import { getGitRepos } from "../../redux/actions/profileActions";

const Dashboard = () => {
	const dispatch = useDispatch();

	const profile = useSelector((state) => state.profile);
	const { currentProfile, repos, isLoading } = profile;

	const post = useSelector((state) => state.post);
	const { timeLinePosts: posts, isLoading: loadingTimelinePosts } = post;

	const username = currentProfile?.githubusername;

	useEffect(() => {
		username && dispatch(getGitRepos(username));
	}, [dispatch, username]);

	useEffect(() => {
		dispatch(getCurrentProfile());
	}, [dispatch]);

	useEffect(() => {
		dispatch(getTimelinePosts());
	}, [dispatch]);

	return (
		<div className="profile">
			<div className="container">
				{isLoading ? (
					<Spinner />
				) : (
					<>
						{!isLoading && currentProfile === null ? (
							<ProfileActions />
						) : (
							<>
								<div className="profileWrapper">
									<div className="profileLeft">
										<ProfileTop profile={currentProfile} />
										{currentProfile?.user?.followers?.length > 0 && (
											<div className="profileRight">
												<h4 style={{ color: "teal" }}>
													{currentProfile?.user?.name}'s Followers
												</h4>
												<hr className="line" />
												<div className="profileRightLists">
													{currentProfile?.user?.followers.map((follower) => (
														<ProfileRightBar
															follower={follower}
															key={follower._id}
														/>
													))}
												</div>
												<span className="profileFollowersViewMore">
													View More...
												</span>
											</div>
										)}
									</div>

									<div className="profileBio">
										<h2>{currentProfile?.user?.name}'s Bio</h2>
										<p>{currentProfile?.bio}</p>
									</div>

									<div className="friendsList">
										<div className="friendsListtop">
											<h3 className="friendsListtitle"> Friends</h3>
											<p>
												(
												<b style={{ color: "teal" }}>
													{currentProfile?.user?.followings?.length}{" "}
												</b>
												{currentProfile?.user?.followings?.length <= 1
													? "friend"
													: "friends"}
												)
											</p>
										</div>
										{currentProfile?.user?.followings?.length > 0 ? (
											<div className="userFriendsList">
												{currentProfile?.user?.followings.map((friend) => (
													<Link
														to={`/profiles/${friend.user}`}
														key={friend._id}
													>
														<div className="userFriendsListItem">
															<img
																className="userFriendsListImg"
																src={friend.profilePic}
																alt=""
															/>
															<p className="friendsName">{friend.name}</p>
														</div>
													</Link>
												))}
											</div>
										) : (
											<h4>No friends yet for this user</h4>
										)}
									</div>

									<div
										className="experienceEduDiv "
										style={{ marginBottom: "5px" }}
									>
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
													{currentProfile?.experience?.length > 0 ? (
														currentProfile?.experience.map((exp) => (
															<ProfileExperience
																experience={exp}
																key={exp._id}
																currentProfile={currentProfile}
															/>
														))
													) : (
														<h4>No Profile experience</h4>
													)}
												</div>
											</div>
											<div className="experienceAdd">
												<Link to="/experience">
													<i className="fa-solid fa-plus"></i>
													<span>Add</span>
												</Link>
											</div>
										</div>
										<div className="eduContainer profileEDv">
											<div className="educationDiv">
												<div className="experienceTop">
													<div className="experienceTopDiv">
														<i className="fa-solid fa-graduation-cap"></i>
														<h3>Education</h3>
													</div>
												</div>
												<hr className="line" />
												<div className="educationList">
													{currentProfile?.education?.length > 0 ? (
														currentProfile.education.map((edu) => (
															<ProfileEducation education={edu} key={edu._id} />
														))
													) : (
														<h4>No Profile Education</h4>
													)}
												</div>
											</div>
											<div className="experienceAdd">
												<Link to="/education">
													<i className="fa-solid fa-plus"></i>
													<span>Add</span>
												</Link>
											</div>
										</div>
									</div>

									<div className="gitReposWrapper">
										<h2>Github Repos</h2>
										<div className="gitReposList">
											<GitRepos
												repos={repos}
												isLoading={isLoading}
												username={username}
											/>
										</div>
									</div>
								</div>
								{loadingTimelinePosts ? (
									<Spinner />
								) : (
									<div className="timeLinePostWrapper">
										<HomeTop />
										<div className="timeLinePostLists">
											{posts &&
												posts.map((post) => (
													<PostItem post={post} key={post._id} />
												))}
										</div>
									</div>
								)}
							</>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default Dashboard;
