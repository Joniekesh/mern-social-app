import "./navbar.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/authActions";

const Navbar = () => {
	const [toggle, setToggle] = useState(false);

	const userLogin = useSelector((state) => state.userLogin);
	const { isAuthenticated, user } = userLogin;

	const profile = useSelector((state) => state.profile);
	const { profile: currentProfile } = profile;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(logout());

		navigate("/login");
		window.location.reload();
	};

	return (
		<div className="navbar">
			<div className="navbarLeft">
				<Link to="/" className="navbarLeftWrapper">
					<i className="fa-solid fa-code"></i>
					<h2>
						DEV<span style={{ color: "purple" }}>DOM</span>
						<span>AIN</span>
					</h2>
				</Link>
			</div>
			{isAuthenticated && (
				<>
					<div className="navbarSearch">
						<i className="fa-solid fa-magnifying-glass"></i>
						<input
							type="text"
							placeholder="Search for posts, users or developers..."
						/>
					</div>

					<div className="navbarCenter">
						<div className="navbarCenterWrapper">
							<div className="icon">
								<i className="fa-solid fa-user"></i>
								<span className="count">2</span>
							</div>
							<div className="icon">
								<i className="fa-solid fa-envelope"></i>
								<span className="count">5</span>
							</div>
							<div className="icon">
								<i className="fa-solid fa-bell"></i>
								<span className="count">3</span>
							</div>
						</div>
					</div>
					<div className="timeline">Timeline</div>
				</>
			)}

			<div className="navbarRight">
				<div className="navbarRightWrapper">
					<ul className="navbarRightList">
						{isAuthenticated && (
							<>
								<Link to="/profiles">
									<li className="navbarRightListItem">DEVELOPERS</li>
								</Link>
								<Link to="/">
									<li className="navbarRightListItem">POSTS</li>
								</Link>
								<Link to="/logot">
									<li className="navbarRightListItem" onClick={handleLogout}>
										LOGOUT
									</li>
								</Link>
								<div
									className="navbarRightListItem badgeContainer"
									onClick={() => setToggle(!toggle)}
								>
									<img className="navImg " src={user?.profilePic} alt="" />
									<span className="imgBadge"></span>
								</div>
								<i
									className="fa-solid fa-caret-down caret"
									onClick={() => setToggle(!toggle)}
								></i>
								{toggle && (
									<div className="userSettings">
										<ul className="settingsList">
											<Link to="/dashboard">
												<li
													className="settingsItem dropDown"
													onClick={() => setToggle(false)}
												>
													<div>
														<img
															className="dropDownImg"
															src={user?.profilePic}
															alt=""
														/>
													</div>
													<div className="dropDownProfile">
														<p>{user.name}</p>
														<span>
															{currentProfile?.headline.substring(0, 30)}...
														</span>
													</div>
												</li>
												<hr className="line" />
											</Link>
											<Link to="/settings">
												<li
													className="settingsItem"
													onClick={() => setToggle(false)}
												>
													Settings
												</li>
											</Link>
											<li className="settingsItem" onClick={handleLogout}>
												Logout
											</li>
										</ul>
									</div>
								)}
							</>
						)}
						{!isAuthenticated && (
							<>
								<Link to="/register">
									<li className="navbarRightListItem">REGISTER</li>
								</Link>
								<Link to="/login">
									<li className="navbarRightListItem">LOGIN</li>
								</Link>
							</>
						)}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
