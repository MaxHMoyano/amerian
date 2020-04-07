import React, { useState, useEffect } from 'react';
import { Form, Modal, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { hotelActions } from '../../../redux/actions/';
import { PropTypes } from "prop-types";


const RoomListModal = ({ show, onClose, hotel }) => {

  // local state
  const [currentEditing, setCurrentEditing] = useState({});

  // global hooks
  const dispatch = useDispatch();

  // selectors
  const roomTypes = useSelector(({ roomTypes }) => roomTypes.results);
  const [roomTypesLocal, setRoomTypesLocal] = useState([]);

  useEffect(() => {
    setRoomTypesLocal(roomTypes);
  }, [roomTypes]);

  useEffect(() => {
    const timer = setTimeout(() => {
      editRoomType(currentEditing);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [currentEditing]);

  // utility functions
  const addRoomType = () => {
    dispatch(hotelActions.createRoomType(hotel.value, { name: "Nueva categoria", hotel: hotel.value })).then(() => {
      dispatch(hotelActions.fetchRoomTypes(hotel.value));
    });
  };

  const deleteRoomType = (roomType) => {
    dispatch(hotelActions.deleteRoomType(hotel.value, roomType.id)).then(() => {
      dispatch(hotelActions.fetchRoomTypes(hotel.value));
    });
  };

  const editRoomType = ({ index, value }) => {
    if (index && value) {
      dispatch(hotelActions.editRoomType(hotel.value, roomTypesLocal[index].id, roomTypesLocal[index])).then(() => {
        dispatch(hotelActions.fetchRoomTypes(hotel.value));
      });
    }
  };


  const changeRoomTypeValue = (ev, idx) => {
    let roomTypesCopy = roomTypes.slice();
    roomTypesCopy[idx].name = ev.target.value;
    setRoomTypesLocal(roomTypesCopy);
    setCurrentEditing({ index: idx, value: ev.target.value });
  };

  const saveChanges = (e) => {
    editRoomType(currentEditing);
    onClose();
  };


  return (
    <Modal show={show} onHide={onClose}>

      <Modal.Header closeButton>
        <Modal.Title>Configuracion habitaciones</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-2">
          <Col><span className="text-muted">Nombre de la habitacion: </span></Col>
        </Row>
        {!roomTypes.length && <Row>
          <Col className="d-flex justify-content-end align-items-center">
            <Button variant="outline-info" onClick={addRoomType}><i className="fas fa-plus"></i></Button>
          </Col>
        </Row>
        }
        {
          roomTypesLocal.map((roomType, idx) => (
            <Row key={idx}>
              <Col md={9}>
                <Form.Control
                  value={roomType.name}
                  onChange={e => changeRoomTypeValue(e, idx)}
                />
              </Col>
              <Col md={3} className="d-flex align-items-center justify-content-between mb-3">
                <Button variant="danger" onClick={e => deleteRoomType(roomType)}>
                  <i className="fas fa-trash icon-button"></i>
                </Button>
                {
                  (idx === (roomTypes.length - 1)) &&
                  <Button variant="outline-info" onClick={addRoomType}>
                    <i className="fas fa-plus"></i>
                  </Button>
                }
              </Col>
            </Row>
          ))
        }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={onClose}> Cancelar </Button>
        <Button variant="secondary" onClick={saveChanges}> Guardar </Button>
      </Modal.Footer>
    </Modal>
  );
};

RoomListModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  hotel: PropTypes.object,
};


export default RoomListModal;
