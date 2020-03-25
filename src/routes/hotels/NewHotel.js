import React, { useEffect, useState } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { sharedActions, hotelActions } from '../../redux/actions';
import DatePicker from 'react-datepicker';
import formatISO from 'date-fns/formatISO';
import { useFormik } from 'formik';


const NewHotel = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sharedActions.fetchCountries());
    dispatch(hotelActions.fetchChains());
  }, [dispatch]);

  const provinces = useSelector(({ shared }) => shared.provinces);
  const countries = useSelector(({ shared }) => shared.countries);
  const chains = useSelector(({ chain }) => chain);

  const [selectedCountry, setSelectedCountry] = useState(null);


  const changeSelectedCountry = ({ label, value }) => {
    dispatch(sharedActions.fetchProvinces(value));
    setSelectedCountry({ label, value });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      chain: null,
      region: null,
      start_date: new Date(),
      active: true,
      address: "",
      email: "",
    },
    validate: values => {
      const errors = {};
      if (!values.email) {
        errors.email = 'Email Requerido';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = 'Email invalido';
      }

      if (!values.name) {
        errors.name = "Nombre requerido";
      }


      return errors;
    },
    onSubmit: values => {
      let hotel = {
        ...values,
        start_date: formatISO(values.start_date).split("T")[0],
        chain: values.chain.value,
        region: values.region.value
      };
      dispatch(hotelActions.createNewHotel(hotel));
      props.onCloseDialog();
    }
  });



  return (
    <Modal show={props.show} onHide={props.onCloseDialog}>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Nuevo Hotel</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Nombre Hotel</Form.Label>
                <Form.Control className={formik.errors.name ? "is-invalid" : ""} name="name" value={formik.values.name} onChange={formik.handleChange} />
                {formik.errors.name && <span className="error_message">{formik.errors.name}</span>}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Marca</Form.Label>
                <Select isLoading={chains.pending} value={formik.values.chain} onChange={value => formik.setFieldValue("chain", value)} options={chains.results.map((e) => ({ label: e.name, value: e.value }))}></Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Pais</Form.Label>
                <Select isLoading={countries.pending} value={selectedCountry} onChange={changeSelectedCountry} options={countries.results.map((e) => ({ label: e.name, value: e.id }))}></Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Provincia</Form.Label>
                <Select isLoading={provinces.pending} value={formik.values.region} isDisabled={!provinces.results.length} onChange={value => formik.setFieldValue("region", value)} options={provinces.results.map((e) => ({ label: e.name, value: e.id }))}></Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Inicio Actividades</Form.Label>
                <DatePicker className="form-control" dateFormat="dd-MM-yyyy" onChange={date => formik.setFieldValue("start_date", date)} selected={formik.values.start_date} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Estado</Form.Label>
                <Form.Switch checked={formik.values.active} onChange={formik.handleChange} id="new_hotel_active_check" name="active" label="Activo" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control className={formik.errors.email ? "is-invalid" : ""} type="email" value={formik.values.email} onChange={formik.handleChange} name="email" />
                {formik.errors.email && <span className="error_message">{formik.errors.email}</span>}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Dirección</Form.Label>
                <Form.Control as="textarea" value={formik.values.address} onChange={formik.handleChange} name="address" />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={props.onCloseDialog} variant="link">Cancelar</Button>
          <Button type="submit" variant="secondary">Agregar</Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default NewHotel;
