import "./educationForm.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addEducation } from "../../../redux/actions/prifileActions";
import { toast } from "react-toastify";

const EducationForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const userLogin = useSelector((state) => state.userLogin);
	const { user } = userLogin;

	const initialState = {
		school: "",
		degree: "",
		fieldofstudy: "",
		from: "",
		to: "",
		current: false,
		description: "",
	};
	const [formData, setFormData] = useState(initialState);

	const { school, degree, fieldofstudy, from, to, current, description } =
		formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const submitHandler = (e) => {
		e.preventDefault();
		if (!school) {
			toast.error("Name of school/bootcamp attended is required", {
				theme: "colored",
			});
		} else if (!degree) {
			toast.error("Degree/Certificate obtained is required", {
				theme: "colored",
			});
		} else if (!fieldofstudy) {
			toast.error("Field of study is required", { theme: "colored" });
		} else if (!from) {
			toast.error("Year you started school is required", { theme: "colored" });
		} else {
			dispatch(addEducation(formData));
			toast.success("Education Added", { theme: "colored" });
			navigate("/dashboard");
			window.location.reload();
		}
	};

	return (
		<div className="experienceForm">
			<div className="experienceFormIntro">
				<i className="fa-solid fa-graduation-cap"></i>
				<h1>Add Education</h1>
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
					/>
				</div>
				<div className="experienceFormGroup">
					<input
						type="text"
						placeholder="* Degree or Certificate"
						name="degree"
						value={degree}
						onChange={onChange}
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
						placeholder="Program Description"
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

export default EducationForm;
