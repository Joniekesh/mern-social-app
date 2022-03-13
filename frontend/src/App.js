import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import Alert from "./components/alert/Alert";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { useEffect } from "react";
import { loadUser } from "./redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import Profiles from "./pages/profiles/Profiles";
import Posts from "./pages/posts/Posts";

const App = () => {
	const dispatch = useDispatch();
	const token = `Bearer ${localStorage.getItem("token")}`;

	const userLogin = useSelector((state) => state.userLogin);
	const { isAuthenticated } = userLogin;

	useEffect(() => {
		if (token) {
			dispatch(loadUser());
		}
	}, [token]);
	return (
		<Router>
			<Navbar />
			<Alert />

			<Routes>
				<Route
					exact
					path="/"
					element={!isAuthenticated ? <Navigate to="/login" /> : <Home />}
				></Route>
				<Route
					path="/register"
					element={isAuthenticated ? <Navigate to="/" /> : <Register />}
				></Route>
				<Route
					path="/login"
					element={isAuthenticated ? <Navigate to="/" /> : <Login />}
				></Route>
				<Route
					path="/profiles"
					element={!isAuthenticated ? <Navigate to="/login" /> : <Profiles />}
				></Route>
				<Route
					path="/posts"
					element={!isAuthenticated ? <Navigate to="/login" /> : <Posts />}
				></Route>
			</Routes>
		</Router>
	);
};

export default App;
