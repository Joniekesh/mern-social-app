import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Spinner from "../components/spinner/Spinner";

const PrivateRoute = ({ children }) => {
	const userLogin = useSelector((state) => state.userLogin);
	const { isAuthenticated, loading } = userLogin;

	if (loading) return <Spinner />;

	return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
