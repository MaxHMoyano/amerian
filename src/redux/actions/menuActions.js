import { menuConstants } from "../constants";

export const menuActions = {
  setActiveMenu,
  setActiveMenuToHome
};

function setActiveMenu(item) {
  return {
    type: menuConstants.SET_ACTIVE_MENU,
    payload: item
  };
}

function setActiveMenuToHome() {
  return {
    type: menuConstants.SET_ACTIVE_MENU_TO_HOME,
  };
}