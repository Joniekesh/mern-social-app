import "./educationForm.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const initialState = {
	school: "",
	degree: "",
	fieldofstudy: "",
	from: "",
	to: "",
	current: "",
	description: "",
};

const EducationForm = () => {
	const [formdata, setFormdata] = useState(initialState);

	const { school, degree, fieldofstudy, from, to, current, description } =
		formdata;

	const onChange = (e) => {
		setFormdata({ ...formdata, [e.target.name]: e.target.value });
	};

	const submitHandler = (e) => {
		e.preventDefault();
	};

	return (
		<div className="experienceForm">
			<div className="experienceFormIntro">
				<i className="fa-solid fa-graduation-cap"></i>
				<h1>Add An Education</h1>
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
						value={school}
						onChange={onChange}
						required
					/>
				</div>
				<div className="experienceFormGroup">
					<input
						type="text"
						placeholder="* Degree or Certificate"
						name="degree"
						value={degree}
						onChange={onChange}
						required
					/>
				</div>
				<div className="experienceFormGroup">
					<input
						type="text"
						placeholder="Field of Study"
						name="fieldofstudy"
						value={fieldofstudy}
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
						<h4>Current School</h4>
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
						placeholder="Program Description"
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

export default EducationForm;
