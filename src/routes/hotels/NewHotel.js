import React, { useEffect, useState } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { sharedActions, hotelActions } from '../../redux/actions';
import DatePicker from 'react-datepicker';

const NewHotel = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sharedActions.fetchCountries());
    dispatch(hotelActions.fetchChains());
  }, [dispatch]);

  const provinces = useSelector(({ shared }) => shared.provinces);
  const countries = useSelector(({ shared }) => shared.countries);
  const chains = useSelector(({ chain }) => chain);

  const [hotelName, setHotelName] = useState("");
  const [selectedCountry, setSelectedCountry] = useState({});
  const [selectedProvince, setSelectedProvince] = useState({});
  const [selectedChain, setSelectedChain] = useState({});
  const [active, setActive] = useState(false);
  const [date, setDate] = useState(new Date());

  const changeSelectedCountry = ({ label, value }) => {
    dispatch(sharedActions.fetchProvinces(value));
    setSelectedCountry({ label, value });
  };

  const addNewHotel = (e) => {
    const hotel = {
      name: hotelName,
      start_date: new Date(),
      active,
    };
    dispatch(hotelActions.createNewHotel(hotel));
  };


  return (
    <Form>

      <Modal show={props.show} onHide={props.onCloseDialog}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Nuevo Hotel</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Nombre Hotel</Form.Label>
                <Form.Control value={hotelName} onChange={e => setHotelName(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Marca</Form.Label>
                <Select isLoading={chains.pending} onChange={value => setSelectedChain(value)} options={chains.payload.map((e) => ({ label: e.name, value: e.value }))}></Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Pais</Form.Label>
                <Select isLoading={countries.pending} onChange={changeSelectedCountry} options={countries.payload.map((e) => ({ label: e.name, value: e.id }))}></Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Provincia</Form.Label>
                <Select isLoading={provinces.pending} isDisabled={!provinces.payload.length} onChange={(value) => setSelectedProvince(value)} options={provinces.payload.map((e) => ({ label: e.name, value: e.id }))}></Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Inicio Actividades</Form.Label>
                <DatePicker className="form-control" dateFormat="dd-MM-yyyy" onChange={date => setDate(date)} selected={date} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Estado</Form.Label>
                <Form.Switch checked={active} onChange={e => setActive(e.target.checked)} id="new_hotel_active_check" label="Activo" />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={props.onCloseDialog} variant="link">Cancelar</Button>
          <Button onClick={addNewHotel} variant="secondary">Agregar</Button>
        </Modal.Footer>
      </Modal>
    </Form>
  );
};

export default NewHotel;
