import "./experienceForm.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addExperience } from "../../../redux/actions/prifileActions";
import { toast } from "react-toastify";

const initialState = {
	title: "",
	company: "",
	location: "",
	from: "",
	to: "",
	current: false,
	description: "",
};

const ExperienceForm = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [formData, setFormData] = useState(initialState);
	const { title, company, location, from, to, current, description } = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const submitHandler = (e) => {
		e.preventDefault();
		if (!title) {
			toast.error("Title is required", { theme: "colored" });
		} else if (!company) {
			toast.error("Company name where you worked/working is required", {
				theme: "colored",
			});
		} else if (!from) {
			toast.error("Year you started work is required", { theme: "colored" });
		} else {
			dispatch(addExperience(formData));
			toast.success("Experience Added", { theme: "colored" });
			navigate("/dashboard");
			window.location.reload();
		}
	};

	return (
		<div className="experienceForm">
			<div className="experienceFormIntro">
				<i className="fa-solid fa-briefcase"></i>
				<h1>Add Experience</h1>
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
						value={title}
						onChange={onChange}
					/>
				</div>
				<div className="experienceFormGroup">
					<input
						type="text"
						placeholder="* Company"
						name="company"
						value={company}
						onChange={onChange}
					/>
				</div>
				<div className="experienceFormGroup">
					<input
						type="text"
						placeholder="Location eg (Country, City)"
						name="location"
						value={location}
						onChange={onChange}
					/>
				</div>
				<div className="experienceFormGroup">
					<h4>From Date</h4>
					<input type="date" name="from" onChange={onChange} value={from} />
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
						onChange={onChange}
					></textarea>
				</div>
				<button type="submit" className="experienceFormGroupBtn">
					Submit
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

export default ExperienceForm;
