import "./profileForm.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const initialState = {
	status: "",
	company: "",
	website: "",
	location: "",
	skills: "",
	githubusername: "",
	bio: "",
	linkedin: "",
	facebook: "",
	twitter: "",
	instagram: "",
};

const ProfileForm = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [formdata, setFormdata] = useState(initialState);

	const {
		status,
		company,
		website,
		location,
		skills,
		githubusername,
		bio,
		linkedin,
		facebook,
		twitter,
		instagram,
	} = formdata;

	const onChange = (e) => {
		setFormdata({ ...formdata, [e.target.name]: e.target.value });
	};

	const submitHandler = (e) => {
		e.preventDefault();
	};

	return (
		<div className="profileForm">
			<div className="createProfileIntro">
				<i className="fa-solid fa-user"></i>
				<h1>Create Your Profile</h1>
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
					<small>City and Country suggested (eg. Enugu, Nigeria )</small>
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
				<div
					className="formGroup"
					placeholder="Github username"
					name="githubusername"
					value={githubusername}
					onChange={onChange}
				></div>
				<div className="formGroup">
					<textarea
						placeholder="A short bio of yourself"
						name="bio"
						value={bio}
						onChange={onChange}
					/>
					<small className="textareaSmall">
						Tell us a little about yourself
					</small>
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
					</div>
				)}
				<button type="submit" className="createprofileSubmitBtn">
					Submit
				</button>
			</form>
			<Link to="/profiles/111">
				<button className="createProfileGoBackBtn">Go Back</button>
			</Link>
		</div>
	);
};

export default ProfileForm;
