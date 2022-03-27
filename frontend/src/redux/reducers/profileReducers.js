import {
	GET_PROFILE,
	GET_PROFILES,
	PROFILE_ERROR,
	UPDATE_PROFILE,
} from "../constants/profileConstants";
const initialState = {
	profiles: [],
	profile: null,
	repos: [],
	loading: true,
	error: {},
};

export const profileReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_PROFILES:
			return {
				...state,
				profiles: payload,
				loading: false,
			};

		case GET_PROFILE:
		case UPDATE_PROFILE:
			return {
				...state,
				profile: payload,
				loading: false,
			};
		case PROFILE_ERROR:
			return {
				error: payload,
				loading: false,
				profile: null,
			};

		default:
			return state;
	}
};
