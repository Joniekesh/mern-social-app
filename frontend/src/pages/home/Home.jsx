import "./home.css";
import RightBar from "../../components/rightBar/RightBar";
import PostItem from "../../components/postItem/PostItem";
import LeftBar from "../../components/leftBar/LeftBar";
import HomeTop from "../../components/homeTop/HomeTop";

const Home = () => {
	return (
		<div className="home">
			<div className="container">
				<div className="homeWrapper">
					<LeftBar />

					<div className="homeCenter">
						<HomeTop />

						<div className="homeCenterPostLists">
							<PostItem />
							<PostItem />
						</div>
					</div>
					<RightBar />
				</div>
			</div>
		</div>
	);
};

export default Home;
