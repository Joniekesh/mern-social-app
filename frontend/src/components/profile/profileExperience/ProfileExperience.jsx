import "./profileExperience.css";

const ProfileExperience = () => {
	return (
		<>
			<div className="experienceListItem">
				<img className="companyImg" src="/assets/companyImg.jpeg" alt="" />
				<div className="experienceDesc">
					<div className="experienceDescDiv">
						<p className="experienceUser">Full Stack Developer</p>
						<div className="experienceActionDiv"></div>
					</div>
					<span>Self Employed</span>
					<div className="experienceDate">
						<span>Feb 2019 - Present</span>
						<span>3yrs 2 mos</span>
					</div>
				</div>
				<div className="experienceActions">
					<i className="fa-solid fa-pen experienceEdit"></i>
					<i className="fa-solid fa-trash-can experienceDelete"></i>
				</div>
			</div>
			<hr className="line" />
		</>
	);
};

export default ProfileExperience;
