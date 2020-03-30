import React, { useEffect } from 'react';
import { Form, Button, Row, Col, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import { hotelActions, positionActions } from '../../../redux/actions';
import { useFormik } from 'formik';
const NewPosition = ({ show, onCloseDialog }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hotelActions.fetchHotels());
  }, [dispatch]);
  let hotels = useSelector(({ hotel }) => hotel);

  let formik = useFormik({
    initialValues: {
      name: "",
      hotel: null,
      description: ""
    },
    validate: values => { },
    onSubmit: (values, { resetForm }) => {
      let position = {
        ...values,
        hotel: values.hotel.value
      };
      dispatch(positionActions.createNewPosition(values.hotel.value, position));
      onCloseDialog();
      resetForm();
    }
  });



  return (
    <Modal show={show} onHide={onCloseDialog}>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Posicion</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Nombre de la posicion</Form.Label>
                <Form.Control name="name" value={formik.values.name} onChange={formik.handleChange} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Hotel</Form.Label>
                <Select value={formik.values.hotel} onChange={value => formik.setFieldValue("hotel", value)} options={hotels.results.map((e) => ({ label: e.name, value: e.id }))} isLoading={hotels.pending}></Select>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group>
            <Form.Label>Descripción</Form.Label>
            <Form.Control value={formik.values.description} onChange={formik.handleChange} name="description" as="textarea" />
          </Form.Group>
          <Row>

          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={onCloseDialog} variant="link">Cancelar</Button>
          {/* <Button onClick={e => addNewHotel()} variant="secondary">Guardar y Agregar otro</Button> */}
          <Button type="submit" variant="secondary">Agregar</Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default NewPosition;
