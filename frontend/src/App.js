import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/navbar/Navbar";
import PrivateRoute from "./routing/PrivateRoute";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { useEffect, useState } from "react";
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
import SideMenu from "./components/sideMenu/SideMenu";
import OverLay from "./components/overLay/OverLay";

const App = () => {
	const [overLay, setOverLay] = useState(false);
	const [openSideMenu, setOpenSideMenu] = useState(false);

	const userLogin = useSelector((state) => state.userLogin);
	const dispatch = useDispatch();

	const { isAuthenticated } = userLogin;

	const token = `Bearer ${localStorage.getItem("token")}`;

	useEffect(() => {
		if (token) {
			dispatch(loadUser());
		}
	}, [token, dispatch]);

	return (
		<Router>
			<div>
				<ToastContainer />
			</div>
			<SideMenu
				setOverLay={setOverLay}
				openSideMenu={openSideMenu}
				setOpenSideMenu={setOpenSideMenu}
			/>
			<OverLay
				overLay={overLay}
				setOverLay={setOverLay}
				setOpenSideMenu={setOpenSideMenu}
			/>
			<Navbar
				openSideMenu={openSideMenu}
				setOverLay={setOverLay}
				setOpenSideMenu={setOpenSideMenu}
			/>

			<Routes>
				<Route
					exact
					path="/"
					element={
						<PrivateRoute>
							<Home />
						</PrivateRoute>
					}
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
					element={
						<PrivateRoute>
							<CreatePost />
						</PrivateRoute>
					}
				></Route>
				<Route
					path="/editPost"
					element={
						<PrivateRoute>
							<EditPost />
						</PrivateRoute>
					}
				></Route>
				<Route
					path="/editComment/:postId"
					element={
						<PrivateRoute>
							<EditComment />
						</PrivateRoute>
					}
				></Route>
				<Route
					path="/editCommentReply/:postId/:commentId"
					element={
						<PrivateRoute>
							<EditCommentReply />
						</PrivateRoute>
					}
				></Route>
				<Route
					path="/posts/:postId"
					element={
						<PrivateRoute>
							<SinglePost />
						</PrivateRoute>
					}
				></Route>
				<Route
					path="/posts/:postId/postReactedUsers"
					element={
						<PrivateRoute>
							<PostReactedUsers />
						</PrivateRoute>
					}
				></Route>
				<Route
					path="/posts/:postId/comments/:commentid"
					element={
						<PrivateRoute>
							<CommentReply />
						</PrivateRoute>
					}
				></Route>
				<Route
					path="/posts/:postId/comments/:commentId/commentReactedUsers"
					element={
						<PrivateRoute>
							<CommentReactedUser />
						</PrivateRoute>
					}
				></Route>
				<Route
					path="/posts/:postId/comments/:commentId/replies/:replyId/replyReactedUsers"
					element={
						<PrivateRoute>
							<ReplyReactedUser />
						</PrivateRoute>
					}
				></Route>
				<Route
					path="/dashboard"
					element={
						<PrivateRoute>
							<Dashboard />
						</PrivateRoute>
					}
				></Route>
				<Route
					path="/profiles/:id"
					element={
						<PrivateRoute>
							<Profile />
						</PrivateRoute>
					}
				></Route>
				<Route
					path="/profiles"
					element={
						<PrivateRoute>
							<Profiles />
						</PrivateRoute>
					}
				></Route>

				<Route
					path="/createProfile"
					element={
						<PrivateRoute>
							<CreateProfile />
						</PrivateRoute>
					}
				></Route>
				<Route
					path="/editProfile"
					element={
						<PrivateRoute>
							<EditProfile />
						</PrivateRoute>
					}
				></Route>
				<Route
					path="/experience"
					element={
						<PrivateRoute>
							<Experience />
						</PrivateRoute>
					}
				></Route>
				<Route
					path="/editExperience"
					element={
						<PrivateRoute>
							<ExperienceEdit />
						</PrivateRoute>
					}
				></Route>
				<Route
					path="/education"
					element={
						<PrivateRoute>
							<Education />
						</PrivateRoute>
					}
				></Route>
				<Route
					path="/editEducation"
					element={
						<PrivateRoute>
							<EducationEdit />
						</PrivateRoute>
					}
				></Route>
				<Route
					path="/settings"
					element={
						<PrivateRoute>
							<Settings />
						</PrivateRoute>
					}
				></Route>
			</Routes>
		</Router>
	);
};

export default App;
