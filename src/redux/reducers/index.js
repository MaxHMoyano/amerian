import { combineReducers } from "redux";
import authReducer from "./authReducer";
import menuReducer from "./menuReducer";
import hotelsReducer from "./hotelsReducer";
import clientsReducer from "./clientsReducer";
import currenciesReducer from "./currenciesReducer";
import userReducer from "./usersReducer";

export default combineReducers({
  auth: authReducer,
  menu: menuReducer,
  hotels: hotelsReducer,
  clients: clientsReducer,
  currencies: currenciesReducer,
  users: userReducer,
});
