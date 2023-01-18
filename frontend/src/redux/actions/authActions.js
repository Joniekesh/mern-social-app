import { axiosInstance } from "../../utils/config";
import { toast } from "react-toastify";
import {
	getLoggedInUserFail,
	getLoggedInUserRequest,
	getLoggedInUserSuccess,
	resetUser,
	updateUserFail,
	updateUserRequest,
	updateUserSuccess,
	userloginFail,
	userloginRequest,
	userloginSuccess,
	userLogout,
	userRegisterFail,
	userRegisterRequest,
	userRegisterSuccess,
} from "../reducers/authRedux";
import { resetProfile } from "../reducers/profileRedux";

// Get loggedin user
export const loadUser = () => async (dispatch) => {
	const userInfo = JSON.parse(localStorage.getItem("token"));

	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userInfo?.token}`,
		},
	};
	try {
		dispatch(getLoggedInUserRequest());
		const res = await axiosInstance.get("/auth/me", config);

		dispatch(getLoggedInUserSuccess(res.data));
	} catch (error) {
		dispatch(getLoggedInUserFail());
	}
};

// Register user
export const register = (formData) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};
	dispatch(userRegisterRequest());
	try {
		const res = await axiosInstance.post("/auth", formData, config);

		if (res.status === 200) {
			dispatch(userRegisterSuccess(res.data));
			toast.success(res.data, { theme: "colored" });
		}
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => {
				return toast.error(error.msg, { theme: "colored" });
			});
		}

		dispatch(userRegisterFail(err.response.data));
	}
};

//Login user
export const login = (formData) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};
	dispatch(userloginRequest());
	try {
		const res = await axiosInstance.post("/auth/login", formData, config);

		if (res.status === 200) {
			dispatch(userloginSuccess(res.data));
			localStorage.setItem("token", JSON.stringify(res.data));
			toast.success("User Login Success", { theme: "colored" });
			dispatch(loadUser());
			// window.location.reload();
		}
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => toast.error(error.msg, { theme: "colored" }));
		}

		dispatch(userloginFail());
	}
};

// Update user
export const updateUser = (user) => async (dispatch) => {
	const userInfo = JSON.parse(localStorage.getItem("token"));

	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userInfo.token}`,
		},
	};

	dispatch(updateUserRequest());
	try {
		const res = await axiosInstance.put("/users/me", user, config);

		if (res.status === 200) {
			dispatch(updateUserSuccess(res.data));
			toast.success("User updated", { theme: "colored" });
			dispatch(loadUser());
		}
	} catch (err) {
		dispatch(updateUserFail(err.response.data));
	}
};

// Logout User
export const logout = () => async (dispatch) => {
	dispatch(userLogout());
	dispatch(resetProfile());
	dispatch(resetUser());
	localStorage.removeItem("token");
};
