import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../redux/actions/";
import { Image, Form, Button, Alert } from "react-bootstrap";
import logo from "../../assets/Amerian_Logo.png";
import { useFormik } from "formik";
import * as Yup from 'yup';

const Login = () => {
  const dispatch = useDispatch();
  const error = useSelector(({ auth }) => auth.error);
  const [showError, setShowError] = useState(false);

  const loginSchema = Yup.object().shape({
    user: Yup.string()
      .required("El usuario es requerido")
      .email("Email invalido"),
    password: Yup.string()
      .required("La contraseña es requerida")
  });

  const formik = useFormik({
    initialValues: {
      user: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      dispatch(userActions.login(values.user, values.password));

    }
  });

  return (
    <div className="login_container d-flex align-items-center justify-content-center">
      <Form onSubmit={formik.handleSubmit}>
        <div className="login_form">
          <div className="d-flex justify-content-center align-items-center bg-primary mb-5">
            <Image src={logo} fluid />
          </div>
          <div className="d-flex flex-column align-items-center">
            {!error && <div><h3 className="">Bienvenido!</h3>
              <p className="text-muted">
                Ingrese sus credenciales para iniciar sesión
            </p></div>}
            {error &&
              <Alert variant="danger" onClose={e => dispatch(userActions.clearLoginError())} dismissible>
                <Alert.Heading>Error</Alert.Heading>
                <p>
                  {error}
                </p>
              </Alert>
            }
            <Form.Group className="mb-2">
              <Form.Label className="text-muted mb-0">
                Email <span className="text-primary">*</span>
              </Form.Label>
              <Form.Control
                className={`${(formik.errors.user && formik.touched.user) ? "is-invalid" : ""}`}
                value={formik.values.user}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="user"
                type="text"
              />
              {(formik.errors.user && formik.touched.user) ? (<span className="error_message">{formik.errors.user}</span>) : null}
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label className="text-muted mb-0">
                Contraseña <span className="text-primary">*</span>
              </Form.Label>
              <Form.Control
                className={`${(formik.errors.password && formik.touched.password) ? "is-invalid" : ""}`}
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                type="password"
              />
              {(formik.errors.password && formik.touched.password) ? (<span className="error_message">{formik.errors.password}</span>) : null}
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
