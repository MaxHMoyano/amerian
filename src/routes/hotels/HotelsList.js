import React, { Fragment, useEffect, useState } from "react";
import { Button, Table, Row, Col, Form, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { hotelActions } from "../../redux/actions";
import NewHotel from "./NewHotel";

const HotelsList = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hotelActions.fetchHotels());
  }, [dispatch]);

  const onCloseDialog = () => {
    setShowNewModal(false);
  };

  const [showNewModal, setShowNewModal] = useState(false);

  let hotels = useSelector(({ hotel }) => hotel);
  return <Fragment>
    <NewHotel onCloseDialog={onCloseDialog} show={showNewModal} />
    <Row>
      <Col className="d-flex">
        <Button onClick={() => setShowNewModal(true)} className="is_rounded" variant="secondary">Agregar Hotel</Button>
        {/* <div className="icon_input">
          <Form.Control className="mx-3"></Form.Control>
          <i className="fas fa-search"></i>
        </div> */}
      </Col>
    </Row>
    <Row className="mt-4">
      <Col>
        {
          !hotels.pending ? hotels.results.length ?
            <Table hover>
              <thead>
                <tr>
                  <th>Hotel</th>
                  <th>Pais</th>
                  {/* <th>Provincia</th> */}
                  <th>Estado</th>
                  <th>
                    <i className="fas fa-ellipsis-h"></i>
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  hotels.results.map((hotel) => (
                    <tr key={hotel.id} className="table_link">
                      <td>
                        <div className="d-flex flex-column">
                          <h5>{hotel.name}</h5>
                          <p className="text-muted m-0">{hotel.chain}</p>
                        </div>
                      </td>
                      <td>{hotel.country.name}</td>
                      {/* <td>{hotel.region}</td> */}
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
            </Table> :
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h4 className="text-muted text-center">No existen hoteles creados</h4>
              <i className="fas fa-hotel fa-4x text-muted"></i>
            </div> : <div className="d-flex flex-column justify-content-center align-items-center"> <i className="fas fa-spinner fa-spin fa-3x"></i> </div>
        }
      </Col>
    </Row>
  </Fragment>;
};

export default HotelsList;
