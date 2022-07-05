import axios from "axios";
import {
	GET_PROFILES_FAIL,
	GET_PROFILES_REQUEST,
	GET_PROFILES_SUCCESS,
	GET_PROFILE_FAIL,
	GET_PROFILE_REQUEST,
	GET_PROFILE_SUCCESS,
} from "../constants/profilesConstants";

// Get all profiles
export const getProfiles = () => async (dispatch, getState) => {
	const { userLogin } = getState();

	const config = {
		headers: {
			Authorization: `Bearer ${userLogin.token}`,
		},
	};
	dispatch({ type: GET_PROFILES_REQUEST });

	try {
		const { data } = await axios.get("/profiles", config);

		dispatch({
			type: GET_PROFILES_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: GET_PROFILES_FAIL,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Get profile by user ID
export const getProfileById = (userId) => async (dispatch, getState) => {
	const { userLogin } = getState();
	const config = {
		headers: {
			Authorization: `Bearer ${userLogin.token}`,
		},
	};

	dispatch({ type: GET_PROFILE_REQUEST });

	try {
		const { data } = await axios.get(`/profiles/user/${userId}`, config);

		dispatch({
			type: GET_PROFILE_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: GET_PROFILE_FAIL,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};
