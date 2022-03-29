import "./leftBar.css";
import { Link } from "react-router-dom";

const LeftBar = () => {
	return (
		<div className="homeLeft">
			<div className="homeLeftSearchDiv">
				<i className="fa-solid fa-magnifying-glass"></i>
				<input type="text" placeholder="Search for users, posts or articles" />
			</div>
			<Link to="/profiles/111">
				<div className="leftBarUserInfoDiv">
					<div className="lefBarUserInfo">
						<div>
							<img src="/assets/profile.jpeg" alt="" />
						</div>
						<div className="lefBarUserInfoUsername">
							<h4>Okoro John</h4>
							<p>
								Full Stack Developer: MERN | Socket.io | Redux Firebase | Git...
							</p>
						</div>
					</div>
					<hr className="line" />
				</div>
			</Link>
		</div>
	);
};

export default LeftBar;
