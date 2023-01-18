import "./leftBar.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/actions/userActions";
import { getCurrentProfile } from "../../redux/actions/profileActions";
import UserSearchListItem from "../userSearchListItem/UserSearchListItem";

const LeftBar = () => {
	const [search, setSearch] = useState("");

	const dispatch = useDispatch();

	const auth = useSelector((state) => state.auth);
	const { userInfo } = auth;

	const user = useSelector((state) => state.user);
	const { users } = user;

	const filteredUsers = users.filter((user) => user?._id !== userInfo?._id);

	const profile = useSelector((state) => state.profile);
	const { currentProfile } = profile;

	useEffect(() => {
		dispatch(getCurrentProfile());
	}, [dispatch]);

	useEffect(() => {
		dispatch(getUsers());
	}, []);

	return (
		<div className="homeLeft">
			<div className="hLDiv">
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
							{filteredUsers
								.filter((user) =>
									user.name.toLowerCase().includes(search.toLocaleLowerCase())
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
				<Link to="/dashboard">
					<div className="leftBarUserInfoDiv">
						<div className="lefBarUserInfo">
							<div>
								<img src={userInfo?.profilePic} alt="" />
							</div>
							<div className="lefBarUserInfoUsername">
								<h4 style={{ color: "teal" }}>{userInfo?.name}</h4>
								<p>{currentProfile?.headline.substring(0, 30)}...</p>
							</div>
						</div>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default LeftBar;
