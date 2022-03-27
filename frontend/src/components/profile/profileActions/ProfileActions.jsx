import "./profileActions.css";
import { Link } from "react-router-dom";

const ProfileActions = () => {
	return (
		<div className="profileActions">
			<ul className="profileActionsList">
				<Link to="/createProfile">
					<li className="profileActionsListItem">Create Profile</li>
				</Link>
				<Link to="/experience">
					<li className="profileActionsListItem">Add Experience</li>
				</Link>
				<Link to="/education">
					<li className="profileActionsListItem">Add Education</li>
				</Link>
			</ul>
		</div>
	);
};

export default ProfileActions;
