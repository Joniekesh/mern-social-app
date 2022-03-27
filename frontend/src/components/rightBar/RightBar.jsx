import "./rightBar.css";

const RightBar = () => {
	return (
		<div className="homeRight">
			<h4 className="homeRigthText">Follow users for wider connections</h4>
			<div className="homerightLists">
				<div className="homeRightListitem">
					<div className="homeRightTop">
						<img className="homeRightImg" src="/assets/profile.jpeg" alt="" />
						<div>
							<p className="userName">Brad Traversy</p>
							<span className="userDesc">
								Instructor and content Creator at Traversy Media
							</span>
						</div>
					</div>
					<div className="homeRightBottom">
						<span className="plusSign">+</span>
						<span>Follow</span>
					</div>

					<hr className="line" />
				</div>

				<div className="homeRightListitem">
					<div className="homeRightTop">
						<img className="homeRightImg" src="/assets/profile.jpeg" alt="" />
						<div>
							<p className="userName">Brad Traversy</p>
							<span className="userDesc">
								Instructor and content Creator at Traversy Media
							</span>
						</div>
					</div>
					<div className="homeRightBottom">
						<span className="plusSign">+</span>
						<span>Follow</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RightBar;
