import "./rightBar.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { followUser } from "../../redux/actions/userActions";

const RightBar = ({ users }) => {
	const userLogin = useSelector((state) => state.userLogin);
	const { user: currentUser } = userLogin;

	const unfollowedUsers = users.filter(
		(user) => user?._id !== currentUser?._id
	);

	return (
		<div className="homeRight">
			<h4 className="homeRigthText">Follow users for wider connections</h4>
			<hr className="line" />
			<div className="homerightLists">
				{unfollowedUsers.map((user) => (
					<div className="homeRightListitem" key={user._id}>
						<div className="homeRightTop">
							<Link to={`/profiles/${user._id}`}>
								<div className="followUserDiv">
									<img className="homeRightImg" src={user.profilePic} alt="" />
									<div>
										<p className="userName">{user.name}</p>
										{/* <span className="userDesc">
											Instructor and content Creator at Traversy Media
										</span> */}
									</div>
								</div>
							</Link>
						</div>
						<div className="homeRightBottom">
							<span className="plusSign">+</span>
							<span>Follow</span>
						</div>

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
