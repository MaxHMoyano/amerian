import React, { Fragment } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const NavBar = () => {
  const currentRoute = useSelector(({ menu }) => menu.activeMenu);
  const currentTitle = useSelector(({ menu }) => {
    let parentName = menu.activeMenu.name;
    let childrenName = menu.activeNestedMenu.name;

    if (childrenName) {
      return childrenName;
    }
    return parentName;
  });

  return (
    <div className="main_navbar">
      <div className="user">
        {currentRoute.name === "home" ? (
          <Fragment>
            <p className="m-0">Bienvenida</p>
            <h2 className="m-0 text-muted font-weight-bold">Agustina</h2>
          </Fragment>
        ) : (
          <h3
            className="m-0 text-muted font-weight-bold"
            style={{ textTransform: "uppercase" }}
          >
            {currentTitle}
          </h3>
        )}
      </div>
      <div className="toolbar">
        <div className="search px-2">
          <Form.Control type="text" placeholder="Buscar" />
        </div>
        <div className="actions px-2">
          <Button variant="light">
            <i className="fas fa-bell"></i>
          </Button>
          <Button variant="light">
            <i className="fas fa-ellipsis-h"></i>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
