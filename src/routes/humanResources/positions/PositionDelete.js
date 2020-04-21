import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Row, Col, Button } from "react-bootstrap";
import { positionActions } from '../../../redux/actions';
import { useDispatch } from "react-redux";

const PositionDelete = props => {

  const dispatch = useDispatch();

  const deletePosition = () => {
    dispatch(positionActions.deletePosition(props.selected.id)).then(() => {
      dispatch(positionActions.fetchPositions()).then(() => {
        props.onClose();
      });
    });
  };

  return (
    <Modal show={props.show} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar Posición</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row>
          <Col>
            ¿Esta seguro que desea eliminar la posición {props.selected.name}?
            </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={props.onClose} variant="link">Cancelar</Button>
        <Button onClick={deletePosition} variant="primary">Eliminar</Button>
      </Modal.Footer>
    </Modal>
  );
};

PositionDelete.propTypes = {

};

export default PositionDelete;
