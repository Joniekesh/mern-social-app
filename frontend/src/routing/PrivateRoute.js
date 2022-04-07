import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Spinner from "../components/spinner/Spinner";

const PrivateRoute = ({ component: Component }) => {
	const userLogin = useSelector((state) => state.userLogin);
	const { isAuthenticated, loading } = userLogin;

	if (loading) return <Spinner />;
	if (isAuthenticated) return <Component />;

	return <Navigate to="/login" />;
};

export default PrivateRoute;
