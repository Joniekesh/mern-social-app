import "./profileRightBar.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getProfileById } from "../../../redux/actions/prifileActions";
import { useEffect } from "react";

const ProfileRightBar = ({ follower }) => {
	const dispatch = useDispatch();

	const profile = useSelector((state) => state.profile);
	const { profile: currentProfile } = profile;

	useEffect(() => {
		dispatch(getProfileById(follower));
	}, [dispatch, follower]);

	return (
		<div className="profileRightBar">
			<div className="profileRightBarListItem">
				<div className="left">
					<Link to={`/profiles/${currentProfile?.user}`}>
						<img src={currentProfile?.profilePic} alt="" />
					</Link>
				</div>
				<Link to={`/profiles/${currentProfile?.user}`}>
					<div className="center">
						<h4>{currentProfile?.name}</h4>
						<p>{currentProfile?.headline}</p>
					</div>
				</Link>
				<div className="right">
					<i className="fa-solid fa-plus"></i>
					<span>Follow</span>
				</div>
			</div>
			<hr className="line" />
		</div>
	);
};

export default ProfileRightBar;
