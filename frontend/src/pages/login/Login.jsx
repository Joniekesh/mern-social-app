import "./login.css";

const Login = () => {
	return (
		<div className="login">
			<div className="container">
				<div className="registerWrapper">
					<div className="registerIntro">
						<h1> Welcome! </h1>
						<br />
						<span className="regIntroDesc">
							Please Login to connect with Developers and share ideas
						</span>
					</div>
					<div className="form">
						<div className="logoDiv">
							<i className="fa-solid fa-code"></i>
							<h2>DEVDOMAIN</h2>
						</div>
						<form>
							<div className="inputGroup">
								<label>Email</label>
								<input type="email" placeholder="Email"></input>
							</div>
							<div className="inputGroup">
								<label>Password</label>
								<input type="password" placeholder="Password"></input>
							</div>
							<button className="regBtn" type="submit">
								Login
							</button>
							Don't have an account?{" "}
							<span>
								<a href="/register">Register</a>
							</span>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
