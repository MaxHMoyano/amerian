import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const HumanResources = () => {
  // Human Resources is a parent route, it always has a first subroute
  const firstNestedRoute = useSelector(({ menu }) => {
    let active = menu.items.find((e) => e.active);
    if (active) {
      return active.routes[0].path;
    }
    return "/";
  });

  return <Redirect to={firstNestedRoute} />;
};

export default HumanResources;
