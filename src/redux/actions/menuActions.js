import { menuConstants } from "../constants";
import { history } from "../../helpers/history";


export const menuActions = {
  setActiveMenu,
};

function setActiveMenu(id) {
  return {
    type: menuConstants.SET_ACTIVE_MENU,
    payload: id
  };
}