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
} from "../constants/profileConstants";
const initialState = {
	profile: null,
	repos: [],
	loading: true,
	error: {},
};

export const profileReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_PROFILE:
		case UPDATE_PROFILE:
			return {
				...state,
				profile: payload,
				loading: false,
			};

		case CLEAR_PROFILE:
			return {
				...state,
				profile: null,
				repos: [],
				loading: false,
			};
		case REMOVE_EDUCATION:
			return {
				...state,
				profile: {
					...state.profile,
					education: state.profile.education.filter(
						(edu) => edu._id !== payload
					),
				},
				loading: false,
			};

		case UPDATE_EDUCATION:
			return {
				...state,
				profile: {
					...state.profile,
					education: [...state.profile.education, payload],
				},
				loading: false,
			};

		case UPDATE_EXPERIENCE:
			return {
				...state,
				profile: {
					...state.profile,
					experience: [...state.profile.experience, payload],
				},
				loading: false,
			};

		case REMOVE_EXPERIENCE:
			return {
				...state,
				profile: {
					...state.profile,
					experience: state.profile.experience.filter(
						(exp) => exp._id !== payload
					),
				},
				loading: false,
			};
		case GET_GIT_REPOS:
			return {
				...state,
				repos: payload,
				loading: false,
			};
		case GIT_REPOS_ERROR:
			return {
				...state,
				repos: [],
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
