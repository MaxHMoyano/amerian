import React, { Fragment, useEffect, useState } from "react";
import { Button, Table, Row, Col, Form, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { hotelsActions } from "../../redux/actions";
import NewHotel from "./NewHotel";

const HotelsList = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hotelsActions.fetchHotels());
  }, [dispatch]);

  const [showNewModal, setShowNewModal] = useState(false);

  let hotels = useSelector(({ hotels }) => hotels.payload);

  return <Fragment>
    <NewHotel onCloseDialog={() => setShowNewModal(false)} show={showNewModal} />
    <Row>
      <Col className="d-flex">
        <Button onClick={() => setShowNewModal(true)} className="is_rounded" variant="secondary">Agregar Hotel</Button>
        <div className="icon_input">
          <Form.Control className="mx-3"></Form.Control>
          <i className="fas fa-search"></i>
        </div>

      </Col>
    </Row>
    <Row className="mt-4">
      <Col>
        <Table striped hover>
          <thead>
            <tr>
              <th>Hotel</th>
              <th>Pais</th>
              <th>Provincia</th>
              <th>Habitaciones</th>
              <th>Estado</th>
              <th>
                <i className="fas fa-ellipsis-h"></i>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              hotels.map((hotel) => (
                <tr key={hotel.id}>
                  <td>{hotel.name}</td>
                  <td>Pais</td>
                  <td>Provincia</td>
                  <td>Habitaciones</td>
                  <td>
                    <Badge className="p-2" variant={hotel.active ? "success" : "danger"}>{hotel.active ? "Activo" : "Inactivo"}</Badge>
                  </td>
                  <td>
                    <Button className="mx-1" variant="light"><i className="fas fa-edit"></i></Button>
                    <Button className="mx-1" variant="light"><i className="fas fa-trash"></i></Button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </Col>
    </Row>
  </Fragment>;
};

export default HotelsList;
