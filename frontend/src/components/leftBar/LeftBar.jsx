import "./leftBar.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/actions/userActions";

const LeftBar = ({ profile }) => {
	const [search, setSearch] = useState("");

	const dispatch = useDispatch();

	const user = useSelector((state) => state.user);
	const { users } = user;

	const userLogin = useSelector((state) => state.userLogin);
	const { user: currentUser } = userLogin;

	useEffect(() => {
		dispatch(getUsers());
	}, []);

	return (
		<div className="homeLeft">
			<div className="homeLeftSearchDiv">
				<i className="fa-solid fa-magnifying-glass"></i>
				<input
					type="text"
					placeholder="Search..."
					onChange={(e) => setSearch(e.target.value)}
					style={{ color: "teal" }}
				/>
			</div>
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
												<span className="searchUserName">{user.name}</span>
												<span className="searchUserProfile"></span>
											</div>
										</div>
									</Link>
								</li>
							))}
					</ul>
				</div>
			)}
			<Link to="/dashboard">
				<div className="leftBarUserInfoDiv">
					<div className="lefBarUserInfo">
						<div>
							<img src={currentUser?.profilePic} alt="" />
						</div>
						<div className="lefBarUserInfoUsername">
							<h4 style={{ color: "teal" }}>{currentUser?.name}</h4>
							<p>{profile?.headline.substring(0, 30)}...</p>
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default LeftBar;
