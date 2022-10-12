import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import session from "redux-persist/lib/storage/session"; // defaults to localStorage for web
//import AsyncStorage from "@react-native-community/async-storage";
//import { CookieStorage } from "redux-persist-cookie-storage";
//import Cookies from "cookies-js";
import properties from "./properties";
import app from "./app";

// WHITELIST
const persistConfig = {
  key: "root",
  // storage: new CookieStorage(Cookies), //session,
  storage: session,
  whitelist: ["properties"], // only card will be persisted
};

const rootReducer = combineReducers({
  properties,
  app,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
