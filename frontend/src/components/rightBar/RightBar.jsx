import "./rightBar.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const RightBar = ({ users }) => {
	const userLogin = useSelector((state) => state.userLogin);
	const { user: currentUser } = userLogin;

	const unfollowedUsers = users?.filter(
		(user) => user?._id !== currentUser?._id
	);

	return (
		<div className="homeRight">
			<h4 className="homeRigthText">Suggested users to connect with</h4>
			<hr className="line" />
			<div className="homerightLists">
				{unfollowedUsers?.map((user) => (
					<div className="homeRightListitem" key={user._id}>
						<Link to={`/profiles/${user._id}`}>
							<div className="homeRightTop">
								<div className="followUserDiv">
									<img className="homeRightImg" src={user.profilePic} alt="" />
									<div>
										<p className="userName">{user.name}</p>
									</div>
								</div>
							</div>
							<div className="homeRightBottom">
								<span>View</span>
							</div>
						</Link>

						<hr className="line" />
					</div>
				))}
			</div>
			<hr className="line" />
			<span className="rightBarViewMore">View More...</span>
		</div>
	);
};

export default RightBar;
