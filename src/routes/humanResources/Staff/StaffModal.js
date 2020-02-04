import React, { Fragment } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";

const StaffModal = ({ show, onClose }) => {
  return (
    <Fragment>
      <Form>
        <Modal show={show} onHide={onClose}>
          <Modal.Header closeButton>
            <Modal.Title>Nuevo Staff</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Row>
              <Col>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>
                    Nombre completo <span className="text-primary">*</span>{" "}
                  </Form.Label>
                  <Form.Control type="text" placeholder="ej: Juan Perez" />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Group>
                  <Form.Label>Hotel</Form.Label>
                  <Form.Control type="text" placeholder="select" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Posicion</Form.Label>
                  <Form.Control type="text" placeholder="select" />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Group>
                  <Form.Label>Email trabajo</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="ej: jperez@amerian.com"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Email personal</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="ej: jperez@gmail.com"
                  />
                </Form.Group>
              </Col>
            </Form.Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="light" onClick={onClose}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={onClose}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      </Form>
    </Fragment>
  );
};

export default StaffModal;
