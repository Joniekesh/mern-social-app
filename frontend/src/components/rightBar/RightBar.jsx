import "./rightBar.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const RightBar = ({ users }) => {
	const auth = useSelector((state) => state.auth);
	const { userInfo } = auth;

	const unfollowedUsers = users?.filter((user) => user?._id !== userInfo?._id);

	return (
		<div className="homeRight">
			<div className="hRDiv">
				<h4 className="homeRigthText">Suggested users to connect with</h4>
				<hr className="line" />
				<div className="homerightLists">
					{unfollowedUsers?.map((user) => (
						<div className="homeRightListitem" key={user._id}>
							<Link to={`/profiles/${user._id}`}>
								<div className="homeRightTop">
									<div className="followUserDiv">
										<img
											className="homeRightImg"
											src={user.profilePic}
											alt=""
										/>
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
		</div>
	);
};

export default RightBar;
