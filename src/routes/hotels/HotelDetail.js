import React, { useState, useEffect } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { sharedActions, hotelActions } from '../../redux/actions';
import DatePicker from 'react-datepicker';
import { formatISO, parseISO } from 'date-fns';
import { useFormik } from 'formik';
import * as Yup from "yup";
import _ from "lodash";

const HotelDetail = (props) => {
  const dispatch = useDispatch();

  const regions = useSelector(({ shared }) => shared.regions);
  const countries = useSelector(({ shared }) => shared.countries);
  const chains = useSelector(({ chain }) => chain);

  const [selectedCountry, setSelectedCountry] = useState(null);

  const changeSelectedCountry = ({ label, value }, region) => {
    setSelectedCountry({ label, value });
    if (!_.isEmpty(region)) {
      formik.setFieldValue("region", region);
    } else {
      dispatch(sharedActions.fetchRegions(value));
      formik.setFieldValue("region", null);
    }
  };

  const hotelSchema = Yup.object().shape({
    name: Yup.string().required("El nombre es requerido"),
    chain: Yup.object().shape({ label: Yup.string().required(), value: Yup.string().required() }).nullable().required("La marca es requerida"),
    region: Yup.object().shape({ label: Yup.string().required(), value: Yup.string().required() }).nullable().required("La provincia es requerida"),
    start_date: Yup.date().nullable().required("La fecha de inicio es requerida"),
    active: Yup.boolean(),
    address: Yup.string().required("La direccion es requerida"),
    email: Yup.string().email("Email invalido").required("El email es requerido"),
  });

  useEffect(() => {
    if (!_.isEmpty(props.selected)) {
      dispatch(hotelActions.fetchHotel(props.selected.id)).then((hotel) => {
        dispatch(sharedActions.fetchRegion(hotel.country, hotel.region)).then((region) => {
          formik.setValues({
            name: hotel.name,
            chain: {
              label: chains.results.find((e) => e.value === hotel.chain).name,
              value: chains.results.find((e) => e.value === hotel.chain).value
            },
            start_date: parseISO(hotel.start_date),
            active: hotel.active,
            address: hotel.address,
            email: hotel.email
          });
          changeSelectedCountry(
            {
              label: countries.results.find((e) => e.id === hotel.country).name,
              value: countries.results.find((e) => e.id === hotel.country).id
            },
            {
              label: region.name,
              value: region.id
            }
          );
        });
      });
    }
  }, [dispatch, props.selected, chains]);

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
    validationSchema: hotelSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      let hotel = {
        ...values,
        start_date: formatISO(values.start_date).split("T")[0],
        chain: values.chain.value,
        region: values.region.value
      };
      if (!_.isEmpty(props.selected)) {
        dispatch(hotelActions.updateHotel(props.selected.id, hotel)).then(() => {
          dispatch(hotelActions.fetchHotels()).then(() => {
            setSubmitting(false);
            props.onClose();
            resetForm();
          });
        });
      } else {
        dispatch(hotelActions.createHotel(hotel)).then(() => {
          dispatch(hotelActions.fetchHotels()).then(() => {
            setSubmitting(false);
            props.onClose();
            resetForm();
          });
        });
      }
    }
  });



  return (
    <Modal show={props.show} onHide={props.onClose}>
      <Form onSubmit={formik.handleSubmit} autoComplete="off">
        <Modal.Header closeButton>
          <Modal.Title>Agregar Nuevo Hotel</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Nombre Hotel</Form.Label>
                <Form.Control
                  className={formik.errors.name && formik.touched.name ? "is-invalid" : ""}
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.name && formik.touched.name && <span className="error_message">{formik.errors.name}</span>}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Marca</Form.Label>
                <Select
                  isLoading={chains.pending}
                  value={formik.values.chain}
                  onChange={value => formik.setFieldValue("chain", value)}
                  options={chains.results.map((e) => ({ label: e.name, value: e.value }))} />
                {formik.errors.chain && formik.touched.chain && <span className="error_message">{formik.errors.chain}</span>}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Pais</Form.Label>
                <Select
                  isLoading={countries.pending}
                  value={selectedCountry}
                  onChange={changeSelectedCountry}
                  options={countries.results.map((e) => ({ label: e.name, value: e.id }))} />

              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Provincia</Form.Label>
                <Select
                  isLoading={regions.pending}
                  value={formik.values.region}
                  isDisabled={!regions.results.length && _.isEmpty(selectedCountry)}
                  onChange={value => formik.setFieldValue("region", value)}
                  options={regions.results.map((e) => ({ label: e.name, value: e.id }))} />
                {formik.errors.region && formik.touched.region && <span className="error_message">{formik.errors.region}</span>}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Inicio Actividades</Form.Label>
                <DatePicker
                  className={`form-control ${formik.errors.start_date && formik.touched.start_date ? "is-invalid" : ""}`}
                  dateFormat="dd-MM-yyyy"
                  onChange={date => formik.setFieldValue("start_date", date)}
                  selected={formik.values.start_date}
                />
                {formik.errors.start_date && formik.touched.start_date && <span className="error_message">{formik.errors.start_date}</span>}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Estado</Form.Label>
                <Form.Switch
                  checked={formik.values.active}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  id="new_hotel_active_check"
                  name="active"
                  label="Activo"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  className={formik.errors.email && formik.touched.email ? "is-invalid" : ""}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="email" />
                {formik.errors.email && formik.touched.email && <span className="error_message">{formik.errors.email}</span>}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                  className={formik.errors.address && formik.touched.address ? "is-invalid" : ""}
                  as="textarea"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="address" />
                {formik.errors.address && formik.touched.address && <span className="error_message">{formik.errors.address}</span>}
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        {
          !formik.isSubmitting ?
            <Modal.Footer>
              <Button onClick={e => { props.onClose(); formik.resetForm(); }} variant="link">Cancelar</Button>
              <Button type="submit" variant="secondary">Agregar</Button>
            </Modal.Footer> :
            <Modal.Footer>
              <i className="fas fa-spinner fa-spin fa-2x"></i>
            </Modal.Footer>
        }
      </Form>
    </Modal>
  );
};

export default HotelDetail;
