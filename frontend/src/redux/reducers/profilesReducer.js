import {
	GET_PROFILES_FAIL,
	GET_PROFILES_REQUEST,
	GET_PROFILES_SUCCESS,
	GET_PROFILE_FAIL,
	GET_PROFILE_REQUEST,
	GET_PROFILE_SUCCESS,
} from "../constants/profilesConstants";

export const profilesReducer = (
	state = { profiles: [], loading: false, error: false },
	action
) => {
	const { type, payload } = action;

	switch (type) {
		case GET_PROFILES_REQUEST:
			return {
				loading: true,
			};
		case GET_PROFILES_SUCCESS:
			return {
				...state,
				loading: false,
				profiles: payload,
			};
		case GET_PROFILES_FAIL:
			return {
				loading: false,
				error: payload,
			};
		default:
			return state;
	}
};

export const profileByIdReducer = (
	state = { profile: {}, loading: false, error: false },
	action
) => {
	const { type, payload } = action;

	switch (type) {
		case GET_PROFILE_REQUEST:
			return {
				loading: true,
			};
		case GET_PROFILE_SUCCESS:
			return {
				...state,
				loading: false,
				profile: payload,
			};
		case GET_PROFILE_FAIL:
			return {
				loading: false,
				error: payload,
			};
		default:
			return state;
	}
};
