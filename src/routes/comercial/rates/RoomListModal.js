import React, { useState } from 'react';
import { Form, Modal, Button, Row, Col } from "react-bootstrap";

const RoomListModal = ({ show, onClose, rooms, onSaveRoomTypes }) => {

  const [roomTypes, setRoomTypes] = useState(rooms);

  const setRoomName = (ev, idx) => {
    let roomTypesCopy = roomTypes.slice();
    roomTypesCopy[idx].name = ev.target.value;
    setRoomTypes(roomTypesCopy);
  };


  return (
    <Modal show={show} onHide={onClose}>

      <Modal.Header closeButton>
        <Modal.Title>Configuracion habitaciones</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col><span className="text-muted">Nombre de la habitacion: </span></Col>
        </Row>
        {!roomTypes.length && <Button variant="outline-info"><i className="fas fa-plus"></i></Button>}
        {
          roomTypes.map((e, idx) => (
            <Row key={idx}>
              <Col md={9}>
                <Form.Control
                  value={e.name}
                  onChange={e => setRoomName(e, idx)}
                />
              </Col>
              <Col md={1}>
                <Button variant="danger" onClick={e => setRoomTypes([roomTypes.splice(idx)])}>
                  <i className="fas fa-trash icon-button"></i>
                </Button>
              </Col>
              <Col md={1}>
                <Button variant="outline-info" onClick={e => setRoomTypes([...roomTypes, {}])}>
                  <i className="fas fa-plus"></i>
                </Button>
              </Col>
            </Row>
          ))
        }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={onClose}>
          Cancelar
            </Button>
        <Button type="submit" variant="secondary">
          Guardar
            </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RoomListModal;
