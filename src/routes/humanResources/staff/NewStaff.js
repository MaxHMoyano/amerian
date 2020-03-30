import React, { useEffect } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import Select from 'react-select';
import { useSelector, useDispatch } from "react-redux";
import { positionActions, hotelActions, staffActions } from "../../../redux/actions/";
import { useFormik } from "formik";
import * as Yup from 'yup';

const StaffModal = ({ show, onClose }) => {
  const dispatch = useDispatch();

  const staffSchema = Yup.object().shape({
    first_name: Yup.string()
      .required("El nombre es requerido"),
    last_name: Yup.string()
      .required("El apellido es requerido"),
  });

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      hotel: null,
      position: null,
      email: "",
      phone: "",
    },
    validate: values => { },
    onSubmit: (values, { resetForm }) => {
      let staff = {
        ...values,
        position: values.position.value,
      };
      dispatch(staffActions.createNewStaff(values.hotel.value, staff));
      onClose();
      resetForm();
      dispatch(positionActions.cleanState());
    }
  });

  const handleHotelChange = (value) => {
    formik.setFieldValue("hotel", value);
    dispatch(positionActions.fetchPositions(value.value));
  };


  let hotels = useSelector(({ hotel }) => hotel);
  let positions = useSelector(({ position }) => position);

  useEffect(() => {
    dispatch(hotelActions.fetchHotels());
  }, [dispatch]);

  return (
    <Modal show={show} onHide={onClose}>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Staff</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Row>
            <Col>
              <Form.Group>
                <Form.Label>
                  Nombres <span className="text-primary">*</span>
                </Form.Label>
                <Form.Control value={formik.values.first_name} onChange={formik.handleChange} name="first_name" type="text" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>
                  Apellidos <span className="text-primary">*</span>
                </Form.Label>
                <Form.Control value={formik.values.last_name} onChange={formik.handleChange} name="last_name" type="text" />
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Form.Group>
                <Form.Label>Hotel</Form.Label>
                <Select isLoading={hotels.pending} onChange={handleHotelChange} value={formik.values.hotel} options={hotels.results.map(e => ({ label: e.name, value: e.id }))} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Posicion</Form.Label>
                <Select isDisabled={!positions.results.length} isLoading={positions.pending} onChange={value => formik.setFieldValue("position", value)} value={formik.values.position} options={positions.results.map(e => ({ label: e.name, value: e.id }))} />
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" value={formik.values.email} onChange={formik.handleChange} name="email" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Telefono</Form.Label>
                <Form.Control type="text" value={formik.values.phone} onChange={formik.handleChange} name="phone" />
              </Form.Group>
            </Col>
          </Form.Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={onClose}>
            Cancelar
            </Button>
          <Button type="submit" variant="secondary">
            Guardar
            </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default StaffModal;
