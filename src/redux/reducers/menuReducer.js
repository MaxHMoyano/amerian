import { menuConstants } from "../constants";

const initialState = {
  items: [
    {
      name: "Hoteles",
      icon: "hotel",
      path: "/hotels"
    },
    {
      name: "Recursos Humanos",
      icon: "users",
      path: "/humanResources",
      routes: [
        {
          name: "Staff",
          path: "/humanResources/staff"
        },
        {
          name: "Posiciones",
          path: "/humanResources/positions"
        }
      ]
    },
    {
      name: "Comercial",
      icon: "hands-helping",
      path: "/comercial",
      routes: [
        {
          name: "Tarifas",
          path: "/comercial/tariffs"
        },
        {
          name: "Canales",
          path: "/comercial/channels"
        }
      ]
    },
    {
      name: "Agregar nuevo",
      icon: "plus",
      path: "/create-menu-item"
    },
    {
      name: "Notificaciones",
      icon: "bell",
      path: "/notifications",
      isBottom: true
    },
    {
      name: "Ayuda",
      icon: "question-circle",
      path: "/help"
    },
    {
      name: "Configuraciones",
      icon: "cog",
      path: "/settings"
    }
  ],
  activeItem: {
    name: "",
    routes: []
  }
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case menuConstants.SET_ACTIVE_MENU:
      return {
        ...state,
        activeItem: {
          name: payload.name,
          routes: payload.routes || []
        }
      };
    default:
      return state;
  }
};
