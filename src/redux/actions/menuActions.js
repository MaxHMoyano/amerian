import { menuConstants } from "../constants";

export const menuActions = {
  setActiveMenu,
};

function setActiveMenu(id) {
  return {
    type: menuConstants.SET_ACTIVE_MENU,
    payload: id
  };
}