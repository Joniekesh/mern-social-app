import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./reducers/authRedux";
import profileReducer from "./reducers/profileRedux";
import userReducer from "./reducers/userRedux";
import postReducer from "./reducers/postRedux";
import profilesReduer from "./reducers/profilesRedux";

const persistConfig = {
	key: "root",
	version: 1,
	storage,
};

const rootReducer = combineReducers({
	auth: authReducer,
	profile: profileReducer,
	profiles: profilesReduer,
	user: userReducer,
	post: postReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
			// immutableCheck: false,
			// serializableCheck: false,
		}),
});

export let persistor = persistStore(store);
