import "./home.css";
import { useEffect } from "react";
import RightBar from "../../components/rightBar/RightBar";
import PostItem from "../../components/postItem/PostItem";
import LeftBar from "../../components/leftBar/LeftBar";
import HomeTop from "../../components/homeTop/HomeTop";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/actions/postActions";
import Spinner from "../../components/spinner/Spinner";
import { getCurrentProfile } from "../../redux/actions/prifileActions";

const Home = () => {
	const dispatch = useDispatch();

	const user = useSelector((state) => state.user);
	const { users } = user;

	const post = useSelector((state) => state.post);
	const { posts, loading } = post;

	const profile = useSelector((state) => state.profile);
	const { profile: currentProfile } = profile;

	useEffect(() => {
		dispatch(getPosts());
	}, [dispatch]);

	useEffect(() => {
		dispatch(getCurrentProfile());
	}, []);

	return (
		<div className="home">
			{loading ? (
				<Spinner />
			) : (
				<div className="container">
					<div className="homeWrapper">
						<LeftBar profile={currentProfile} />

						<div className="homeCenter">
							<HomeTop />
							{posts && posts.length > 0 ? (
								<div className="homeCenterPostLists">
									{posts.map((post) => (
										<PostItem post={post} key={post._id} />
									))}
								</div>
							) : (
								<h4>No Posts to show</h4>
							)}
						</div>
						<RightBar users={users} />
					</div>
				</div>
			)}
		</div>
	);
};

export default Home;
