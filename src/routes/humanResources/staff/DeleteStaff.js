import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Row, Col, Button } from "react-bootstrap";
import { staffActions } from '../../../redux/actions';
import { useDispatch } from "react-redux";

const DeleteStaffModal = props => {

  const dispatch = useDispatch();

  const deleteStaff = () => {
    dispatch(staffActions.deleteStaff(props.selected.hotel.id, props.selected.id)).then(() => {
      dispatch(staffActions.fetchStaff()).then(() => {
        props.onClose();
      });
    });
  };

  return (
    <Modal show={props.show} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar Hotel</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row>
          <Col>
            ¿Esta seguro que desea eliminar el staff {props.selected.first_name} {props.selected.last_name}?
            </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={props.onClose} variant="link">Cancelar</Button>
        <Button onClick={deleteStaff} variant="primary">Eliminar</Button>
      </Modal.Footer>
    </Modal>
  );
};

DeleteStaffModal.propTypes = {

};

export default DeleteStaffModal;
