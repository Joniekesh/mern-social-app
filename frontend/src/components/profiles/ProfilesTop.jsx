import "./profilesTop.css";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
	followUser,
	getUserById,
	unFollowUser,
} from "../../redux/actions/userActions";
import UpdateCoverPic from "../updateCoverPic/UpdateCoverPic";

const ProfilesTop = ({ profile }) => {
	const [updateModal, setUpdateModal] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { id } = useParams();

	const userLogin = useSelector((state) => state.userLogin);
	const { user: currentUser, loading } = userLogin;

	const user = useSelector((state) => state.user);
	const { user: guestUser } = user;

	const follower = guestUser?.followers?.find(
		(follower) => follower.user === currentUser._id
	);

	const [isFollowed, setIsFollowed] = useState(
		guestUser?.followers?.includes(follower)
	);

	useEffect(() => {
		dispatch(getUserById(id));
	}, [dispatch, id]);

	useEffect(() => {
		setIsFollowed(guestUser?.followers?.includes(follower));
	}, [guestUser?.followers, follower]);

	const userData = {
		user: currentUser?._id,
		name: currentUser?.name,
		profilePic: currentUser?.profilePic,
		followers: currentUser.followers,
		followings: currentUser.followings,
	};

	const handleFollow = () => {
		if (isFollowed) {
			dispatch(unFollowUser(guestUser._id, { user: currentUser?._id }));
		} else {
			dispatch(followUser(guestUser._id, userData));
		}
		setIsFollowed(!isFollowed);
		window.location.reload();
	};

	const handleProfileEdit = () => {
		navigate("/editProfile", {
			state: {
				profile,
			},
		});
	};

	return (
		<div className="profilesTop">
			<div className="profileTop">
				<div className="coverPicCont">
					<img className="profileCoverImg" src={guestUser?.coverPhoto} alt="" />
				</div>

				<img className="profilePic" src={guestUser?.profilePic} alt="" />
				{!updateModal &&
					!loading &&
					currentUser?._id === profile?.user?._id && (
						<i
							className="fas fa-pen profileCoverPhotofoEdit12"
							onClick={() => setUpdateModal(true)}
						></i>
					)}
				{updateModal && (
					<UpdateCoverPic
						setUpdateModal={setUpdateModal}
						updateModal={updateModal}
						profile={profile}
					/>
				)}
			</div>
			<div className="profileUserInfo">
				<h2 className="profileUsername">{guestUser?.name}</h2>
				{currentUser?._id === profile?.user?._id && (
					<i
						className="fa-solid fa-pen profileInfoEdit"
						onClick={handleProfileEdit}
					></i>
				)}
				<p className="profileDesc" style={{ fontWeight: "400" }}>
					{profile?.headline}
				</p>{" "}
				<br />
				{profile?.status && (
					<div className="placeofWork">
						<span
							style={{
								color: "teal",
								fontWeight: "bold",
								marginRight: "5px",
								fontSize: "19px",
							}}
						>
							{profile?.status}
						</span>
						<span>at</span>
						<span>
							<b style={{ marginLeft: "5px" }}>{profile?.company}</b>
						</span>
					</div>
				)}
				<br />
				<p>{profile?.education?.school}</p>
				<p>{profile?.education?.fieldofstudy}</p>
				<br />
				<div className="socialHandles">
					{profile?.website && (
						<a href={profile?.website} target="_blank" rel="noreferrer">
							<i
								className="fa-solid fa-earth-americas"
								style={{ color: "#27176d" }}
							></i>
						</a>
					)}

					{profile?.social?.linkedin && (
						<a
							href={profile?.social?.linkedin}
							target="_blank"
							rel="noreferrer"
						>
							<i
								className="fa-brands fa-linkedin-in"
								style={{ color: "#0e76a8" }}
							></i>
						</a>
					)}
					{profile?.social?.facebook && (
						<a
							href={profile?.social?.facebook}
							target="_blank"
							rel="noreferrer"
						>
							<i
								className="fa-brands fa-facebook-f"
								style={{ color: "#4267B2" }}
							></i>
						</a>
					)}
					{profile?.social?.twitter && (
						<a href={profile?.social?.twitter} target="_blank" rel="noreferrer">
							<i
								className="fa-brands fa-twitter"
								style={{ color: "#00acee " }}
							></i>
						</a>
					)}
					{profile?.socia?.instagram && (
						<a
							href={profile?.social?.instagram}
							target="_blank"
							rel="noreferrer"
						>
							<i
								className="fa-brands fa-instagram"
								style={{ color: "#8a3ab9 " }}
							></i>
						</a>
					)}
					{profile?.socia?.youtube && (
						<a href={profile?.social?.youtube} target="_blank" rel="noreferrer">
							<i
								className="fa-brands fa-youtube"
								style={{ color: "#c4302b " }}
							></i>
						</a>
					)}
				</div>
				<br />
				<div className="followerDiv">
					<span className="userFollowers first">
						{profile?.user?.followers.length}
					</span>
					<span>
						{profile?.user?.followers.length <= 1 ? "Follower" : "Followers"}
					</span>
				</div>
				<div className="followerDiv">
					<span className="userFollowers first">
						{profile?.user?.followings.length}
					</span>
					<span>
						{profile?.user?.followings.length <= 1 ? "Following" : "Followings"}
					</span>
				</div>
				<br />
				{profile?.location && (
					<div className="userLocation">
						<i className="fa-solid fa-location-dot"></i>
						<span>{profile?.location}</span>
					</div>
				)}
			</div>
			<br />
			{profile?.user?._id !== currentUser?._id && (
				<div className="profileUserFollow">
					<div className="profileFollowDiv" onClick={handleFollow}>
						{isFollowed ? (
							<>
								<i className="fa-solid fa-minus"></i>
								<span className="profileFollow">Unfollow</span>
							</>
						) : (
							<>
								<i className="fa-solid fa-plus"></i>
								<span className="profileFollow">Follow</span>
							</>
						)}
					</div>
					<span className="profileMessage">Message</span>
				</div>
			)}
			<br />
			<hr className="line" />
			<div className="skills">
				<h3>SKILLS</h3>
				<div className="skillsWrapper">
					{profile?.skills?.map((skill, index) => (
						<div className="skillItem" key={index}>
							<i className="fa-solid fa-check"></i>
							<span>{skill}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ProfilesTop;
