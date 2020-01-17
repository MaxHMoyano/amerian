import { menuConstants } from "../constants";

const initialState = {
  menuItems: [
    {
      title: "Hoteles",
      icon: "hotel",
      url: "/hotels",
      active: false
    },
    {
      title: "Recursos Humanos",
      icon: "users",
      url: "/humanResources",
      active: false,
      subMenu: [
        {
          title: "Staff",
          url: "/humanResources/staff"
        },
        {
          title: "Posiciones",
          url: "/humanResources/positions"
        }
      ]
    },
    {
      title: "Comercial",
      icon: "hands-helping",
      url: "/comercial",
      active: false,
      subMenu: [
        {
          title: "Tarifas",
          url: "/comercial/tariffs"
        },
        {
          title: "Canales",
          url: "/comercial/channels"
        }
      ]
    },
    {
      title: "Agregar nuevo",
      icon: "plus",
      url: "/create-menu-item",
      active: false
    }
  ]
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case menuConstants.ADD_MENU:
      return { ...state, ...payload };
    case menuConstants.ACTIVE_MENU_ITEM: {
      const activeUrlIdx = state.menuItems.findIndex(e => {
        return e.url === payload;
      });
      state.menuItems[activeUrlIdx] = {
        ...state.menuItems[activeUrlIdx],
        active: true
      };
      return state;
    }
    case menuConstants.REMOVE_PREVIOUS_ACTIVE_MENU:
      const activeUrlIdx = state.menuItems.findIndex(e => {
        return e.active === true;
      });
      if (activeUrlIdx !== -1) {
        state.menuItems[activeUrlIdx] = {
          ...state.menuItems[activeUrlIdx],
          active: false
        };
      }
      return state;
    default:
      return state;
  }
};
