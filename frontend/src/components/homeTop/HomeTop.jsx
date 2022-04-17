import "./homeTop.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const HomeTop = () => {
	const userLogin = useSelector((state) => state.userLogin);
	const { user } = userLogin;

	return (
		<div className="homeCenterPostCreate">
			<Link to="/createPost">
				<div className="homeCenterTopDiv">
					<img src={user?.profilePic} alt="" />
					<input type="text" placeholder="Write a post..." />
				</div>
			</Link>
			<div className="homeCenterBottom">
				<div className="bottomImg">
					<i className="fa-solid fa-image photo"></i>
					<span className="bottomText ">Photo</span>
				</div>
				<div className="bottomImg">
					<i className="fa-solid fa-video video"></i>
					<span className="bottomText">Video</span>
				</div>
				<div className="bottomImg">
					<i className="fa-solid fa-newspaper newspaper"></i>
					<span className="bottomText">Write an article</span>
				</div>
			</div>
		</div>
	);
};

export default HomeTop;
