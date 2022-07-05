import axios from "axios";
import {
	GET_PROFILE,
	PROFILE_ERROR,
	UPDATE_PROFILE,
	REMOVE_EDUCATION,
	REMOVE_EXPERIENCE,
	UPDATE_EXPERIENCE,
	UPDATE_EDUCATION,
	GET_GIT_REPOS,
	GIT_REPOS_ERROR,
	CLEAR_PROFILE,
	DELETE_ACCOUNT,
} from "../constants/profileConstants";

// Get loggedin user profile
export const getCurrentProfile = () => async (dispatch, getState) => {
	const { userLogin } = getState();

	const config = {
		headers: {
			Authorization: `Bearer ${userLogin.token}`,
		},
	};

	try {
		const { data } = await axios.get("/profiles/me", config);
		dispatch({
			type: GET_PROFILE,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
		});
	}
};

// Create profile
export const createProfile = (formData) => async (dispatch, getState) => {
	const { userLogin } = getState();

	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userLogin.token}`,
		},
	};

	try {
		const data = await axios.post("/profiles", formData, config);

		dispatch({
			type: UPDATE_PROFILE,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

// Add Profile education
export const addEducation = (formData) => async (dispatch, getState) => {
	const { userLogin } = getState();

	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userLogin.token}`,
		},
	};

	try {
		const { data } = await axios.post("/profiles/education", formData, config);

		dispatch({
			type: UPDATE_PROFILE,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

// Update Profile Education
export const updateEducation = (id, formData) => async (dispatch, getState) => {
	const { userLogin } = getState();

	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userLogin.token}`,
		},
	};

	try {
		const { data } = await axios.put(
			`/profiles/education/${id}`,
			formData,
			config
		);

		dispatch({
			type: UPDATE_EDUCATION,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

// Delete Profile Education
export const deleteEducation = (id) => async (dispatch, getState) => {
	const { userLogin } = getState();

	const config = {
		headers: {
			Authorization: `Bearer ${userLogin.token}`,
		},
	};

	try {
		if (window.confirm("Are you SURE?")) {
			await axios.delete(`/profiles/education/${id}`, config);

			dispatch({
				type: REMOVE_EDUCATION,
				payload: id,
			});
		}
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

// Add Profile Experience
export const addExperience = (formData) => async (dispatch, getState) => {
	const { userLogin } = getState();

	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userLogin.token}`,
		},
	};

	try {
		const data = await axios.post("/profiles/experience", formData, config);

		dispatch({
			type: UPDATE_PROFILE,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

// Update Profile Experience
export const updateExperience =
	(id, formData) => async (dispatch, getState) => {
		const { userLogin } = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userLogin.token}`,
			},
		};

		try {
			const { data } = await axios.put(
				`/profiles/experience/${id}`,
				formData,
				config
			);

			dispatch({
				type: UPDATE_EXPERIENCE,
				payload: data,
			});
		} catch (err) {
			dispatch({
				type: PROFILE_ERROR,
				payload: {
					msg: err.response.statusText,
					status: err.response.status,
				},
			});
		}
	};

// Delete Profile Experience
export const deleteExperience = (id) => async (dispatch, getState) => {
	const { userLogin } = getState();

	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userLogin.token}`,
		},
	};

	try {
		if (window.confirm("Are you SURE?")) {
			await axios.delete(`/profiles/experience/${id}`, config);
			dispatch({
				type: REMOVE_EXPERIENCE,
				payload: id,
			});
		}
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
		});
	}
};

// Get Github Repositories
export const getGitRepos = (username) => async (dispatch, getState) => {
	const { userLogin } = getState();

	const config = {
		headers: {
			"content-type": "application/json",
			Authorization: `Bearer ${userLogin.token}`,
		},
	};

	try {
		const { data } = await axios.get(`/profiles/github/${username}`, config);

		dispatch({
			type: GET_GIT_REPOS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: GIT_REPOS_ERROR,
		});
	}
};

// Delete Account (removes profile, posts and user)
export const deleteAccount = () => async (dispatch, getState) => {
	const { userLogin } = getState();

	const config = {
		headers: {
			Authorization: `Bearer ${userLogin.token}`,
		},
	};

	try {
		if (
			window.confirm(
				"Are You SURE? Your posts and profile will be PERMANENTLY deleted as well.This can NOT be UNDONE!"
			)
		) {
			await axios.delete("/profiles", config);

			dispatch({ type: DELETE_ACCOUNT });
			dispatch({ type: CLEAR_PROFILE });
		}
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.statusText,
			},
		});
	}
};
