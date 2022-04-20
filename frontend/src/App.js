import "./App.css";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Alert from "./components/alert/Alert";
import PrivateRoute from "./routing/PrivateRoute";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { useEffect } from "react";
import { loadUser } from "./redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import Profiles from "./pages/profiles/Profiles";
import Profile from "./pages/profile/singleProfile/Profile";
import Dashboard from "./pages/profile/Dashboard";
import SinglePost from "./pages/singlePost/SinglePost";
import PostReactedUsers from "./pages/postReactedUsers/PostReactedUsers";
import CommentReactedUser from "./pages/commentReactedUser/CommentReactedUser";
import ReplyReactedUser from "./pages/replyReactedUser/ReplyReactedUser";
import CreatePost from "./pages/createPost/CreatePost";
import CreateProfile from "./pages/profile/createProfile/CreateProfile";
import Experience from "./pages/profile/experience/Experience";
import Education from "./pages/profile/education/Education";
import Settings from "./pages/settings/Settings";
import ExperienceEdit from "./pages/profile/experience/ExperienceEdit";
import EducationEdit from "./pages/profile/education/EducationEdit";
import EditProfile from "./pages/profile/editProfile/EditProfile";
import EditPost from "./pages/createPost/EditPost";
import CommentReply from "./pages/commentReply/CommentReply";
import EditComment from "./components/commentItem/EditComment";
import EditCommentReply from "./pages/commentReply/EditCommentReply";

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
			<Alert />

			<Routes>
				<Route
					exact
					path="/"
					element={<PrivateRoute component={Home} />}
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
					path="/createPost"
					element={<PrivateRoute component={CreatePost} />}
				></Route>
				<Route
					path="/editPost"
					element={<PrivateRoute component={EditPost} />}
				></Route>
				<Route
					path="/editComment/:postId"
					element={<PrivateRoute component={EditComment} />}
				></Route>
				<Route
					path="/editCommentReply/:postId/:commentId"
					element={<PrivateRoute component={EditCommentReply} />}
				></Route>
				<Route
					path="/posts/:postId"
					element={<PrivateRoute component={SinglePost} />}
				></Route>
				<Route
					path="/posts/:postId/postReactedUsers"
					element={<PrivateRoute component={PostReactedUsers} />}
				></Route>
				<Route
					path="/posts/:postId/comments/:commentid"
					element={<PrivateRoute component={CommentReply} />}
				></Route>
				<Route
					path="/posts/:postId/comments/:commentId/commentReactedUsers"
					element={<PrivateRoute component={CommentReactedUser} />}
				></Route>
				<Route
					path="/posts/:postId/comments/:commentId/replies/:replyId/replyReactedUsers"
					element={<PrivateRoute component={ReplyReactedUser} />}
				></Route>
				<Route
					path="/dashboard"
					element={<PrivateRoute component={Dashboard} />}
				></Route>
				<Route
					path="/profiles"
					element={<PrivateRoute component={Profiles} />}
				></Route>
				<Route
					path="/profiles/:id"
					element={<PrivateRoute component={Profile} />}
				></Route>
				<Route
					path="/createProfile"
					element={<PrivateRoute component={CreateProfile} />}
				></Route>
				<Route
					path="/editProfile"
					element={<PrivateRoute component={EditProfile} />}
				></Route>
				<Route
					path="/experience"
					element={<PrivateRoute component={Experience} />}
				></Route>
				<Route
					path="/editExperience"
					element={<PrivateRoute component={ExperienceEdit} />}
				></Route>
				<Route
					path="/education"
					element={<PrivateRoute component={Education} />}
				></Route>
				<Route
					path="/editEducation"
					element={<PrivateRoute component={EducationEdit} />}
				></Route>
				<Route
					path="/settings"
					element={<PrivateRoute component={Settings} />}
				></Route>
			</Routes>
		</Router>
	);
};

export default App;
