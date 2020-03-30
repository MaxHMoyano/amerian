import { combineReducers } from "redux";
import authReducer from "./authReducer";
import menuReducer from "./menuReducer";
import hotelReducer from "./hotelReducer";
import clientReducer from "./clientReducer";
import currencyReducer from "./currencyReducer";
import userReducer from "./userReducer";
import roomTypeReducer from "./roomTypeReducer";
import sharedReducer from "./sharedReducer";
import staffReducer from "./staffReducer";
import chainReducer from "./chainReducer";
import positionReducer from "./positionReducer";
import rateReducer from "./rateReducer";

export default combineReducers({
  auth: authReducer,
  menu: menuReducer,
  hotel: hotelReducer,
  client: clientReducer,
  currency: currencyReducer,
  user: userReducer,
  roomTypes: roomTypeReducer,
  shared: sharedReducer,
  staff: staffReducer,
  chain: chainReducer,
  position: positionReducer,
  rate: rateReducer,
});
