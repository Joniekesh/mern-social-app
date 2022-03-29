import "./profileRightBar.css";
import { Link } from "react-router-dom";

const ProfileRightBar = () => {
	return (
		<div className="profileRightBar">
			<div className="profileRightBarListItem">
				<div className="left">
					<Link to="/profiles/111">
						<img src="/assets/profile2.jpeg" alt="" />
					</Link>
				</div>
				<Link to="/profiles/111">
					<div className="center">
						<h4>James Bond</h4>
						<p>
							Full Stack Developer: MERN | Socket.io | Redux | Firebase | Git...
						</p>
					</div>
				</Link>
				<div className="right">
					<i className="fa-solid fa-plus"></i>
					<span>Follow</span>
				</div>
			</div>
			<hr className="line" />
		</div>
	);
};

export default ProfileRightBar;
