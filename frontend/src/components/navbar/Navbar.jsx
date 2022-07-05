import "./navbar.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/authActions";
import { getUsers } from "../../redux/actions/userActions";

const Navbar = ({ setOpenSideMenu, setOverLay }) => {
	const [search, setSearch] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [toggle, setToggle] = useState(false);

	const userLogin = useSelector((state) => state.userLogin);
	const { isAuthenticated, user } = userLogin;

	const profile = useSelector((state) => state.profile);
	const { profile: currentProfile } = profile;

	const users = useSelector((state) => state.user.users);

	const handleClick = () => {
		setOpenSideMenu(true);
		setOverLay(true);
	};

	const handleLogout = () => {
		dispatch(logout());

		navigate("/login");
		window.location.reload();
	};

	useEffect(() => {
		dispatch(getUsers());
	}, [dispatch]);

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
							placeholder="Search..."
							onChange={(e) => setSearch(e.target.value)}
						/>
						{search.length > 0 && (
							<div className="search">
								<ul className="searchList">
									{users
										.filter((user) => user.name.toLowerCase().includes(search))
										.map((user) => (
											<li className="searchListItem" key={user._id}>
												<Link to={`/profiles/${user._id}`}>
													<div className="searchContainer">
														<img className="searchImg" src={user.profilePic} />
														<div className="searchDetails">
															<span className="searchUserName">
																{user.name}
															</span>
															<span className="searchUserProfile"></span>
														</div>
													</div>
												</Link>
											</li>
										))}
								</ul>
							</div>
						)}
					</div>

					<div className="navbarCenter">
						<div className="navbarCenterWrapper">
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
									className=" badgeContainer"
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
														<p style={{ color: "teal" }}>{user.name}</p>
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
						{isAuthenticated && (
							<div className="mobileView">
								<img
									className="mobileImg "
									src={user?.profilePic}
									alt=""
									onClick={handleClick}
								/>
								<span className="mobileImgBadge"></span>
							</div>
						)}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
