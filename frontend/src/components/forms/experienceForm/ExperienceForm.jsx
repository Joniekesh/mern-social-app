import "./experienceForm.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const initialState = {
	title: "",
	company: "",
	location: "",
	from: "",
	to: "",
	current: "",
	description: "",
};

const ExperienceForm = () => {
	const [formdata, setFormdata] = useState(initialState);

	const { title, company, location, from, to, current, description } = formdata;

	const onChange = (e) => {
		setFormdata({ ...formdata, [e.target.name]: e.target.value });
	};

	const submitHandler = (e) => {
		e.preventDefault();
	};

	return (
		<div className="experienceForm">
			<div className="experienceFormIntro">
				<i className="fa-solid fa-briefcase"></i>
				<h1>Add An Experience</h1>
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
						placeholder="Location"
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
							onChange={() => setFormdata({ ...formdata, current: !current })}
						/>{" "}
						<h4>Current Job</h4>
					</p>
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
				<Link to="/profiles/111">
					<button type="button" className="experienceBackBtn">
						Go Back
					</button>
				</Link>
			</form>
		</div>
	);
};

export default ExperienceForm;
