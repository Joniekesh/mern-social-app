import "./profileTop.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import UpdateCoverPic from "../../updateCoverPic/UpdateCoverPic";

const ProfileTop = ({ profile }) => {
	const navigate = useNavigate();

	const [updateModal, setUpdateModal] = useState(false);

	const handleProfileEdit = () => {
		navigate("/editProfile", {
			state: {
				profile,
			},
		});
	};

	return (
		<div className="profileTopDivs">
			<div className="profileTop">
				<div className="coverPicCont">
					<img
						className="profileCoverImg"
						src={profile.user?.coverPhoto}
						alt=""
					/>
					{!updateModal && (
						<i
							className="fas fa-pen profileCoverPhotofoEdit12"
							onClick={() => setUpdateModal(true)}
						></i>
					)}
				</div>
				{updateModal && (
					<UpdateCoverPic
						setUpdateModal={setUpdateModal}
						updateModal={updateModal}
					/>
				)}

				<img className="profilePic" src={profile.user?.profilePic} alt="" />
			</div>
			<div className="profileUserInfo">
				<h2 className="profileUsername">{profile.user?.name}</h2>
				<i
					className="fa-solid fa-pen profileInfoEdit"
					onClick={handleProfileEdit}
				></i>{" "}
				<p className="profileDesc" style={{ fontWeight: "400" }}>
					{profile?.headline}
				</p>{" "}
				<br />
				<div className="placeofWork">
					<span
						style={{ color: "teal", fontWeight: "bold", marginRight: "5px" }}
					>
						{profile?.status}
					</span>
					<span>at</span>
					<span>
						<b style={{ marginLeft: "5px" }}>{profile?.company}</b>
					</span>
				</div>
				<br />
				{profile.education && <p>{profile.education[0]?.school}</p>}
				{profile.education.length > 0 && (
					<p style={{ color: "teal" }}>
						<b>({profile.education[0]?.fieldofstudy})</b>
					</p>
				)}
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
					{profile?.social?.instagram && (
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
					{profile?.social?.youtube && (
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
						{profile?.user.followers.length}
					</span>
					<span>
						{profile.user.followers.length <= 1 ? "Follower" : "Followers"}
					</span>
				</div>
				<div className="followerDiv">
					<span className="userFollowers first">
						{profile?.user.followings.length}
					</span>
					<span>
						{profile?.user.followings.length <= 1 ? "Following" : "Followings"}
					</span>
				</div>
				<br />
				<div className="userLocation">
					<i className="fa-solid fa-location-dot"></i>
					<span>{profile?.location}</span>
				</div>
			</div>
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

export default ProfileTop;
