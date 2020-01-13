import { ACTIVE_MENU_ITEM, REMOVE_PREVIOUS_ACTIVE_MENU } from "./types";

export const activeMenu = menuTitle => dispatch => {
  dispatch(removePreviousActiveMenu());
  dispatch({
    type: ACTIVE_MENU_ITEM,
    payload: menuTitle
  });
};

export const removePreviousActiveMenu = () => {
  return {
    type: REMOVE_PREVIOUS_ACTIVE_MENU
  };
};
