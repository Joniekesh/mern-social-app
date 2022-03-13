import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/authActions";

const Navbar = () => {
	const userLogin = useSelector((state) => state.userLogin);
	const { isAuthenticated } = userLogin;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(logout());

		navigate("/login");
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
			)}
			<div className="navbarRight">
				<div className="navbarRightWrapper">
					<ul className="navbarRightList">
						{isAuthenticated && (
							<>
								<Link to="/profiles">
									<li className="navbarRightListItem">DEVELOPERS</li>
								</Link>
								<Link to="/posts">
									<li className="navbarRightListItem">POSTS</li>
								</Link>
								<Link to="/logot">
									<li className="navbarRightListItem" onClick={handleLogout}>
										LOGOUT
									</li>
								</Link>
								<Link to="/settings">
									<div className="navbarRightListItem badgeContainer">
										<img className="navImg " src="/assets/avatar.jpeg" alt="" />
										<span className="imgBadge"></span>
									</div>
								</Link>
							</>
						)}
						{!isAuthenticated && (
							<>
								<Link to="/register">
									<li className="navbarRightListItem">REGISTER</li>
								</Link>
								<Link to="login">
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
