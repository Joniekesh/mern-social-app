import "./profileRightBar.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfiles } from "../../../redux/actions/profilesActions";
import { useEffect } from "react";
import { toast } from "react-toastify";

const ProfileRightBar = ({ follower }) => {
	const auth = useSelector((state) => state.auth);
	const { userInfo: user } = auth;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const profiles = useSelector((state) => state.profiles);
	const { profiles: userProfiles } = profiles;

	const profileExist = userProfiles.some(
		(userProfile) => userProfile.user._id === follower.user
	);

	useEffect(() => {
		dispatch(getProfiles());
	}, [dispatch]);

	const handleNavigate = () => {
		if (profileExist) {
			navigate(`/profiles/${follower.user}`);
		} else {
			toast.error("This user has no profile yet!", { theme: "colored" });
		}
	};

	return (
		<div className="profileRightBar">
			<div className="profileRightBarListItem">
				<div className="left" onClick={handleNavigate}>
					<img src={follower?.profilePic} alt="" />
				</div>
				<div className="center" onClick={handleNavigate}>
					<h4>{follower?.name}</h4>
				</div>
				{user._id !== follower.user && (
					<div className="right">
						<i className="fa-solid fa-plus"></i>
						<span>Follow</span>
					</div>
				)}
			</div>
			<hr className="line" />
		</div>
	);
};

export default ProfileRightBar;
