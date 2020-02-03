import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const Comercial = () => {
  // Comercial is a parent route, it always has a first subroute
  const firstNestedRoute = useSelector(({ menu }) =>
    menu.activeMenu.routes.length ? menu.activeMenu.routes[0] : "/"
  );

  return <Redirect to={firstNestedRoute.path} />;
};

export default Comercial;
