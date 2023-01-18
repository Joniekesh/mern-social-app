import { toast } from "react-toastify";
import { axiosInstance } from "../../utils/config";
import {
	createProfileFailure,
	createProfileRequest,
	createProfileSuccess,
	getProfileFailure,
	getProfileRequest,
	getProfileSuccess,
	addProfileEducation,
	updateProfileEducation,
	addProfileExperience,
	updateProfileExperience,
	deleteProfileEducation,
	deleteProfileExperience,
	getCurrentUserRepoRequest,
	getCurrentUserRepoSuccess,
	getCurrentUserRepoFailure,
} from "../reducers/profileRedux";

// Get loggedin user profile
export const getCurrentProfile = () => async (dispatch) => {
	const userInfo = JSON.parse(localStorage.getItem("token"));

	const config = {
		headers: {
			Authorization: `Bearer ${userInfo?.token}`,
		},
	};

	dispatch(getProfileRequest());
	try {
		const { data } = await axiosInstance.get("/profiles/me", config);
		dispatch(getProfileSuccess(data));
	} catch (err) {
		dispatch(getProfileFailure());
	}
};

// Create profile
export const createProfile = (formData) => async (dispatch) => {
	const userInfo = JSON.parse(localStorage.getItem("token"));

	const config = {
		headers: {
			Authorization: `Bearer ${userInfo?.token}`,
		},
	};
	dispatch(createProfileRequest());
	try {
		const res = await axiosInstance.post("/profiles", formData, config);
		if (res.status === 200) {
			dispatch(createProfileSuccess(res.data));
		}
	} catch (err) {
		dispatch(createProfileFailure());
	}
};

// Add Profile education
export const addEducation = (formData) => async (dispatch) => {
	const userInfo = JSON.parse(localStorage.getItem("token"));

	const config = {
		headers: {
			Authorization: `Bearer ${userInfo?.token}`,
		},
	};
	try {
		const res = await axiosInstance.post(
			"/profiles/education",
			formData,
			config
		);

		if (res.status === 200) {
			dispatch(addProfileEducation(res.data));
			toast.success("Education Added", { theme: "colored" });
		}
	} catch (err) {
		console.log(err);
	}
};

// Update Profile Education
export const updateEducation = (id, formData) => async (dispatch) => {
	const userInfo = JSON.parse(localStorage.getItem("token"));

	const config = {
		headers: {
			Authorization: `Bearer ${userInfo?.token}`,
		},
	};

	try {
		const res = await axiosInstance.put(
			`/profiles/education/${id}`,
			formData,
			config
		);
		if (res.status === 200) {
			dispatch(updateProfileEducation(res.data));
			toast.success("Education Updated", { theme: "colored" });
		}
	} catch (err) {
		console.log(err);
	}
};

// Delete Profile Education
export const deleteEducation = (id) => async (dispatch) => {
	const userInfo = JSON.parse(localStorage.getItem("token"));

	const config = {
		headers: {
			Authorization: `Bearer ${userInfo?.token}`,
		},
	};

	try {
		if (window.confirm("Are you SURE?")) {
			const res = await axiosInstance.delete(
				`/profiles/education/${id}`,
				config
			);

			if (res.status === 200) {
				dispatch(deleteProfileEducation(res.data));
				toast.success("Education Deleted", { theme: "colored" });
			}
		}
	} catch (err) {
		console.log(err);
	}
};

// Add Profile Experience
export const addExperience = (formData) => async (dispatch) => {
	const userInfo = JSON.parse(localStorage.getItem("token"));

	const config = {
		headers: {
			Authorization: `Bearer ${userInfo?.token}`,
		},
	};

	try {
		const res = await axiosInstance.post(
			"/profiles/experience",
			formData,
			config
		);
		if (res.status === 200) {
			dispatch(addProfileExperience(res.data));
			toast.success("Experience Added", { theme: "colored" });
		}
	} catch (err) {
		dispatch(console.log(err));
	}
};

// Update Profile Experience
export const updateExperience = (id, formData) => async (dispatch) => {
	const userInfo = JSON.parse(localStorage.getItem("token"));

	const config = {
		headers: {
			Authorization: `Bearer ${userInfo?.token}`,
		},
	};

	try {
		const { data } = await axiosInstance.put(
			`/profiles/experience/${id}`,
			formData,
			config
		);

		dispatch(updateProfileExperience(data));
	} catch (err) {
		dispatch(console.log(err));
	}
};

// Delete Profile Experience
export const deleteExperience = (id) => async (dispatch) => {
	const userInfo = JSON.parse(localStorage.getItem("token"));

	const config = {
		headers: {
			Authorization: `Bearer ${userInfo?.token}`,
		},
	};

	try {
		if (window.confirm("Are you SURE?")) {
			const res = await axiosInstance.delete(
				`/profiles/experience/${id}`,
				config
			);

			if (res.status === 200) {
				dispatch(deleteProfileExperience(res.data));
				toast.success("Experience Deleted", { theme: "colored" });
			}
		}
	} catch (err) {
		console.log(err);
	}
};

// Get Github Repositories
export const getGitRepos = (username) => async (dispatch) => {
	const userInfo = JSON.parse(localStorage.getItem("token"));

	const config = {
		headers: {
			Authorization: `Bearer ${userInfo?.token}`,
		},
	};
	dispatch(getCurrentUserRepoRequest());
	try {
		const res = await axiosInstance.get(`/profiles/github/${username}`, config);
		if (res.status === 200) {
			dispatch(getCurrentUserRepoSuccess(res.data));
		}
	} catch (err) {
		dispatch(getCurrentUserRepoFailure(err.response.data));
	}
};

// Delete Account (removes profile, posts and user)
export const deleteAccount = () => async (dispatch) => {
	const userInfo = JSON.parse(localStorage.getItem("token"));

	const config = {
		headers: {
			Authorization: `Bearer ${userInfo?.token}`,
		},
	};

	try {
		if (
			window.confirm(
				"Are You SURE? Your posts and profile will be PERMANENTLY deleted as well.This can NOT be UNDONE!"
			)
		) {
			await axiosInstance.delete("/profiles", config);
		}
	} catch (err) {
		// dispatch();
	}
};
