import React from "react";
import { Form, Button } from "react-bootstrap";
const NavBar = () => {
  return (
    <div className="main_navbar">
      <div className="user">
        <p className="m-0">Bienvenida</p>
        <h2 className="m-0 text-muted font-weight-bold">Agustina</h2>
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
