import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/actions/";

import { Image, Form, Button } from "react-bootstrap";
import logo from "../../assets/Amerian_Logo.png";

const Login = () => {
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const dispatch = useDispatch();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginForm = e => {
    e.preventDefault();
    dispatch(userActions.login(user, password));
  };

  return (
    <div className="login_container d-flex align-items-center justify-content-center">
      <Form onSubmit={handleLoginForm}>
        <div className="login_form">
          <div className="d-flex justify-content-center align-items-center bg-primary mb-5">
            <Image src={logo} fluid />
          </div>
          <div className="d-flex flex-column align-items-center">
            <h3 className="">Bienvenido!</h3>
            <p className="text-muted">
              Ingrese sus credenciales para iniciar sesión
            </p>
            <Form.Group className="mb-2">
              <Form.Label className="text-muted mb-0">
                Usuario <span className="text-primary">*</span>
              </Form.Label>
              <Form.Control
                onChange={e => setUser(e.target.value)}
                required
                type="text"
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label className="text-muted mb-0">
                Contraseña <span className="text-primary">*</span>
              </Form.Label>
              <Form.Control
                onChange={e => setPassword(e.target.value)}
                value={password}
                required
                type="password"
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="mb-4">
              Iniciar Sesión
            </Button>
            <p className="text-primary">¿Se te olvidó tu contraseña?</p>
            <p className="text-primary">¿Necesitas más ayuda?</p>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Login;
