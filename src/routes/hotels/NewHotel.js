import React, { useEffect } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { sharedActions } from '../../redux/actions/sharedActions';
import DatePicker from 'react-datepicker';

const NewHotel = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sharedActions.fetchProvinces());

  }, [dispatch]);

  const provinces = useSelector(({ shared }) => shared.provinces.payload);

  return (
    <Form>

      <Modal show={props.show} onHide={props.onCloseDialog}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Nuevo Hotel</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Nombre Hotel</Form.Label>
                <Form.Control />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Marca</Form.Label>
                <Form.Control />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Provincia</Form.Label>
                <Select options={provinces.map((e) => ({ label: e.name, value: e.id }))}></Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Inicio Actividades</Form.Label>
                <DatePicker selected={new Date()} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Estado</Form.Label>
                <Form.Check id="new_hotel_active_check" label="Activo" custom type="checkbox" />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={props.onCloseDialog} variant="link">Cancelar</Button>
          <Button variant="secondary">Agregar</Button>
        </Modal.Footer>
      </Modal>
    </Form>
  );
};

export default NewHotel;
