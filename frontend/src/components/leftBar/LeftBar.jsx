import "./leftBar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const LeftBar = () => {
	const userLogin = useSelector((state) => state.userLogin);
	const { user } = userLogin;

	const profile = useSelector((state) => state.profile);
	const { profile: currentProfile } = profile;

	return (
		<div className="homeLeft">
			<div className="homeLeftSearchDiv">
				<i className="fa-solid fa-magnifying-glass"></i>
				<input type="text" placeholder="Search for users, posts or articles" />
			</div>
			<Link to="/dashboard">
				<div className="leftBarUserInfoDiv">
					<div className="lefBarUserInfo">
						<div>
							<img src={user.profilePic} alt="" />
						</div>
						<div className="lefBarUserInfoUsername">
							<h4>{user.name}</h4>
							<p>{currentProfile?.headline.substring(0, 45)}...</p>
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default LeftBar;
