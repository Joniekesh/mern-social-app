import "./profilesItem.css";
import { Link } from "react-router-dom";

const ProfilesItem = ({ profile }) => {
	return (
		<div className="profilesContainer">
			<div className="profilesLeft">
				<img className="profilesLeftImg" src={profile.user.profilePic} alt="" />
			</div>
			<div className="profilesCenter">
				<p>{profile.user.name}</p>
				<span>
					{profile.status} at {profile.company}
				</span>
				<span>
					<b>{profile.location}</b>
				</span>
				<Link to={`/profiles/${profile.user._id}`}>
					<button className="profilesBtn">View Profile</button>
				</Link>
			</div>
			<div className="profilesRight">
				<ul className="profilesList">
					{profile.skills.slice(0, 5).map((skill, index) => (
						<li className="profilesListItem" key={index}>
							<i className="fa-solid fa-check"></i>
							<span>{skill}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default ProfilesItem;
