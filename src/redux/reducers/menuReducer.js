import { menuConstants } from "../constants";

const initialState = {
  items: [
    {
      name: "Hoteles",
      icon: "hotel",
      path: "/hotels",
      primary: true,
    },
    {
      name: "Recursos Humanos",
      icon: "users",
      path: "/humanResources",
      primary: true,
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
      primary: true,
      routes: [
        {
          name: "Tarifas Vigentes",
          path: "/comercial/tariffs"
        },
        {
          name: "Actualizaciones",
          path: "/comercial/petitions"
        },
        {
          name: "Clientes Convenio",
          path: "/comercial/agreements"
        },
      ]
    },
    {
      name: "Agregar nuevo",
      icon: "plus",
      path: "/create-menu-item",
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
    case menuConstants.SET_ACTIVE_MENU_TO_HOME:
      return {
        ...state,
        activeItem: {
          name: "home",
          routes: []
        }
      };
    default:
      return state;
  }
};
