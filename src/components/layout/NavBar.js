import React, { Fragment, useEffect, useState } from "react";
import { Form, Button, Breadcrumb } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const NavBar = () => {
  const currentRoute = useSelector(({ menu }) => menu.items.find((e) => e.active === true));
  const userName = useSelector(({ user }) => user.current ? user.current.first_name : "");

  const isManager = useSelector((({ user }) => user.current.groups.some((e) => e === 1)));
  const isHotel = useSelector((({ user }) => user.current.groups.some((e) => e === 3)));

  const [title, setTitle] = useState("");
  let location = useLocation();

  useEffect(() => {
    if (currentRoute) {
      if (currentRoute.routes.length) {
        const route = currentRoute.routes.find(
          route => route.path === window.location.pathname
        );
        if (route) {
          setTitle(route.name);
        }
      } else {
        setTitle(currentRoute.name);
      }
    }
  }, [currentRoute, location]);


  return (
    <div className="main_navbar">
      <div className="user">
        {(!currentRoute) ? (
          <Fragment>
            <p className="m-0">Bienvenido</p>
            <h2 className="m-0 text-muted font-weight-bold">{userName}</h2>
          </Fragment>
        ) : (
            <h3 className="m-0 text-muted font-weight-bold">{title}</h3>
          )}
      </div>
      <div className="toolbar">
        <div className="icon_input search mx-4">
          <Form.Control type="text" placeholder="Buscar" />
          <i className="fas fa-search"></i>
        </div>
        <div className="actions px-2">
          <Button variant="light" className="mx-1">
            <i className="fas fa-bell"></i>
          </Button>
          <Button variant="light" className="mx-1">
            <i className="fas fa-ellipsis-h"></i>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
