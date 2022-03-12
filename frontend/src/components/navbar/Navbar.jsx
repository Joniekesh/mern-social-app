import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<div className="navbar">
			<div className="navbarLeft">
				<Link to="/" className="navbarLeftWrapper">
					<i className="fa-solid fa-code"></i>
					<h2>DEVDOMAIN</h2>
				</Link>
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
					<img className="navImg" src="/assets/avatar.jpeg" alt="" />
				</div>
			</div>
			<div className="navbarRight">
				<div className="navbarRightWrapper">
					<ul className="navbarRightList">
						<Link to="/profiles">
							<li className="navbarRightListItem">DEVELOPERS</li>
						</Link>
						<Link to="/posts">
							<li className="navbarRightListItem">POSTS</li>
						</Link>
						<Link to="/register">
							<li className="navbarRightListItem">REGISTER</li>
						</Link>
						<Link to="login">
							<li className="navbarRightListItem">LOGIN</li>
						</Link>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
