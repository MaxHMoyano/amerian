import { combineReducers } from "redux";
import authReducer from "./authReducer";
import menuReducer from "./menuReducer";
import hotelsReducer from "./hotelsReducer";
import clientsReducer from "./clientsReducer";

export default combineReducers({
  auth: authReducer,
  menu: menuReducer,
  hotels: hotelsReducer,
  clients: clientsReducer,
});
