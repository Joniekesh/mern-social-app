import "./profilesTop.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfilesTop = ({ profile }) => {
	const navigate = useNavigate();

	const userLogin = useSelector((state) => state.userLogin);
	const { isAuthenticated, user } = userLogin;

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
					<img
						className="profileCoverImg"
						src="/assets/companyImg.jpeg"
						alt=""
					/>
				</div>

				<img className="profilePic" src={profile?.profilePic} alt="" />
			</div>
			<div className="profileUserInfo">
				<h2 className="profileUsername">{profile?.name}</h2>
				{isAuthenticated && user._id === profile?.user && (
					<i
						className="fa-solid fa-pen profileInfoEdit"
						onClick={handleProfileEdit}
					></i>
				)}
				<p className="profileDesc">{profile?.headline}</p>{" "}
				<span>2 Years of experience</span>
				<br />
				<div className="placeofWork">
					<span>{profile?.status} at </span>
					<a href={profile?.company} target="_blank" rel="noreferrer">
						<span>
							<b>{profile?.company}</b>
						</span>
					</a>
				</div>
				<br />
				<p>University of Nigeria:</p>
				<p>Bioresources Engineering</p>
				<br />
				<div className="socialHandles">
					<a href={profile?.website} target="_blank" rel="noreferrer">
						<i
							className="fa-solid fa-earth-americas"
							style={{ color: "#27176d" }}
						></i>
					</a>
					<a href={profile?.githubusername} target="_blank" rel="noreferrer">
						<i className="fa-brands fa-github" style={{ color: "#171515" }}></i>
					</a>
					<a href={profile?.social?.linkedin} target="_blank" rel="noreferrer">
						<i
							className="fa-brands fa-linkedin-in"
							style={{ color: "#0e76a8" }}
						></i>
					</a>
					<a href={profile?.social?.facebook} target="_blank" rel="noreferrer">
						<i
							className="fa-brands fa-facebook-f"
							style={{ color: "#4267B2" }}
						></i>
					</a>
					<a href={profile?.social?.twitter} target="_blank" rel="noreferrer">
						<i
							className="fa-brands fa-twitter"
							style={{ color: "#00acee " }}
						></i>
					</a>
					<a href={profile?.social?.instagram} target="_blank" rel="noreferrer">
						<i
							className="fa-brands fa-instagram"
							style={{ color: "#8a3ab9 " }}
						></i>
					</a>
					<a href={profile?.social?.youtube} target="_blank" rel="noreferrer">
						<i
							className="fa-brands fa-youtube"
							style={{ color: "#c4302b " }}
						></i>
					</a>
				</div>
				<br />
				<span className="userFollowers">10,500 Followers</span>
				<br />
				<div className="userLocation">
					<i className="fa-solid fa-location-dot"></i>
					<span>{profile?.location}</span>
				</div>
			</div>
			<br />
			<div className="profileUserFollow">
				<div className="profileFollowDiv">
					<i className="fa-solid fa-plus"></i>
					<span className="profileFollow">Follow</span>
				</div>
				<span className="profileMessage">Message</span>
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

export default ProfilesTop;
