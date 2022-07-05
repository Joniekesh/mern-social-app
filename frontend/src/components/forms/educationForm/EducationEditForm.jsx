import "./educationForm.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { updateEducation } from "../../../redux/actions/prifileActions";
import { toast } from "react-toastify";

const EducationEditForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const userLogin = useSelector((state) => state.userLogin);
	const { user, isAuthenticated } = userLogin;

	const profile = useSelector((state) => state.profile);
	const { profile: currentProfile } = profile;

	const {
		state: { education },
	} = useLocation();

	const initialState = {
		school: education.school,
		degree: education.degree,
		fieldofstudy: education.fieldofstudy,
		from: education.from,
		to: education.to,
		current: false,
		description: education.description,
	};
	const [formData, setFormData] = useState(initialState);

	const { school, degree, fieldofstudy, from, to, current, description } =
		formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const submitHandler = (e) => {
		e.preventDefault();
		if (isAuthenticated && user._id === currentProfile.user._id) {
			dispatch(updateEducation(education._id, formData));
			toast.success("Education Updated", { theme: "colored" });
			window.location.reload();
			navigate(-1);
		}
	};

	return (
		<div className="experienceForm">
			<div className="experienceFormIntro">
				<i className="fa-solid fa-graduation-cap"></i>
				<h1>Update Education</h1>
			</div>
			<hr className="line" />
			<p>Add any school you have attended</p>
			<small>* = required field</small>
			<form onSubmit={submitHandler}>
				<div className="experienceFormGroup">
					<input
						type="text"
						placeholder="* School"
						name="school"
						defaultValue={school}
						onChange={onChange}
						required
					/>
				</div>
				<div className="experienceFormGroup">
					<input
						type="text"
						placeholder="* Degree or Certificate"
						name="degree"
						defaultValue={degree}
						onChange={onChange}
						required
					/>
				</div>
				<div className="experienceFormGroup">
					<input
						type="text"
						placeholder="Field of Study"
						name="fieldofstudy"
						defaultValue={fieldofstudy}
						onChange={onChange}
					/>
				</div>
				<div className="experienceFormGroup">
					<h4>From Date</h4>
					<input
						type="date"
						name="from"
						onChange={onChange}
						defaultValue={from}
					/>
				</div>
				<div className="experienceFormGroup">
					<p>
						<input
							type="checkbox"
							name="current"
							checked={current}
							onChange={() => setFormData({ ...formData, current: !current })}
						/>{" "}
					</p>
					<h4>Current School</h4>
				</div>
				<div className="experienceFormGroup">
					<h4>To Date</h4>
					<input type="date" name="to" onChange={onChange} disabled={current} />
				</div>
				<div className="experienceFormGroup">
					<textarea
						type="text"
						name="description"
						defaultValue={description}
						placeholder="Program Description"
						onChange={onChange}
					></textarea>
				</div>
				<button type="submit" className="experienceFormGroupBtn">
					Update
				</button>
				<Link to="/dashboard">
					<button type="button" className="experienceBackBtn">
						Go Back
					</button>
				</Link>
			</form>
		</div>
	);
};

export default EducationEditForm;
