import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { alertReducer } from "./redux/reducers/alertReducers";
import { userLoginReducer } from "./redux/reducers/authReducers";
import { profileReducer } from "./redux/reducers/profileReducers";

const reducers = combineReducers({
	alert: alertReducer,
	userLogin: userLoginReducer,
	profile: profileReducer,
});

const INITIAL_STATE = {};

const middleware = [thunk];

const store = createStore(
	reducers,
	INITIAL_STATE,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
