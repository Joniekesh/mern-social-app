import "./postReactedUserItem.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfiles } from "../../redux/actions/profilesActions";
import { useEffect } from "react";
import { toast } from "react-toastify";

const PostReactedUserItem = ({ like }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const profiles = useSelector((state) => state.profiles);
	const { profiles: userProfiles } = profiles;

	const auth = useSelector((state) => state.auth);
	const { userInfo } = auth;

	const profileExist = userProfiles.some(
		(userProfile) => userProfile.user?._id === like.user
	);

	useEffect(() => {
		dispatch(getProfiles());
	}, [dispatch]);

	const handleNavigate = () => {
		if (profileExist) {
			if (userInfo._id === like.user) {
				navigate("/dashboard");
			} else {
				navigate(`/profiles/${like.user}`);
			}
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
				</div>
			</div>
			<hr className="line" />
		</div>
	);
};

export default PostReactedUserItem;
