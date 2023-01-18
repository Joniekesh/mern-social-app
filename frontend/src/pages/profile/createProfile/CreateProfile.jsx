import ProfileForm from "../../../components/forms/profileForm/ProfileForm";
import "./createProfile.css";

const CreateProfile = () => {
	return (
		<div className="createProfile">
			<div className="container">
				<div className="createProfileWrapper">
					<ProfileForm />
				</div>
			</div>
		</div>
	);
};

export default CreateProfile;
