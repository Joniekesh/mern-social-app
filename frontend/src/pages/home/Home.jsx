import "./home.css";
import { useEffect } from "react";
import RightBar from "../../components/rightBar/RightBar";
import PostItem from "../../components/postItem/PostItem";
import LeftBar from "../../components/leftBar/LeftBar";
import HomeTop from "../../components/homeTop/HomeTop";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/actions/postActions";
import Spinner from "../../components/spinner/Spinner";

const Home = () => {
	const dispatch = useDispatch();

	const post = useSelector((state) => state.post);
	const { posts, loading } = post;

	console.log(posts);

	useEffect(() => {
		dispatch(getPosts());
	}, [dispatch]);

	return (
		<div className="home">
			{loading ? (
				<Spinner />
			) : (
				<div className="container">
					<div className="homeWrapper">
						<LeftBar />

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
						<RightBar />
					</div>
				</div>
			)}
		</div>
	);
};

export default Home;
