import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { userLoginReducer } from "./redux/reducers/authReducers";
import { profileReducer } from "./redux/reducers/profileReducers";
import {
	postReducers,
	timelinePostsReducer,
	timelinePostsByUserIdReducer,
} from "./redux/reducers/postReducers";
import { userReducer } from "./redux/reducers/userReducers";
import { userUpdateReducer } from "./redux/reducers/authReducers";
import {
	profilesReducer,
	profileByIdReducer,
} from "./redux/reducers/profilesReducer";

const reducers = combineReducers({
	userLogin: userLoginReducer,
	user: userReducer,
	userUpdate: userUpdateReducer,
	profile: profileReducer,
	profiles: profilesReducer,
	profileById: profileByIdReducer,
	post: postReducers,
	timelinePosts: timelinePostsReducer,
	timelinePostsByUserId: timelinePostsByUserIdReducer,
});

const INITIAL_STATE = {};

const middleware = [thunk];

const store = createStore(
	reducers,
	INITIAL_STATE,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
