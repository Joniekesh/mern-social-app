import { useSelector } from "react-redux";

const Alert = () => {
	const alert = useSelector((state) => state.alert);
	const { alert: alerts } = alert;
	return (
		<div className="alertWrapper">
			{alerts !== null &&
				alerts?.length > 0 &&
				alerts.map((alert) => (
					<div className={`alert alert-${alert.alertType}`} key={alert.id}>
						{alert.msg}
					</div>
				))}
		</div>
	);
};

export default Alert;
