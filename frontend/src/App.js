import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { useEffect } from "react";
import { loadUser } from "./redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import Profiles from "./pages/profiles/Profiles";
import Profile from "./pages/profile/Profile";
import SinglePost from "./pages/singlePost/SinglePost";
import Reply from "./pages/reply/Reply";
import PostReactedUsers from "./pages/postReactedUsers/PostReactedUsers";
import CommentReactedUser from "./pages/commentReactedUser/CommentReactedUser";
import ReplyReactedUser from "./pages/replyReactedUser/ReplyReactedUser";
import CreatePost from "./pages/createPost/CreatePost";
import CreateProfile from "./pages/profile/createProfile/CreateProfile";
import Experience from "./pages/profile/experience/Experience";
import Education from "./pages/profile/education/Education";
import Settings from "./pages/settings/Settings";

const App = () => {
	const dispatch = useDispatch();
	const token = `Bearer ${localStorage.getItem("token")}`;

	const userLogin = useSelector((state) => state.userLogin);
	const { isAuthenticated } = userLogin;

	useEffect(() => {
		if (token) {
			dispatch(loadUser());
		}
	}, [token, dispatch]);
	return (
		<Router>
			<Navbar />

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
				<Route path="/createPost" element={<CreatePost />}></Route>
				<Route path="/:postId" element={<SinglePost />}></Route>
				<Route
					path="/:postId/comment/:commentId/replies"
					element={<Reply />}
				></Route>
				<Route
					path="/:postId/postReactedUsers"
					element={<PostReactedUsers />}
				></Route>

				<Route
					path="/:postId/comment/:commentId/commentReactedUsers"
					element={<CommentReactedUser />}
				></Route>
				<Route
					path="/:postId/comment/:commentId/reply/:replyId/replyReactedUsers"
					element={<ReplyReactedUser />}
				></Route>
				<Route path="/profiles" element={<Profiles />}></Route>
				<Route path="/profiles/:id" element={<Profile />}></Route>
				<Route path="/createProfile" element={<CreateProfile />}></Route>
				<Route path="/experience" element={<Experience />}></Route>
				<Route path="/education" element={<Education />}></Route>
				<Route path="/settings" element={<Settings />}></Route>
			</Routes>
		</Router>
	);
};

export default App;
