import React, { Fragment, useEffect, useState } from "react";
import { Button, Table, Row, Col, Badge, Pagination, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { hotelActions } from "../../redux/actions";
import HotelDetail from "./HotelDetail";
import DeleteHotel from "./DeleteHotel";

const HotelsList = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hotelActions.fetchHotels());
  }, [dispatch]);


  const [selectedHotel, setSelectedHotel] = useState({});
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);


  const handleDeleteHotel = (hotel) => {
    setSelectedHotel(hotel);
    setShowDeleteModal(true);
  };


  let hotels = useSelector(({ hotel }) => hotel);
  return <Fragment>
    <HotelDetail onClose={e => setShowDetailModal(false)} show={showDetailModal} />
    <DeleteHotel hotel={selectedHotel} onClose={e => setShowDeleteModal(false)} show={showDeleteModal} />
    <Row>
      <Col className="d-flex">
        <Button onClick={() => setShowDetailModal(true)} className="is_rounded" variant="secondary">Agregar Hotel</Button>
      </Col>
    </Row>
    <Row className="mt-4">
      <Col>
        {
          !hotels.pending ? hotels.results.length ?
            <div>
              <Table hover>
                <thead>
                  <tr>
                    <th>Hotel</th>
                    <th>Pais</th>
                    <th>Provincia</th>
                    <th>Estado</th>
                    <th>
                      <Button variant="light" disabled>
                        <i className="fas fa-ellipsis-h"></i>

                      </Button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    hotels.results.map((hotel) => (
                      <tr key={hotel.id} className="table_link">
                        <td>
                          <div className="d-flex flex-column">
                            <p className="m-0" style={{ fontSize: "1.05rem" }}>{hotel.name}</p>
                            <p className="text-muted m-0">{hotel.chain}</p>
                          </div>
                        </td>
                        <td>{hotel.country}</td>
                        <td>{hotel.region}</td>
                        <td>
                          <Badge className="p-2" variant={hotel.active ? "success" : "danger"}>{hotel.active ? "Activo" : "Inactivo"}</Badge>
                        </td>
                        <td>
                          <Dropdown drop="left">
                            <Dropdown.Toggle variant="light">
                              <i className="fas fa-ellipsis-h"></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item
                                as="button"
                                className="d-flex justify-content-between align-items-center">
                                <span>Editar</span> <i className="fas fa-edit"></i>
                              </Dropdown.Item>
                              <Dropdown.Item
                                as="button"
                                onClick={e => handleDeleteHotel(hotel)}
                                className="d-flex justify-content-between align-items-center">
                                <span>Eliminar</span> <i className="fas fa-trash"></i>
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
              <Pagination className="justify-content-end">
                <Pagination.Prev />
                <Pagination.Item active>{1}</Pagination.Item>
                <Pagination.Ellipsis />
                <Pagination.Item>{20}</Pagination.Item>
                <Pagination.Next />
              </Pagination>
            </div>

            :
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h4 className="text-muted text-center" onClick={e => setShowDetailModal(true)}>No existen hoteles creados. Crea uno ahora!</h4>
              <i className="fas fa-hotel fa-4x text-muted"></i>
            </div> : <div className="d-flex flex-column justify-content-center align-items-center"> <i className="fas fa-spinner fa-spin fa-3x"></i> </div>
        }
      </Col>
    </Row>
  </Fragment>;
};

export default HotelsList;
