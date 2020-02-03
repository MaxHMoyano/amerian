import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const HumanResources = () => {
  // Human Resources is a parent route, it always has a first subroute
  const firstNestedRoute = useSelector(({ menu }) =>
    menu.activeItem.routes.length ? menu.activeItem.routes[0] : "/"
  );

  return <Redirect to={firstNestedRoute.path} />;
};

export default HumanResources;
