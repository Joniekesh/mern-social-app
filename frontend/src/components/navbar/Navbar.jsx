import "./navbar.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/authActions";
import { getUsers } from "../../redux/actions/userActions";
import UserSearchListItem from "../userSearchListItem/UserSearchListItem";
import { resetUser } from "../../redux/reducers/authRedux";

const Navbar = ({ setOpenSideMenu, setOverLay }) => {
	const [search, setSearch] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [toggle, setToggle] = useState(false);

	const userInfo = JSON.parse(localStorage.getItem("token"));
	const isAuthenticated = userInfo?.token;

	const auth = useSelector((state) => state.auth);
	const { userInfo: currentUser } = auth;

	const user = useSelector((state) => state.user);
	const { users } = user;

	const filteredUsers = users.filter((user) => user?._id !== currentUser?._id);

	const profile = useSelector((state) => state.profile);
	const { currentProfile } = profile;

	const handleClick = () => {
		setOpenSideMenu(true);
		setOverLay(true);
	};

	const handleLogout = () => {
		window.location.replace("/login");
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
							<div
								className="search"
								style={{ backgroundColor: "rgb(228, 231, 231)" }}
							>
								<ul className="searchList">
									{filteredUsers
										.filter((user) =>
											user.name
												.toLowerCase()
												.includes(search.toLocaleLowerCase())
										)
										.map((user) => (
											<UserSearchListItem
												user={user}
												key={user._id}
												setSearch={setSearch}
											/>
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
								<li className="navbarRightListItem" onClick={handleLogout}>
									LOGOUT
								</li>
								<div
									className=" badgeContainer"
									onClick={() => setToggle(!toggle)}
								>
									<img
										className="navImg "
										src={currentUser?.profilePic}
										alt=""
									/>
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
															src={currentUser?.profilePic}
															alt=""
														/>
													</div>
													<div className="dropDownProfile">
														<p style={{ color: "teal" }}>{currentUser.name}</p>
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
									src={currentUser?.profilePic}
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
