import "./profileTop.css";
import { Link } from "react-router-dom";

const ProfileTop = () => {
	return (
		<div className="profileTopDivs">
			<div className="profileTop">
				<img className="profileCoverImg" src="/assets/companyImg.jpeg" alt="" />
				<i className="fa-solid fa-pen coverImgEdit"></i>{" "}
				<img className="profilePic" src="/assets/profile.jpeg" alt="" />
				<i className="fa-solid fa-camera profilePicEdit"></i>{" "}
			</div>
			<div className="profileUserInfo">
				<h2 className="profileUsername">Okoro John </h2>
				<Link to="/createProfile">
					<i className="fa-solid fa-pen profileInfoEdit"></i>{" "}
				</Link>
				<p className="profileDesc">
					Full Stack Developer: MERN | Firebase | Socket.io | Redux | Git
				</p>{" "}
				<span>2 Years of experience</span>
				<br />
				<div className="placeofWork">
					<span>Associate Senior Developer at </span>
					<a href="https://www.google.com" target="_blank" rel="noreferrer">
						<span>
							<b>Google</b>
						</span>
					</a>
				</div>
				<br />
				<p>University of Nigeria Nsukka:</p>
				<p>B.Eng (Bioresources Engineering)</p>
				<br />
				<div className="socialHandles">
					<a href="https://www.mywebsite.com" target="_blank" rel="noreferrer">
						<i
							className="fa-solid fa-earth-americas"
							style={{ color: "#27176d" }}
						></i>
					</a>
					<a href="https://www.github.com" target="_blank" rel="noreferrer">
						<i className="fa-brands fa-github" style={{ color: "#171515" }}></i>
					</a>
					<a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
						<i
							className="fa-brands fa-linkedin-in"
							style={{ color: "#0e76a8" }}
						></i>
					</a>
					<a href="https://www.facebook.com" target="_blank" rel="noreferrer">
						<i
							className="fa-brands fa-facebook-f"
							style={{ color: "#4267B2" }}
						></i>
					</a>
					<a href="https://www.twitter.com" target="_blank" rel="noreferrer">
						<i
							className="fa-brands fa-twitter"
							style={{ color: "#00acee " }}
						></i>
					</a>
					<a href="https://www.instagram.com" target="_blank" rel="noreferrer">
						<i
							className="fa-brands fa-instagram"
							style={{ color: "#8a3ab9 " }}
						></i>
					</a>
				</div>
				<br />
				<span className="userFollowers">10,500 Followers</span>
				<br />
				<div className="userLocation">
					<i className="fa-solid fa-location-dot"></i>
					<span>Enugu, Nigeria</span>
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
					<div className="skillItem">
						<i className="fa-solid fa-check"></i>
						<span>Mongoose</span>
					</div>
					<div className="skillItem">
						<i className="fa-solid fa-check"></i>
						<span>Express</span>
					</div>
					<div className="skillItem">
						<i className="fa-solid fa-check"></i>
						<span>React</span>
					</div>
					<div className="skillItem">
						<i className="fa-solid fa-check"></i>
						<span>NodeJS</span>
					</div>
					<div className="skillItem">
						<i className="fa-solid fa-check"></i>
						<span>Socket.io</span>
					</div>
					<div className="skillItem">
						<i className="fa-solid fa-check"></i>
						<span>Redux</span>
					</div>
					<div className="skillItem">
						<i className="fa-solid fa-check"></i>
						<span>Firbase</span>
					</div>
					<div className="skillItem">
						<i className="fa-solid fa-check"></i>
						<span>Git</span>
					</div>
					<div className="skillItem">
						<i className="fa-solid fa-check"></i>
						<span>HTML</span>
					</div>
					<div className="skillItem">
						<i className="fa-solid fa-check"></i>
						<span>CSS</span>
					</div>
					<div className="skillItem">
						<i className="fa-solid fa-check"></i>
						<span>Jvascript</span>
					</div>
					<div className="skillItem">
						<i className="fa-solid fa-check"></i>
						<span>Figma</span>
					</div>
					<div className="skillItem">
						<i className="fa-solid fa-check"></i>
						<span>MySQL</span>
					</div>
					<div className="skillItem">
						<i className="fa-solid fa-check"></i>
						<span>Bootstrap</span>
					</div>
					<div className="skillItem">
						<i className="fa-solid fa-check"></i>
						<span>Tailwind</span>
					</div>
					<div className="skillItem">
						<i className="fa-solid fa-check"></i>
						<span>OAuth</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileTop;
