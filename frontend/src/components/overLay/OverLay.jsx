import "./overLay.css";

const OverLay = ({ overLay, setOverLay, setOpenSideMenu }) => {
	const handleClick = () => {
		setOverLay(false);
		setOpenSideMenu(false);
	};

	return overLay && <div className="overLay" onClick={handleClick}></div>;
};

export default OverLay;
