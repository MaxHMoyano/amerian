import { menuConstants } from "../constants";

export const menuActions = {
  activeMenu,
  removePreviousActiveMenu
};

function activeMenu(menuTitle) {
  return dispatch => {
    dispatch(removePreviousActiveMenu());
    dispatch({
      type: menuConstants.ACTIVE_MENU_ITEM,
      payload: menuTitle
    });
  };
}

function removePreviousActiveMenu() {
  return {
    type: menuConstants.REMOVE_PREVIOUS_ACTIVE_MENU
  };
}
