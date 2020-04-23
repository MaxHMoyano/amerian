import React, { Fragment } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Form, Button, Table, InputGroup, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import { useState } from 'react';
import { customSelectTheme, globalDateFormat } from '../../../helpers/utilities';
import { useDispatch, useSelector } from 'react-redux';
import { hotelActions, clientActions, currencyActions, rateActions } from '../../../redux/actions';
import { useEffect } from 'react';
import Datepicker from 'react-datepicker';
import { useFormik } from 'formik';
import RoomsModal from "./RoomListModal";
import * as Yup from "yup";
import { formatISO } from 'date-fns';
import _ from "lodash";


function useQuery() {
  return new URLSearchParams(useLocation().search);
};

const NewRate = () => {
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();

  const getTitle = () => {
    switch (query.get("type")) {
      case "0":
        return "Nueva tarifa general";
      case "1":
        return "Nueva tarifa especial";
      case "2":
        return "Nueva promocion";
      default:
        break;
    }
  };

  useEffect(() => {
    dispatch(hotelActions.fetchHotels());
    dispatch(clientActions.fetchClients());
    dispatch(clientActions.fetchClientTypes());
    dispatch(currencyActions.fetchCurrencies());
  }, [dispatch]);

  // All clients types for selection in their respective box
  let hotels = useSelector(({ hotel }) => hotel);
  let corporationClients = useSelector(({ client }) => client.results.filter((client) => client.type === "COR"));
  let corpAgencyClient = useSelector(({ client }) => client.results.filter((client) => client.type === "COA"));
  let operatorClients = useSelector(({ client }) => client.results.filter((client) => client.type === "OPE"));
  let agencyClients = useSelector(({ client }) => client.results.filter((client) => client.type === "AGE"));
  let currencies = useSelector(({ currency }) => currency);
  let clientTypes = useSelector(({ client }) => client.types);
  let roomTypes = useSelector(({ roomTypes }) => roomTypes);
  let currentUserGroups = useSelector(({ user }) => user.current.groups);

  // local state
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showRoomsModal, setShowRoomsModal] = useState(false);


  // Form

  // Yup.addMethod(Yup.date(), "isAlternativeCurrencySelected", )

  const roomTypeSchema = Yup.object().shape({
    name: Yup.string().required(),
    currency: Yup.string().required("El precio del tipo de habitacion es requerido"),
    alternative_currency: Yup.string(),
  });

  const rateSchema = Yup.object().shape({
    name: Yup.string().required("El nombre es requerido"),
    hotel: Yup.object().shape({ label: Yup.string().required(), value: Yup.string().required() }).required("El hotel es requerido").nullable(),
    currency: Yup.object().shape({ label: Yup.string().required(), value: Yup.string().required() }).required("La moneda principal es requerida").nullable(),
    details: Yup.array().of(Yup.object().shape({
      name: Yup.string(),
      date_from: Yup.date().required("La fecha desde principal es requerida").nullable(),
      date_to: Yup.date().required("La fecha hasta principal es requerida").nullable(),
      alternative_date_from: Yup.date().nullable(),
      alternative_date_to: Yup.date().nullable()
    })),
    roomTypes: Yup.array().of(roomTypeSchema),
    alternative_currency: Yup.object().shape({ label: Yup.string().required(), value: Yup.string().required() }).nullable(),
    exchange_rate: Yup.number().when("alternative_currency", (value, schema) => {
      return value ? schema.required("El tipo de cambio es requerido").min(0, "La tasa de cambio debe ser positiva") : schema.nullable();
    }),
  });

  const buildBasicDetail = () => {
    return {
      name: "",
      date_from: new Date(),
      date_to: null,
      alternative_date_from: null,
      alternative_date_to: null,
    };
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      hotel: null,
      currency: null,
      details: [
        {
          name: "",
          date_from: new Date(),
          date_to: null,
          alternative_date_from: null,
          alternative_date_to: null,
        }
      ],
      alternative_currency: null,
      exchange_rate: "",
      agreement_discount: 0,
      type: 0, // Hay que poner el tipo de la URL
      observations: "",
      roomTypes: [
      ],
      COR: {
        base: "",
        exceptions: [
          { value: "", names: [] }
        ],
      },
      OPE: {
        base: "",
        exceptions: [
          { value: "", names: [] }
        ],
      },
      AGE: {
        base: "",
        exceptions: [
          { value: "", names: [] }
        ],
      },
      COA: {
        base: "",
        exceptions: [
          { value: "", names: [] }
        ],
      },
    },
    validationSchema: rateSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      let isManager = currentUserGroups.some((e) => e === 1);
      let rate = {
        name: values.name,
        currency: values.currency.value,
        hotel: values.hotel.value,
        alternative_currency: values.alternative_currency ? values.alternative_currency.value : null,
        exchange_rate: values.exchange_rate ? values.exchange_rate : null,
        agreement_discount: values.agreement_discount,
        user: JSON.parse(sessionStorage.getItem("user")).id,
        type: query.get("type"),
        observations: values.observations,
        status: 1
      };
      if (isManager) {
        rate.status = 2;
      }
      // Creo la rate principal
      dispatch(rateActions.createRate(values.hotel.value, rate)).then((rate) => {
        // Creo los amounts por cada habitacion
        Promise.all(formik.values.roomTypes.map(e => dispatch(rateActions.createRateAmount(values.hotel.value, rate.id, { roomCategory: e.id, rate: rate.id, amount: e.currency })))).then((rateAmounts) => {
          // Creo el detalle
          let details = values.details.map((e) => dispatch(rateActions.createRateDetail(values.hotel.value, rate.id, {
            date_from: formatISO(e.date_from).split("T")[0],
            date_to: formatISO(e.date_to).split("T")[0],
            alternative_date_from: e.alternative_date_from ? formatISO(e.alternative_date_from).split("T")[0] : null,
            alternative_date_to: e.alternative_date_to ? formatISO(e.alternative_date_to).split("T")[0] : null,
            rate: rate.id,
            name: e.name,
          })));
          Promise.all(details).then(() => {
            let conditions = buildConditions(rate.id);
            console.log(conditions);
            conditions = conditions.map((condition) => dispatch(rateActions.createRateCondition(values.hotel.value, rate.id, condition)));
            Promise.all(conditions).then((res) => {
              setSubmitting(false);
              resetForm();
              history.goBack();
            });
          });
        });
      });
    }
  });

  const buildConditions = (rateId) => {
    let conditions = [];
    activeEx.forEach((ex) => {
      if (ex.useUsd || ex.useArs) {
        let baseCondition = {
          client_type: ex.name,
          use_usd: ex.useUsd,
          use_ars: ex.useArs,
          rate: rateId,
          percentage: formik.values[ex.name].base,
        };
        conditions.push(baseCondition);
        formik.values[ex.name].exceptions.forEach((e) => {
          let exception = {
            ...baseCondition,
            percentage: e.value,
            clients: e.names.map((el) => el.value)
          };
          conditions.push(exception);
        });
      }
    });
    return conditions;
  };

  useEffect(() => {
    formik.setFieldValue("roomTypes", roomTypes.results.map((e) => ({ ...e, currency: "", alternative_currency: "" })));
  }, [roomTypes.results]);

  // Utility function

  const isActive = (type) => {
    let clientType = activeEx.find(e => e.name === type);
    if (clientType.useArs || clientType.useUsd) {
      return true;
    }
    return false;
  };

  const [activeEx, setActiveEx] = useState([
    { name: "COR", useUsd: false, useArs: false },
    { name: "OPE", useUsd: false, useArs: false },
    { name: "AGE", useUsd: false, useArs: false },
    { name: "COA", useUsd: false, useArs: false },
  ]);

  const handleClientTypeChange = e => {
    let activeExCopy = activeEx.slice();
    let clientTypeIdx = activeExCopy.findIndex(ex => ex.name === e.target.id.split("-")[0]);
    let currency = e.target.id.split("-")[1];
    activeExCopy[clientTypeIdx] = {
      ...activeExCopy[clientTypeIdx],
      useUsd: currency === "USD" ? e.target.checked : activeExCopy[clientTypeIdx].useUsd,
      useArs: currency === "ARS" ? e.target.checked : activeExCopy[clientTypeIdx].useArs,
    };
    setActiveEx(activeExCopy);
  };


  const handleHotelChange = (value) => {
    formik.setFieldValue("hotel", value);
    dispatch(hotelActions.fetchRoomTypes(value.value));
    setSelectedHotel(value);
  };

  const handleRoomTypeChange = (value, idx) => {
    formik.setFieldValue(`roomTypes[${idx}].currency`, value);
    if (formik.values.alternative_currency && formik.values.exchange_rate) {
      formik.setFieldValue(`roomTypes[${idx}].alternative_currency`, (value * formik.values.exchange_rate).toFixed(4));
    }
  };

  const handleExchangeRateChange = (e) => {
    formik.setFieldValue("exchange_rate", e.target.value);
    if (formik.values.alternative_currency) {
      formik.values.roomTypes.forEach((el, idx) => {
        formik.setFieldValue(`roomTypes[${idx}].alternative_currency`, (el.currency * e.target.value).toFixed(4));
      });
    }
  };

  const hasErrors = (idx, key) => {

    if (formik.errors.details && formik.errors.details.length) {
      if (formik.errors.details[idx] && formik.errors.details[idx][key] && !(_.isEmpty(formik.touched.details)) && formik.touched.details[idx] && formik.touched.details[idx][key]) {
        return true;
      }
    }
    return false;
  };

  const addNewDetail = (e) => {
    let newDetail = buildBasicDetail();
    formik.setFieldValue("details", [
      newDetail,
      ...formik.values.details,
    ]);
  };

  return (
    <Fragment>
      <Form onSubmit={formik.handleSubmit} autoComplete="off" style={{ width: "70%" }}>
        <div className="d-flex align-items-center mb-5">
          <Button onClick={() => history.goBack()} variant="light"><i className="fas fa-chevron-left"></i></Button>
          <h3 className="font-weight-bold text-primary mb-0 ml-2">{getTitle()}</h3>
        </div>
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Nombre Hotel</Form.Label>
              <Select
                isLoading={hotels.pending}
                isDisabled={!hotels.results.length}
                options={hotels.results.map((hotel) => ({ label: hotel.name, value: hotel.id }))}
                className="react_select_container"
                classNamePrefix="react_select"
                value={formik.values.hotel}
                onChange={handleHotelChange}
              />
              {formik.errors.hotel && formik.touched.hotel && <span className="error_message">{formik.errors.hotel}</span>}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Nombre de la Solicitud</Form.Label>
              <Form.Control
                name="name"
                className={formik.errors.name && formik.touched.name ? "is-invalid" : ""}
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.name && formik.touched.name && <span className="error_message">{formik.errors.name}</span>}
            </Form.Group>
          </Col>
        </Row>
        {
          query.get("type") === "0" &&
          <div>
            <h3 className="text-muted mt-5">Vigencia y Monedas</h3>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Moneda base</Form.Label>
                  <Select
                    options={currencies.results.map((currency) => ({ label: currency.name, value: currency.value }))}
                    className="react_select_container"
                    classNamePrefix="react_select"
                    value={formik.values.currency}
                    onChange={value => formik.setFieldValue("currency", value)}
                  />
                  {formik.errors.currency && formik.touched.currency && <span className="error_message">{formik.errors.currency}</span>}
                </Form.Group>
              </Col>
              <Col md={{ span: 4, offset: 2 }}>
                <Form.Group>
                  <Form.Label>Vigencia de la tarifa</Form.Label>
                  <div className="d-flex">
                    <div className="d-flex flex-column">
                      <Datepicker
                        className={`form-control ${hasErrors(0, "date_from") ? "is-invalid" : ""}`}
                        placeholderText="Desde"
                        selected={formik.values.details[0].date_from}
                        onChange={value => formik.setFieldValue("details[0].date_from", value)}
                        dateFormat={globalDateFormat}
                      />
                      {hasErrors(0, "date_from") && <span className="error_message">{formik.errors.details[0].date_from}</span>}
                    </div>
                    <div className="d-flex flex-column">
                      <Datepicker
                        className={`form-control ${hasErrors(0, "date_to") ? "is-invalid" : ""}`}
                        selected={formik.values.details[0].date_to}
                        onChange={value => formik.setFieldValue("details[0].date_to", value)}
                        placeholderText="Hasta"
                        dateFormat={globalDateFormat}
                      />
                      {hasErrors(0, "date_to") && <span className="error_message">{formik.errors.details[0].date_to}</span>}
                    </div>
                  </div>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Moneda alternativa</Form.Label>
                  <Select
                    isClearable
                    value={formik.values.alternative_currency}
                    onChange={value => formik.setFieldValue("alternative_currency", value)}
                    options={currencies.results.map((currency) => ({ label: currency.name, value: currency.value }))}
                    className="react_select_container"
                    classNamePrefix="react_select" />
                  {formik.errors.alternative_currency && formik.touched.alternative_currency && <span className="error_message">{formik.errors.alternative_currency}</span>}
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group>
                  <Form.Label>Cambio</Form.Label>
                  <Form.Control
                    step="0.01"
                    type="number"
                    name="exchange_rate"
                    value={formik.values.exchange_rate}
                    onChange={handleExchangeRateChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.exchange_rate && formik.touched.exchange_rate && <span className="error_message">{formik.errors.exchange_rate}</span>}
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Vigencia de la tarifa</Form.Label>
                  <div className="d-flex">
                    <div className="d-flex flex-column">
                      <Datepicker
                        className={`form-control ${hasErrors(0, "alternative_date_from") ? "is-invalid" : ""}`}
                        placeholderText="Desde"
                        selected={formik.values.details[0].alternative_date_from}
                        onChange={value => formik.setFieldValue("details[0].alternative_date_from", value)}
                        dateFormat={globalDateFormat}
                      />
                      {hasErrors(0, "alternative_date_from") && <span className="error_message">{formik.errors.details[0].alternative_date_from}</span>}
                    </div>
                    <div className="d-flex flex-column">
                      <Datepicker
                        className={`form-control ${hasErrors(0, "alternative_date_to") ? "is-invalid" : ""}`}
                        placeholderText="Hasta"
                        selected={formik.values.details[0].alternative_date_to}
                        onChange={value => formik.setFieldValue("details[0].alternative_date_to", value)}
                        dateFormat={globalDateFormat}
                      />
                      {hasErrors(0, "alternative_date_to") && <span className="error_message">{formik.errors.details[0].alternative_date_to}</span>}
                    </div>
                  </div>
                </Form.Group>
              </Col>
            </Row>
          </div>
        }

        {
          query.get("type") !== "0" &&
          <div>
            <h3 className="text-muted mt-5">Vigencia y fechas especiales</h3>
            {
              formik.values.details.map((detail, idx) => (
                <Row key={idx}>
                  <Col>
                    <Form.Group>
                      <Form.Label>Vigencia de la tarifa</Form.Label>
                      <div className="d-flex">
                        <div className="d-flex flex-column">
                          <Datepicker
                            className={`form-control ${hasErrors(idx, "date_from") ? "is-invalid" : ""}`}
                            placeholderText="Desde"
                            selected={formik.values.details[idx].date_from}
                            onChange={value => formik.setFieldValue(`details[${idx}].date_from`, value)}
                            dateFormat={globalDateFormat}
                          />
                          {hasErrors(idx, "date_from") && <span className="error_message">{formik.errors.details[idx].date_from}</span>}
                        </div>
                        <div className="d-flex flex-column">
                          <Datepicker
                            className={`form-control ${hasErrors(idx, "date_to") ? "is-invalid" : ""}`}
                            placeholderText="Hasta"
                            selected={formik.values.details[idx].date_to}
                            onChange={value => formik.setFieldValue(`details[${idx}].date_to`, value)}
                            dateFormat={globalDateFormat}
                          />
                          {hasErrors(idx, "date_to") && <span className="error_message">{formik.errors.details[idx].date_to}</span>}
                        </div>
                      </div>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Ocación</Form.Label>
                      <Form.Control
                        name={`details[${idx}].name`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.details[idx].name}
                      />
                    </Form.Group>

                  </Col>
                  <Col className="d-flex align-items-center">
                    <Button onClick={e => addNewDetail(idx)} variant="outline-info"><i className="fas fa-plus"></i></Button>
                  </Col>
                </Row>
              ))
            }
            <h3 className="text-muted mt-5">Monedas</h3>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Moneda base</Form.Label>
                  <Select
                    options={currencies.results.map((currency) => ({ label: currency.name, value: currency.value }))}
                    className="react_select_container"
                    classNamePrefix="react_select"
                    value={formik.values.currency}
                    onChange={value => formik.setFieldValue("currency", value)}
                  />
                  {formik.errors.currency && formik.touched.currency && <span className="error_message">{formik.errors.currency}</span>}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Moneda alternativa</Form.Label>
                  <Select
                    isClearable
                    value={formik.values.alternative_currency}
                    onChange={value => formik.setFieldValue("alternative_currency", value)}
                    options={currencies.results.map((currency) => ({ label: currency.name, value: currency.value }))}
                    className="react_select_container"
                    classNamePrefix="react_select" />
                  {formik.errors.alternative_currency && formik.touched.alternative_currency && <span className="error_message">{formik.errors.alternative_currency}</span>}
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group>
                  <Form.Label>Cambio</Form.Label>
                  <Form.Control
                    step="0.01"
                    type="number"
                    name="exchange_rate"
                    value={formik.values.exchange_rate}
                    onChange={handleExchangeRateChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.exchange_rate && formik.touched.exchange_rate && <span className="error_message">{formik.errors.exchange_rate}</span>}
                </Form.Group>
              </Col>
            </Row>
          </div>
        }


        {/* Room types */}
        <div>
          <RoomsModal hotel={selectedHotel} show={showRoomsModal} onClose={e => setShowRoomsModal(false)} />
          <h3 className="text-muted mt-5">Categorias de habitaciones y Racks</h3>
          <Table hover bordered>
            <thead>
              <tr>
                <th width="70%">
                  <Button
                    disabled={!formik.values.hotel}
                    onClick={e => setShowRoomsModal(true)}
                    variant="outline-info">Configurar Habitaciones</Button>
                </th>
                {
                  formik.values.currency && <th><span className="text-muted">{formik.values.currency.label}</span></th>
                }
                {
                  formik.values.alternative_currency && <th><span className="text-muted">{formik.values.alternative_currency.label}</span></th>
                }
              </tr>
            </thead>
            <tbody>
              {
                formik.values.roomTypes.map((room, idx) => (
                  <tr key={idx}>
                    <td>{room.name}</td>
                    {
                      formik.values.currency && <td>
                        <div className="d-flex flex-column">
                          <Form.Control
                            type="number"
                            name={`roomTypes[${idx}].currency`}
                            value={formik.values.roomTypes[idx].currency}
                            onChange={e => handleRoomTypeChange(e.target.value, idx)}
                          />
                          {/* {formik.errors.roomTypes[idx] && formik.errors.roomTypes[idx].currency && <span className="error_message">{formik.errors.roomTypes[idx].currency}</span>} */}
                        </div>
                      </td>
                    }
                    {
                      formik.values.alternative_currency && <td>
                        <Form.Control
                          disabled
                          type="number"
                          name={`roomTypes[${idx}].alternative_currency`}
                          value={formik.values.roomTypes[idx].alternative_currency}
                        />
                      </td>
                    }
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </div>
        <h3 className="text-muted mt-5">Bases para convenios</h3>
        <p className="text-muted mb-0">Tarifa base convenio</p>
        <Row>
          <Col md={2}>
            <InputGroup>
              <Form.Control
                name="agreement_discount"
                value={formik.values.agreement_discount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <InputGroup.Append>
                <InputGroup.Text>%</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>
        <p className="text-muted mb-0 mt-4">Tipos de tarifas disponibles en el hotel: <span className="text-primary">*</span></p>
        <div className="d-flex">
          {
            clientTypes.map((clientType) => (
              <div key={clientType.value} className="d-flex flex-column px-4 py-2 border-right">
                {
                  currencies.results.map((currency) => (
                    <Form.Check
                      key={`${clientType.value}-${currency.value}`}
                      className="py-2"
                      custom
                      type="checkbox"
                      onChange={handleClientTypeChange}
                      label={`${clientType.name} (${currency.value})`}
                      id={`${clientType.value}-${currency.value}`} />
                  ))
                }
              </div>
            ))
          }
        </div>

        {isActive("COR") && <div className="bg-gray p-4 mt-5">
          <Row>
            <Col md={6}>
              <span className="section_title">Descuentos Corporativos</span>
            </Col>
            <Col md={{ span: 2, offset: 4 }} className="d-flex align-items-center">
              <Form.Control
                name="COR.base"
                value={formik.values.COR.base}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <span className="ml-2">%</span>
            </Col>
          </Row>
          <p className="text-muted"><strong>Excepciones: </strong> Rango recomendado es entre el 17% y el 21%</p>
          {
            formik.values.COR.exceptions.map((exc, idx) => (
              <Row className="mb-2" key={idx}>
                <Col md={8}>
                  <Select
                    value={exc.names}
                    onChange={value => formik.setFieldValue(`COR.exceptions[${idx}].names`, value)}
                    isMulti
                    options={corporationClients.map((client) => ({ label: client.name, value: client.id }))}
                    closeMenuOnSelect={false}
                  />
                </Col>
                <Col md={4} className="d-flex align-items-center justify-content-end">
                  <Form.Control
                    name={`COR.exceptions[${idx}].value`}
                    className="flex-1"
                    type="text"
                    value={exc.value}
                    onChange={formik.handleChange}
                  />
                  <span className="ml-1">%</span>
                  <i onClick={e => formik.values.COR.exceptions.splice(idx)} className="fas fa-trash mx-3 icon-button"></i>
                  <Button variant="outline-info mx-1">
                    <i className="fas fa-plus"></i>
                  </Button>
                </Col>
              </Row>
            ))
          }
        </div>}

        {isActive("OPE") && <div className="bg-gray p-4 mt-5">
          <Row>
            <Col md={6}>
              <span className="section_title">Descuentos Operadores</span>
            </Col>
            <Col md={{ span: 2, offset: 4 }} className="d-flex align-items-center">
              <Form.Control
                name="OPE.base"
                value={formik.values.OPE.base}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <span className="ml-2">%</span>
            </Col>
          </Row>
          <p className="text-muted"><strong>Excepciones: </strong> Rango recomendado es entre el 17% y el 21%</p>
          {
            formik.values.OPE.exceptions.map((exc, idx) => (
              <Row className="mb-2" key={idx}>
                <Col md={8}>
                  <Select
                    value={exc.names}
                    onChange={value => formik.setFieldValue(`OPE.exceptions[${idx}].names`, value)}
                    isMulti
                    options={operatorClients.map((client) => ({ label: client.name, value: client.id }))}
                    closeMenuOnSelect={false}
                  />
                </Col>
                <Col md={4} className="d-flex align-items-center justify-content-end">
                  <Form.Control
                    name={`OPE.exceptions[${idx}].value`}
                    className="flex-1"
                    type="text"
                    value={exc.value}
                    onChange={formik.handleChange}
                  />
                  <span className="ml-1">%</span>
                  <i onClick={e => formik.values.OPE.exceptions.splice(idx)} className="fas fa-trash mx-3 icon-button"></i>
                  <Button variant="outline-info mx-1">
                    <i className="fas fa-plus"></i>
                  </Button>
                </Col>
              </Row>
            ))
          }
        </div>}

        {isActive("AGE") && <div className="bg-gray p-4 mt-5">
          <Row>
            <Col md={6}>
              <span className="section_title">Descuentos de agencias T&T</span>
            </Col>
            <Col md={{ span: 2, offset: 4 }} className="d-flex align-items-center">
              <Form.Control
                name="AGE.base"
                value={formik.values.AGE.base}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <span className="ml-2">%</span>
            </Col>
          </Row>
          <p className="text-muted"><strong>Excepciones: </strong> Rango recomendado es entre el 17% y el 21%</p>
          {
            formik.values.AGE.exceptions.map((exc, idx) => (
              <Row className="mb-2" key={idx}>
                <Col md={8}>
                  <Select
                    value={exc.names}
                    onChange={value => formik.setFieldValue(`AGE.exceptions[${idx}].names`, value)}
                    isMulti
                    options={agencyClients.map((client) => ({ label: client.name, value: client.id }))}
                    closeMenuOnSelect={false}
                  />
                </Col>
                <Col md={4} className="d-flex align-items-center justify-content-end">
                  <Form.Control
                    name={`AGE.exceptions[${idx}].value`}
                    className="flex-1"
                    type="text"
                    value={exc.value}
                    onChange={formik.handleChange}
                  />
                  <span className="ml-1">%</span>
                  <i onClick={e => formik.values.AGE.exceptions.splice(idx)} className="fas fa-trash mx-3 icon-button"></i>
                  <Button variant="outline-info mx-1">
                    <i className="fas fa-plus"></i>
                  </Button>
                </Col>
              </Row>
            ))
          }
        </div>}

        {isActive("COA") && <div className="bg-gray p-4 mt-5">
          <Row>
            <Col md={6}>
              <span className="section_title">Descuentos Agencias Corporativas</span>
            </Col>
            <Col md={{ span: 2, offset: 4 }} className="d-flex align-items-center">
              <Form.Control
                name="COA.base"
                value={formik.values.COA.base}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <span className="ml-2">%</span>
            </Col>
          </Row>
          <p className="text-muted"><strong>Excepciones: </strong> Rango recomendado es entre el 17% y el 21%</p>
          {
            formik.values.COA.exceptions.map((exc, idx) => (
              <Row className="mb-2" key={idx}>
                <Col md={8}>
                  <Select
                    value={exc.names}
                    onChange={value => formik.setFieldValue(`COA.exceptions[${idx}].names`, value)}
                    isMulti
                    options={corpAgencyClient.map((client) => ({ label: client.name, value: client.id }))}
                    closeMenuOnSelect={false}
                  />
                </Col>
                <Col md={4} className="d-flex align-items-center justify-content-end">
                  <Form.Control
                    name={`COA.exceptions[${idx}].value`}
                    className="flex-1"
                    type="text"
                    value={exc.value}
                    onChange={formik.handleChange}
                  />
                  <span className="ml-1">%</span>
                  <i onClick={e => formik.values.COA.exceptions.splice(idx)} className="fas fa-trash mx-3 icon-button"></i>
                  <Button variant="outline-info mx-1">
                    <i className="fas fa-plus"></i>
                  </Button>
                </Col>
              </Row>
            ))
          }
        </div>}



        {/* Observations */}
        <h3 className="text-muted mt-5">Observaciones</h3>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label className="text-muted">Observaciones Convenio</Form.Label>
              <Form.Control
                rows="5"
                as="textarea"
                name="observations"
                value={formik.values.observations}
                onChange={formik.handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-2 border-top">
          {
            !formik.isSubmitting ?
              <Col className="d-flex align-items-center justify-content-end pt-3">
                <Button variant="link" onClick={() => history.goBack()}>Cancelar</Button>
                <Button type="submit" variant="secondary">Guardar</Button>
              </Col> :
              <Col className="d-flex align-items-center justify-content-end pt-3">
                <i className="fas fa-spin fa-spinner fa-2x"></i>
              </Col>
          }
        </Row>
      </Form>
    </Fragment>
  );
};

export default NewRate;