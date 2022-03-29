import "./settings.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Settings = () => {
	const navigate = useNavigate();

	const userLogin = useSelector((state) => state.userLogin);
	const { isAuthenticated } = userLogin;

	useEffect(() => {
		if (!isAuthenticated) {
			navigate("/login");
		}
	}, [navigate, isAuthenticated]);

	return (
		<div className="settings">
			<div className="container">
				<div className="settingsWrapper">
					<h2>Settings Page</h2>
				</div>
			</div>
		</div>
	);
};

export default Settings;
