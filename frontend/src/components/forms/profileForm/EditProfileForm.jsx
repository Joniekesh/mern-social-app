import "./profileForm.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { createProfile } from "../../../redux/actions/profileActions";

const EditProfileForm = () => {
	const [isOpen, setIsOpen] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const userInfo = JSON.parse(localStorage.getItem("token"));
	const isAuthenticated = userInfo?.token;

	const auth = useSelector((state) => state.auth);
	const { userInfo: user } = auth;

	const {
		state: { profile },
	} = useLocation();

	const initialState = {
		status: profile.status,
		company: profile.company,
		website: profile.website,
		location: profile.location,
		skills: profile.skills,
		githubusername: profile.githubusername,
		headline: profile.headline,
		bio: profile.bio,
		linkedin: profile.social.linkedin,
		facebook: profile.social.facebook,
		twitter: profile.social.twitter,
		instagram: profile.social.instagram,
		youtube: profile.social.youtube,
	};

	const [formData, setFormdata] = useState(initialState);

	const {
		status,
		company,
		website,
		location,
		skills,
		githubusername,
		headline,
		bio,
		linkedin,
		facebook,
		twitter,
		instagram,
		youtube,
	} = formData;

	const onChange = (e) => {
		setFormdata({ ...formData, [e.target.name]: e.target.value });
	};

	const submitHandler = (e) => {
		e.preventDefault();

		if (isAuthenticated && profile.user._id === user._id) {
			dispatch(createProfile(formData));
			toast.success("Profile Updated", { theme: "colored" });
			navigate("/dashboard");
		}
	};

	return (
		<div className="profileForm">
			<div className="createProfileIntro">
				<i className="fa-solid fa-user"></i>
				<h1>Update Your Profile</h1>
			</div>
			<hr className="line" />
			<small>* = required field</small>

			<form className="createProfileFormDiv" onSubmit={submitHandler}>
				<div className="formGroup">
					<select name="status" value={status} onChange={onChange}>
						<option>* Select Professional Status</option>
						<option value="Developer">Developer</option>
						<option value="Junior Developer">Junior Developer</option>
						<option value="Senior Developer">Senior Developer</option>
						<option value="Manager">Manager</option>
						<option value="Student or Learning">Student or Learning</option>
						<option value="Instructor or Teacher">Instructor or Teacher</option>
						<option value="Intern">Intern</option>
						<option value="Other">Other</option>
					</select>
					<small>Give an idea of where you are at in your career</small>
				</div>
				<div className="formGroup">
					<input
						type="text"
						placeholder="Company"
						name="company"
						value={company}
						onChange={onChange}
					/>
					<small>Could be your own company or one you work for</small>
				</div>
				<div className="formGroup">
					<input
						type="text"
						placeholder="Website"
						name="website"
						value={website}
						onChange={onChange}
					/>
					<small>Could be your own or company website</small>
				</div>
				<div className="formGroup">
					<input
						type="text"
						placeholder="Location"
						name="location"
						value={location}
						onChange={onChange}
					/>
					<small>City and Country (eg. Enugu, Nigeria )</small>
				</div>
				<div className="formGroup">
					<input
						type="text"
						placeholder="* Skills"
						name="skills"
						value={skills}
						onChange={onChange}
					/>
					<small>
						Please use comma separated values (eg. HTML,CSS,Javascript,Python)
					</small>
				</div>
				<div className="formGroup">
					<input
						type="text"
						placeholder="Github username"
						name="githubusername"
						value={githubusername}
						onChange={onChange}
					/>
					<small>Please provide your github username</small>
				</div>
				<div className="formGroup">
					<textarea
						style={{ height: "max-content" }}
						placeholder="A headline describing your key skills"
						name="headline"
						value={headline}
						onChange={onChange}
					/>
					<small>Tell us your key stack and skills</small>
				</div>
				<div className="formGroup">
					<textarea
						placeholder="A short bio of yourself"
						name="bio"
						value={bio}
						onChange={onChange}
					/>
					<small>Tell us a little about yourself</small>
				</div>
				<div className="socialLinkBtn">
					<button type="button" onClick={() => setIsOpen(!isOpen)}>
						Add Social Links
					</button>
					<span>Optional</span>
				</div>
				{isOpen && (
					<div className="socialInput">
						<div className="formGroup social">
							<i
								className="fa-brands fa-linkedin-in"
								style={{ color: "#0e76a8" }}
							></i>
							<input
								type="text"
								placeholder="Linkedin URL"
								name="linkedin"
								value={linkedin}
								onChange={onChange}
							/>
						</div>
						<div className="formGroup social ">
							<i
								className="fa-brands fa-facebook-f"
								style={{ color: "#4267B2" }}
							></i>
							<input
								type="text"
								placeholder="Facebook URL"
								name="facebook"
								value={facebook}
								onChange={onChange}
							/>
						</div>
						<div className="formGroup social">
							<i
								className="fa-brands fa-twitter"
								style={{ color: "#00acee" }}
							></i>
							<input
								type="text"
								placeholder="Twitter URL"
								name="twitter"
								value={twitter}
								onChange={onChange}
							/>
						</div>
						<div className="formGroup social">
							<i
								className="fa-brands fa-instagram"
								style={{ color: "#8a3ab9" }}
							></i>
							<input
								type="text"
								placeholder="Instagram URL"
								name="instagram"
								value={instagram}
								onChange={onChange}
							/>
						</div>
						<div className="formGroup social">
							<i
								className="fa-brands fa-youtube"
								style={{ color: "#c4302b" }}
							></i>
							<input
								type="text"
								placeholder="YouTube URL"
								name="youtube"
								value={youtube}
								onChange={onChange}
							/>
						</div>
					</div>
				)}
				<button type="submit" className="createprofileSubmitBtn">
					Update
				</button>
			</form>
			<Link to="/dashboard">
				<button className="createProfileGoBackBtn">Go Back</button>
			</Link>
		</div>
	);
};

export default EditProfileForm;
