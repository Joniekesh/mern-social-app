import "./profile.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getProfileById } from "../../../redux/actions/profilesActions";
import ProfileActions from "../../../components/profile/profileActions/ProfileActions";
import ProfileRightBar from "../../../components/profile/profileRightBar/ProfileRightBar";
import ProfilesTop from "../../../components/profiles/ProfilesTop";
import ProfilesExperience from "../../../components/profiles/ProfilesExperience";
import ProfilesEducation from "../../../components/profiles/ProfilesEducation";
import Spinner from "../../../components/spinner/Spinner";
import GitRepos from "../../../components/profile/gitRepos/GitRepos";
import HomeTop from "../../../components/homeTop/HomeTop";
// import { getUserTimeLinePostsByUserId } from "../../../redux/actions/postActions";

import PostItem from "../../../components/postItem/PostItem";
import { getPosts } from "../../../redux/actions/postActions";
import { getUserById } from "../../../redux/actions/userActions";

const Profile = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const id = location.pathname.split("/")[2];

	const post = useSelector((state) => state.post);
	const { posts } = post;

	const timeLinePosts = posts.filter((post) => post.user._id === id);

	const userLogin = useSelector((state) => state.userLogin);
	const { isAuthenticated, user: currentUser } = userLogin;

	const profileById = useSelector((state) => state.profileById);
	const { profile: userProfile, loading } = profileById;

	// const timelinePostsByUserId = useSelector(
	// 	(state) => state.timelinePostsByUserId
	// );
	// const { posts, loading: loadingTimelinePosts } = timelinePostsByUserId;

	useEffect(() => {
		id && dispatch(getProfileById(id));
	}, [dispatch, id]);

	useEffect(() => {
		dispatch(getPosts());
	}, [dispatch]);

	// useEffect(() => {
	// 	dispatch(getUserTimeLinePostsByUserId(id));
	// }, [dispatch, id]);

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
						{!loading &&
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
												{userProfile?.user?.followers.map((follower) => (
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
									<GitRepos userProfile={userProfile} />
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
										{posts && posts.length > 0 ? (
											posts?.map((post) => (
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
