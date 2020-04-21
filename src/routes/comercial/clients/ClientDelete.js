import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Row, Col, Button } from "react-bootstrap";
import { clientActions } from '../../../redux/actions';
import { useDispatch } from "react-redux";

const ClientDelete = props => {

  const dispatch = useDispatch();

  const deleteClient = () => {
    dispatch(clientActions.deleteClient(props.selected.id)).then(() => {
      dispatch(clientActions.fetchClients()).then(() => {
        props.onClose();
      });
    });
  };

  return (
    <Modal show={props.show} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar Cliente</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row>
          <Col>
            ¿Esta seguro que desea eliminar el cliente {props.selected.name}?
            </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={props.onClose} variant="link">Cancelar</Button>
        <Button onClick={deleteClient} variant="primary">Eliminar</Button>
      </Modal.Footer>
    </Modal>
  );
};

ClientDelete.propTypes = {

};

export default ClientDelete;
