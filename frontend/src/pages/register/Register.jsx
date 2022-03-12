import "./register.css";

const Register = () => {
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
						<form>
							<div className="inputGroup">
								<label>Name</label>
								<input type="text" placeholder="Full name"></input>
							</div>
							<div className="inputGroup">
								<label>Email</label>
								<input type="email" placeholder="Email"></input>
							</div>
							<div className="inputGroup">
								<label>Password</label>
								<input type="password" placeholder="Password"></input>
							</div>
							<div className="inputGroup">
								<label>Confirm Password</label>
								<input type="password" placeholder="Confirm Password"></input>
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
