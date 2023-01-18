import "./postReactedUserItem.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfiles } from "../../redux/actions/profilesActions";
import { useEffect } from "react";
import { toast } from "react-toastify";

const PostReactedUserItem = ({ like }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const profiles = useSelector((state) => state.profiles);
	const { profiles: userProfiles } = profiles;

	const profileExist = userProfiles.some(
		(userProfile) => userProfile.user?._id === like?._id
	);

	useEffect(() => {
		dispatch(getProfiles());
	}, [dispatch]);

	const handleNavigate = () => {
		if (profileExist) {
			navigate(`/profiles/${like.user}`);
		} else {
			toast.error("This user has no profile yet!", { theme: "colored" });
		}
	};

	return (
		<div className="postReactedUserItem">
			<div className="postReactedUserInfo">
				<div className="singlePostreactionsListItem" onClick={handleNavigate}>
					<img className="userReactionImg" src={like?.profilePic} alt="" />
					<i className="fa-solid fa-thumbs-up singlePostThumb"></i>
				</div>
				<div className="postReactedUserDesc" onClick={handleNavigate}>
					<p className="postReactedUsername" style={{ cursor: "pointer" }}>
						{like?.name}
					</p>
					<span className="postReactedUserProfileInfo">
						{/* {currentProfile?.headline} */}
					</span>
				</div>
			</div>
			<hr className="line" />
		</div>
	);
};

export default PostReactedUserItem;
