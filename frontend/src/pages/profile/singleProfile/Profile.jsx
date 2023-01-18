import "./profile.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import {
	getProfileById,
	getUserGitRepos,
} from "../../../redux/actions/profilesActions";
import ProfileActions from "../../../components/profile/profileActions/ProfileActions";
// import ProfileRightBar from "../../../components/profile/profileRightBar/ProfileRightBar";
import ProfilesTop from "../../../components/profiles/ProfilesTop";
import ProfilesExperience from "../../../components/profiles/ProfilesExperience";
import ProfilesEducation from "../../../components/profiles/ProfilesEducation";
import Spinner from "../../../components/spinner/Spinner";
import GitRepos from "../../../components/profile/gitRepos/GitRepos";
import HomeTop from "../../../components/homeTop/HomeTop";
import PostItem from "../../../components/postItem/PostItem";
import { getPosts } from "../../../redux/actions/postActions";
import { getClientTimeLinePosts } from "../../../redux/actions/postActions";

const Profile = () => {
	const dispatch = useDispatch();
	const { id } = useParams();

	const post = useSelector((state) => state.post);
	const { clientTimeLinePosts, isLoading: loadingTimelinePosts } = post;

	const profiles = useSelector((state) => state.profiles);
	const { profile: userProfile, repos, isLoading } = profiles;

	const userInfo = JSON.parse(localStorage.getItem("token"));
	const isAuthenticated = userInfo?.token;

	const auth = useSelector((state) => state.auth);
	const { userInfo: currentUser } = auth;

	useEffect(() => {
		userProfile.githubusername &&
			dispatch(getUserGitRepos(userProfile.githubusername));
	}, [dispatch, userProfile]);

	useEffect(() => {
		id && dispatch(getProfileById(id));
	}, [dispatch, id]);

	useEffect(() => {
		dispatch(getPosts());
	}, [dispatch]);

	useEffect(() => {
		dispatch(getClientTimeLinePosts(id));
	}, [dispatch, id]);

	return (
		<div className="profile">
			<div className="container">
				{isLoading ? (
					<Spinner />
				) : (
					<>
						<div className="dashboard">
							<i className="fa-solid fa-user"></i>
							<span>Dashboard</span>
						</div>
						{!isLoading &&
							userProfile === null &&
							userProfile?.user._id === currentUser?._id && <ProfileActions />}
						<div className="profileWrapper">
							<div className="profilesTopDiv">
								<ProfilesTop profile={userProfile} />
								{userProfile?.user?.followers.length > 0 && (
									<div className="profileLeft profilesTopRightDiv">
										<div className="profileRight editThis">
											<h4 style={{ color: "teal" }}>
												{userProfile?.user?.name}'s Followers
											</h4>
											<hr className="line" />
											<div className="profileRightLists">
												{/* {userProfile?.user?.followers.map((follower) => (
													<ProfileRightBar
														follower={follower}
														key={follower._id}
													/>
												))} */}
											</div>
											<span className="profileFollowersViewMore">
												View More...
											</span>
										</div>
									</div>
								)}
							</div>

							<div className="profileBio">
								<h2>{userProfile?.user?.name}'s Bio</h2>
								<p>{userProfile?.bio}</p>
							</div>

							<div className="friendsList">
								<div className="friendsListtop">
									<h3 className="friendsListtitle"> Friends</h3>
									<p>
										(
										<b style={{ color: "teal" }}>
											{userProfile.user?.followings.length}{" "}
										</b>
										{userProfile?.user?.followings.length <= 1
											? "friend"
											: "friends"}
										)
									</p>
								</div>
								{userProfile.user?.followings.length > 0 ? (
									<div className="userFriendsList">
										{userProfile?.user.followings.map((friend) => (
											<Link to={`/profiles/${friend.user}`} key={friend._id}>
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
												<h4>No Profile experience yet</h4>
											)}
										</div>
									</div>
									{isAuthenticated &&
										currentUser?._id === userProfile?.user?._id && (
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
												<h4>No Profile Education yet</h4>
											)}
										</div>
									</div>
									{isAuthenticated &&
										currentUser?._id === userProfile?.user?._id && (
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
									{repos && (
										<GitRepos
											repos={repos}
											username={userProfile.githubusername}
											isLoading={isLoading}
										/>
									)}
								</div>
							</div>

							{/* <div className="timeLinePostWrapper">
								<h2>{userProfile?.user?.name}'s Timeline Posts</h2>
								{isAuthenticated &&
									currentUser?._id === userProfile?.user?._id && <HomeTop />}
								{loadingTimelinePosts ? (
									<Spinner />
								) : (
									<div className="timeLinePostLists">
										{clientTimeLinePosts && clientTimeLinePosts.length > 0 ? (
											clientTimeLinePosts?.map((post) => (
												<PostItem post={post} key={post._id} />
											))
										) : (
											<h4>No timeline posts yet</h4>
										)}
									</div>
								)}
							</div> */}
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Profile;
