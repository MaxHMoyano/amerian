import React, { useEffect } from 'react';
import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import Select from "react-select";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Datepicker from "react-datepicker";
import * as Yup from "yup";
import { phoneRegex } from "../../../helpers/utilities";
import { formatISO, parseISO } from 'date-fns';
import { clientActions } from "../../../redux/actions";
import _ from "lodash";

const Newclient = ({ show, onClose, selected }) => {

  // Global hooks
  const dispatch = useDispatch();




  // Selectors
  let types = useSelector(({ client }) => client.types);


  useEffect(() => {
    if (!_.isEmpty(selected)) {
      dispatch(clientActions.fetchClient(selected.id)).then((client) => {
        formik.setValues({
          name: client.name,
          type: {
            label: types.find(e => e.value === client.type).name,
            value: types.find(e => e.value === client.type).value
          },
          phone: client.phone,
          email: client.email,
          start_date: parseISO(client.start_date),
          active: client.active,
        });
      });
    }
  }, [selected, dispatch]);


  // Form

  let clientSchema = Yup.object().shape({
    name: Yup.string().required("El nombre es requerido"),
    type: Yup.object().shape({ label: Yup.string().required(), value: Yup.string().required() }).required("El tipo es requerido").nullable(),
    phone: Yup.string().matches(phoneRegex, "Telefono invalido"),
    email: Yup.string().email("Email invalido").required("El email es requerido"),
    start_date: Yup.date().required("La fecha de inicio es requerida").nullable(),
    active: Yup.boolean(),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      type: null,
      phone: "",
      email: "",
      start_date: new Date(),
      active: true,
    },
    validationSchema: clientSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      let client = {
        ...values,
        type: values.type.value,
        start_date: formatISO(values.start_date).split("T")[0]
      };
      if (!_.isEmpty(selected)) {
        dispatch(clientActions.updateClient(selected.id, client)).then(() => {
          dispatch(clientActions.fetchClients()).then(() => {
            setSubmitting(false);
            resetForm();
            onClose();
          });
        });
      } else {
        dispatch(clientActions.createClient(client)).then(() => {
          dispatch(clientActions.fetchClients()).then(() => {
            setSubmitting(false);
            resetForm();
            onClose();
          });
        });

      }
    }
  });



  return (
    <Modal show={show} onHide={onClose}>
      <Form onSubmit={formik.handleSubmit} autoComplete="off">
        <Modal.Header closeButton>
          <Modal.Title>Agregar Nuevo Cliente</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  className={formik.errors.name && formik.touched.name ? "is-invalid" : ""}
                  name="name" value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.name && formik.touched.name && <span className="error_message">{formik.errors.name}</span>}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Tipo</Form.Label>
                <Select
                  value={formik.values.type}
                  onChange={value => formik.setFieldValue("type", value)}
                  options={types.map((e) => ({ label: e.name, value: e.value }))} />
                {formik.errors.type && formik.touched.type && <span className="error_message">{formik.errors.type}</span>}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Telefono</Form.Label>
                <Form.Control
                  className={formik.errors.phone && formik.touched.phone ? "is-invalid" : ""}
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.phone && formik.touched.phone && <span className="error_message">{formik.errors.phone}</span>}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  className={formik.errors.email && formik.touched.email ? "is-invalid" : ""}
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.email && formik.touched.email && <span className="error_message">{formik.errors.email}</span>}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Inicio Actividades</Form.Label>
                <Datepicker
                  selected={formik.values.start_date}
                  onChange={date => formik.setFieldValue("start_date", date)}
                  className={`form-control ${formik.errors.start_date && formik.touched.start_date ? "is-invalid" : ""}`}
                  dateFormat="dd-MM-yyyy"
                />
                {formik.errors.start_date && formik.touched.start_date && <span className="error_message">{formik.errors.start_date}</span>}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Estado</Form.Label>
                <Form.Switch
                  checked={formik.values.active}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  id="new_client_active_check"
                  name="active"
                  label="Activo"
                />
                {formik.errors.active && formik.touched.active && <span className="error_message">{formik.errors.active}</span>}
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        {
          !formik.isSubmitting ?
            <Modal.Footer>
              <Button onClick={e => { onClose(); formik.resetForm(); }} variant="link">Cancelar</Button>
              <Button type="submit" variant="secondary">Agregar</Button>
            </Modal.Footer> :
            <Modal.Footer>
              <i className="fas fa-spinner fa-spin fa-2x"></i>
            </Modal.Footer>
        }

      </Form>
    </Modal>
  );
};

export default Newclient;
