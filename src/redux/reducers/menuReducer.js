import { menuConstants } from "../constants";

const initialState = {
  items: [
    {
      id: 1,
      active: false,
      name: "Hoteles",
      icon: "hotel",
      path: "/hotels/",
      routes: [],
    },
    {
      id: 2,
      active: false,
      name: "Recursos Humanos",
      icon: "users",
      path: "/humanResources",
      routes: [
        {
          name: "Staff",
          path: "/humanResources/staff/"
        },
        {
          name: "Posiciones",
          path: "/humanResources/positions/"
        }
      ]
    },
    {
      id: 3,
      active: false,
      name: "Comercial",
      icon: "hands-helping",
      path: "/comercial",
      routes: [
        // {
        //   name: "Tarifas Vigentes",
        //   path: "/comercial/hotels-rates/"
        // },
        {
          name: "Actualizaciones",
          path: "/comercial/rates/"
        },
        {
          name: "Clientes Convenio",
          path: "/comercial/clients/"
        },
      ]
    },
  ],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case menuConstants.SET_ACTIVE_MENU:
      state.items = state.items.map((e) => {
        return {
          ...e,
          active: payload === e.id ? true : false
        };
      });
      return {
        ...state,
      };
    default:
      return state;
  }
};


