import "./homeTop.css";
import { useSelector } from "react-redux";

const HomeTop = ({ setOpenCreatePost }) => {
	const auth = useSelector((state) => state.auth);
	const { userInfo } = auth;

	return (
		<div
			className="homeCenterPostCreate"
			onClick={() => setOpenCreatePost(true)}
		>
			<div className="homeCenterTopDiv">
				<img src={userInfo?.profilePic} alt="" />
				<input type="text" placeholder="Write a post..." />
			</div>
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
