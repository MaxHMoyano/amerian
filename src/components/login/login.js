import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/authActions";

import { Image, Form, Button } from "react-bootstrap";
import logo from "../../assets/Amerian_Logo.png";

export default function Login() {
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const dispatch = useDispatch();

  return (
    <div className='login_container d-flex align-items-center justify-content-center'>
      <div className='login_form'>
        <div className='d-flex justify-content-center align-items-center bg-primary mb-5'>
          <Image src={logo} fluid />
        </div>
        <div className='d-flex flex-column align-items-center'>
          <h3 className=''>Bienvenido!</h3>
          <p className='opacity-80'>
            Ingrese sus credenciales para iniciar sesión
          </p>
          <Form.Group>
            <Form.Label className='text-muted'>
              Usuario <span className='text-primary'>*</span>
            </Form.Label>
            <Form.Control type='text' />
          </Form.Group>
          <Form.Group className='mb-4'>
            <Form.Label className='text-muted'>
              Contraseña <span className='text-primary'>*</span>
            </Form.Label>
            <Form.Control type='password' />
          </Form.Group>
          <Button
            onClick={() => dispatch(login())}
            variant='primary'
            className='mb-4'
          >
            Iniciar Sesión
          </Button>
          <p className='text-primary'>¿Se te olvidó tu contraseña?</p>
          <p className='text-primary'>¿Necesitas más ayuda?</p>
        </div>
      </div>
    </div>
  );
}
