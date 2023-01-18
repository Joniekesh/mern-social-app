import "./home.css";
import { useEffect } from "react";
import RightBar from "../../components/rightBar/RightBar";
import PostItem from "../../components/postItem/PostItem";
import LeftBar from "../../components/leftBar/LeftBar";
import HomeTop from "../../components/homeTop/HomeTop";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/actions/postActions";
import Spinner from "../../components/spinner/Spinner";
import { getRandomUsers } from "../../redux/actions/userActions";
import CreatePost from "../createPost/CreatePost";
import { useNavigate } from "react-router-dom";

const Home = ({ openCreatePost, setOpenCreatePost, setIsUpdate, isUpdate }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const user = useSelector((state) => state.user);
	const { randomUsers } = user;

	const post = useSelector((state) => state.post);
	const { posts, isLoading } = post;

	useEffect(() => {
		dispatch(getPosts());
	}, [dispatch]);

	useEffect(() => {
		dispatch(getRandomUsers());
	}, [dispatch]);

	return (
		<div className="home">
			<div className="container">
				{isLoading ? (
					<Spinner />
				) : (
					<div className="homeWrapper">
						<LeftBar />

						<div className="homeCenter">
							<HomeTop setOpenCreatePost={setOpenCreatePost} />
							{posts && posts.length > 0 ? (
								<div className="homeCenterPostLists">
									{posts.map((post) => (
										<PostItem
											type="main"
											post={post}
											key={post._id}
											setOpenCreatePost={setOpenCreatePost}
											setIsUpdate={setIsUpdate}
											isUpdate={isUpdate}
										/>
									))}
								</div>
							) : (
								<h4>No Posts to show</h4>
							)}
						</div>
						<RightBar users={randomUsers} />
					</div>
				)}
			</div>
			{openCreatePost && <CreatePost setOpenCreatePost={setOpenCreatePost} />}
		</div>
	);
};

export default Home;
