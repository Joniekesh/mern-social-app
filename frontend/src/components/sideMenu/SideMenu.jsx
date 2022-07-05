import "./sideMenu.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { logout } from "../../redux/actions/authActions";
import { deleteAccount } from "../../redux/actions/prifileActions";

const SideMenu = ({ openSideMenu, setOpenSideMenu, setOverLay }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const userLogin = useSelector((state) => state.userLogin);
	const { isAuthenticated, user } = userLogin;

	const handleNavigate = () => {
		setOpenSideMenu(false);
		setOverLay(false);
		navigate("/");
	};

	const handleLogout = () => {
		dispatch(logout());
		setOpenSideMenu(false);
		setOverLay(false);
	};

	const handleDelete = () => {
		if (isAuthenticated) {
			dispatch(deleteAccount());
			setOpenSideMenu(false);
			setOverLay(false);
			navigate("/login");
		}
	};

	const handleClick = () => {
		setOpenSideMenu(false);
		setOverLay(false);
	};

	return (
		openSideMenu && (
			<div className="sideMenu">
				<div className="sideMenuWrapper">
					<div className="navbarLeft menu1" onClick={handleNavigate}>
						<i
							className="fa-solid fa-code"
							style={{ color: "purple", marginRight: "5px", fontSize: "20px" }}
						></i>
						<h2>
							<span style={{ color: "white" }}>DEV</span>
							<span style={{ color: "purple" }}>DOM</span>
							<span style={{ color: "white" }}>AIN</span>
						</h2>
					</div>
					<div className="sideMenuTop">
						<img className="sideMenuImg" src={user?.profilePic} alt="" />
						<Link to="/dashboard">
							<div className="sideMenuUserInfo" onClick={handleClick}>
								<h3 style={{ color: "teal" }}>{user?.name}</h3>
								<span>View Your Dashboard</span>
							</div>
						</Link>
						<span className="sideMenuCancelBt" onClick={handleClick}>
							X
						</span>
					</div>
					<div className="sideMenuBottom">
						<ul className="sideMenuList">
							<Link to="/">
								<li className="sideMenuListItem" onClick={handleClick}>
									POSTS
								</li>
							</Link>
							<Link to="/profiles">
								<li className="sideMenuListItem" onClick={handleClick}>
									DEVELOPERS
								</li>
							</Link>
							<Link to="/settings">
								<li className="sideMenuListItem" onClick={handleClick}>
									SETTINGS
								</li>
							</Link>
							<li className="sideMenuListItem" onClick={handleLogout}>
								LOGOUT
							</li>
						</ul>
					</div>
					<button className="deleteAccount" onClick={handleDelete}>
						DELETE ACCOUNT
					</button>
				</div>
			</div>
		)
	);
};

export default SideMenu;
