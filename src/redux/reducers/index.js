import { combineReducers } from "redux";
import authReducer from "./authReducer";
import menuReducer from "./menuReducer";
import hotelReducer from "./hotelReducer";

export default combineReducers({
  auth: authReducer,
  menu: menuReducer,
  hotels: hotelReducer,
});
