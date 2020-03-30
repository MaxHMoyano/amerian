import React from 'react';
import { Modal, Row, Col, Button } from "react-bootstrap";
import { hotelActions } from '../../redux/actions';
import { useDispatch } from 'react-redux';

const DeleteHotel = ({ show, onClose, hotel }) => {
  const dispatch = useDispatch();

  const deleteHotel = (e) => {
    dispatch(hotelActions.deleteHotel(hotel.id));
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar Hotel</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row>
          <Col>
            ¿Esta seguro que desea eliminar el hotel {hotel.name}?
            </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={onClose} variant="link">Cancelar</Button>
        <Button onClick={deleteHotel} variant="primary">Eliminar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteHotel;
