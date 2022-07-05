import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateExperience } from "../../../redux/actions/prifileActions";

const ExperienceEditForm = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { isAuthenticated } = userLogin;

	const {
		state: { experience },
	} = useLocation();

	const initialState = {
		title: experience.title,
		company: experience.company,
		location: experience.location,
		from: experience.from,
		to: experience.to,
		current: false,
		description: experience.description,
	};

	const [formData, setFormData] = useState(initialState);
	const { title, company, location, from, to, current, description } = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const submitHandler = (e) => {
		e.preventDefault();
		if (isAuthenticated) {
			dispatch(updateExperience(experience._id, formData));
			toast.success("Experience Updated", { theme: "colored" });
			window.location.reload();
			navigate(-1);
		}
	};

	return (
		<div className="experienceForm">
			<div className="experienceFormIntro">
				<i className="fa-solid fa-briefcase"></i>
				<h1>Update Experience</h1>
			</div>
			<hr className="line" />
			<p>Add any experience you have had in the past</p>
			<small>* = required field</small>
			<form onSubmit={submitHandler}>
				<div className="experienceFormGroup">
					<input
						type="text"
						placeholder="* Job Title"
						name="title"
						defaultValue={title}
						onChange={onChange}
					/>
				</div>
				<div className="experienceFormGroup">
					<input
						type="text"
						placeholder="* Company"
						name="company"
						defaultValue={company}
						onChange={onChange}
					/>
				</div>
				<div className="experienceFormGroup">
					<input
						type="text"
						placeholder="Location eg (Country, City)"
						name="location"
						defaultValue={location}
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
					<h4>Current Job</h4>
				</div>
				<div className="experienceFormGroup">
					<h4>To Date</h4>
					<input type="date" name="to" onChange={onChange} disabled={current} />
				</div>
				<div className="experienceFormGroup">
					<textarea
						type="text"
						name="description"
						placeholder="Job Description"
						defaultValue={description}
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

export default ExperienceEditForm;
