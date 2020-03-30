import React from 'react';
import { Form, Modal, Button } from "react-bootstrap";

const RoomListModal = ({ show, onClose, rooms }) => {
  return (
    <Modal show={show} onHide={onClose}>

      <Modal.Header closeButton>
        <Modal.Title>Nuevo Staff</Modal.Title>
      </Modal.Header>
      <Modal.Body>


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
