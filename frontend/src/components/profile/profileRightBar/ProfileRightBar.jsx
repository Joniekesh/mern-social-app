import "./profileRightBar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfileRightBar = ({ follower }) => {
	const user = useSelector((state) => state.userLogin.user);

	return (
		<div className="profileRightBar">
			<div className="profileRightBarListItem">
				<div className="left">
					<Link to={`/profiles/${follower.user}`}>
						<img src={follower?.profilePic} alt="" />
					</Link>
				</div>
				<Link to={`/profiles/${follower.user}`}>
					<div className="center">
						<h4>{follower?.name}</h4>
					</div>
				</Link>
				{user._id !== follower.user && (
					<div className="right">
						<i className="fa-solid fa-plus"></i>
						<span>Follow</span>
					</div>
				)}
			</div>
			<hr className="line" />
		</div>
	);
};

export default ProfileRightBar;
