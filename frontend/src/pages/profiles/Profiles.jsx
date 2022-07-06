import "./profiles.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfiles } from "../../redux/actions/profilesActions";
import Spinner from "../../components/spinner/Spinner";
import ProfilesItem from "../../components/profile/profilesItem/ProfilesItem";
const Profiles = () => {
	const dispatch = useDispatch();

	const profiles = useSelector((state) => state.profiles);
	const { profiles: allProfiles, loading } = profiles;

	useEffect(() => {
		dispatch(getProfiles());
	}, [dispatch]);

	return (
		<div className="profiles">
			<div className="container">
				{loading ? (
					<Spinner />
				) : (
					<div className="profilesWrapper">
						<h1>Developers</h1>
						<div className="profilesWrapperDiv">
							<div className="profilesWrapperIntro">
								<i className="fa-solid fa-code"></i>
								<p>Browse and connect with developers</p>
							</div>
							<div className="profilesLists">
								{allProfiles?.length > 0 ? (
									allProfiles.map((profile) => (
										<ProfilesItem profile={profile} key={profile._id} />
									))
								) : (
									<h4>No Developers to show</h4>
								)}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Profiles;
