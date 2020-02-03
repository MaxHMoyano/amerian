import { menuConstants } from "../constants";

export const menuActions = {
  setActiveMenu
};

function setActiveMenu(item) {
  return {
    type: menuConstants.SET_ACTIVE_MENU,
    payload: item
  };
}
