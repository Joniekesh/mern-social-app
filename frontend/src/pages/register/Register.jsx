import "./register.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../redux/actions/authActions";
import { toast } from "react-toastify";

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const dispatch = useDispatch();

	const submitHandler = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			toast.error("Passwords do not match", { theme: "colored" });
		} else {
			dispatch(register({ name, email, password }));
		}
	};

	return (
		<div className="register">
			<div className="container">
				<div className="registerWrapper">
					<div className="registerIntro">
						<h1> Welcome! </h1>
						<br />
						<span className="regIntroDesc">
							Please Register to connect with Developers and share ideas
						</span>
					</div>
					<div className="form">
						<div className="logoDiv">
							<i className="fa-solid fa-code"></i>
							<h2>DEVDOMAIN</h2>
						</div>
						<form onSubmit={submitHandler}>
							<div className="inputGroup">
								<label>Name</label>
								<input
									type="text"
									placeholder="Full name"
									value={name}
									onChange={(e) => setName(e.target.value)}
								></input>
							</div>
							<div className="inputGroup">
								<label>Email</label>
								<input
									type="email"
									placeholder="Email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								></input>
							</div>
							<div className="inputGroup">
								<label>Password</label>
								<input
									type="password"
									placeholder="Password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								></input>
							</div>
							<div className="inputGroup">
								<label>Confirm Password</label>
								<input
									type="password"
									placeholder="Confirm Password"
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
								></input>
							</div>
							<button className="regBtn" type="submit">
								Register
							</button>
							Alraedy have an account?{" "}
							<span>
								<a href="/login">Login</a>
							</span>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
