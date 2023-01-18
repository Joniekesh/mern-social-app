import "./userSearchListItem.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getProfiles } from "../../redux/actions/profilesActions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserSearchListItem = ({ user, setSearch }) => {
	const profiles = useSelector((state) => state.profiles);
	const { profiles: userProfiles } = profiles;

	const profileExist = userProfiles.some(
		(userProfile) => userProfile.user._id === user._id
	);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getProfiles());
	}, [dispatch]);

	const handleNavigate = () => {
		if (profileExist) {
			navigate(`/profiles/${user._id}`);
			setSearch("");
		} else {
			toast.error("This user has no profile yet!", { theme: "colored" });
		}
	};

	return (
		<li className="searchListItem" onClick={handleNavigate}>
			<div className="searchContainer">
				<img className="searchImg" src={user.profilePic} />
				<div className="searchDetails">
					<span className="searchUserName">{user.name}</span>
					<span className="searchUserProfile"></span>
				</div>
			</div>
		</li>
	);
};

export default UserSearchListItem;
