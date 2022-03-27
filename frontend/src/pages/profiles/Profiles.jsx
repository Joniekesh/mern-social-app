import "./profiles.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfiles } from "../../redux/actions/prifileActions";

const Profiles = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const userLogin = useSelector((state) => state.userLogin);
	const { isAuthenticated } = userLogin;

	useEffect(() => {
		if (!isAuthenticated) {
			navigate("/login");
		}
	}, [navigate, isAuthenticated]);

	useEffect(() => {
		dispatch(getProfiles());
	}, [dispatch]);
	return (
		<div className="profiles">
			<div className="container">
				<div className="profilesWrapper"></div>
			</div>
		</div>
	);
};

export default Profiles;
