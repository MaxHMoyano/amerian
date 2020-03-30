import React, { Fragment } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Form, Button, Table, InputGroup, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import { useState } from 'react';
import { customSelectTheme } from '../../../helpers/utilities';
import { useDispatch, useSelector } from 'react-redux';
import { hotelActions, clientActions, currencyActions, rateActions } from '../../../redux/actions/';
import { useEffect } from 'react';
import Datepicker from 'react-datepicker';
import { useFormik } from 'formik';
import RoomsModal from "./RoomListModal";


function useQuery() {
  return new URLSearchParams(useLocation().search);
};

const NewPetition = () => {
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();

  const getTitle = () => {
    switch (query.get("type")) {
      case "general":
        return "Tarifa General";
      case "special":
        return "Tarifas Especiales";
      case "promotion":
        return "Promociones";
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

  const [roomTypes] = useState([]);
  const [showRoomsModal, setShowRoomsModal] = useState(false);

  let hotels = useSelector(({ hotel }) => hotel);

  // All clients types for selection in their respective box
  let corporationClients = useSelector(({ client }) => client.results.filter((client) => client.type === "COR"));
  let corpAgencyClient = useSelector(({ client }) => client.results.filter((client) => client.type === "COA"));
  let operatorClients = useSelector(({ client }) => client.results.filter((client) => client.type === "OPE"));
  let agencyClients = useSelector(({ client }) => client.results.filter((client) => client.type === "AGE"));
  let currencies = useSelector(({ currency }) => currency);
  let clientTypes = useSelector(({ client }) => client.types);


  const [corpExc, setCorpExc] = useState([{ value: "" }]);
  const [corpAgencyExc, setCorpAgencyExc] = useState([{ value: "" }]);
  const [operatorExc, setOperatorExc] = useState([{ value: "" }]);
  const [agencyExc, setAgencyExc] = useState([{ value: "" }]);

  const isActive = (type) => {
    return activeEx.find(e => e.name === type).active;
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      hotel: null,
      currency: null,
      alternative_currency: null,
      exchange_rate: "",
      agreement_discount: 0,
      type: null,
      observations: "",
      corporationRates: {
        base: "",
        exceptions: [
          { value: "", names: [] }
        ],
      },
      operatorRates: {
        base: "",
        exceptions: [
          { value: "", names: [] }
        ],
      },
      agencyRates: {
        base: "",
        exceptions: [
          { value: "", names: [] }
        ],
      },
      corporateAgencyRates: {
        base: "",
        exceptions: [
          { value: "", names: [] }
        ],
      },
    },
    validate: values => {
      console.log(values);
    },
    onSubmit: (values, { setSubmitting, resetForm }) => {

    }
  });

  const [activeEx, setActiveEx] = useState([
    { name: "COR", active: false },
    { name: "OPE", active: false },
    { name: "AGE", active: false },
    { name: "COA", active: false },
  ]);

  const handleTypeChange = e => {
    let activeExCopy = activeEx.slice();
    let exIdx = activeExCopy.findIndex(ex => ex.name === e.target.id.split("-")[0]);
    activeExCopy[exIdx] = {
      ...activeExCopy[exIdx],
      active: !activeExCopy[exIdx].active
    };
    setActiveEx(activeExCopy);
  };



  return (
    <Fragment>
      <RoomsModal show={showRoomsModal} onClose={e => setShowRoomsModal(false)} rooms={roomTypes} />
      <Form style={{ width: "70%" }}>
        <div className="d-flex align-items-center mb-5">
          <Button onClick={() => history.goBack()} variant="light"><i className="fas fa-chevron-left"></i></Button>
          <h3 className="font-weight-bold text-primary mb-0 ml-2">{getTitle()}</h3>
        </div>

        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Nombre Hotel</Form.Label>
              <Select
                options={hotels.results.map((hotel) => ({ label: hotel.name, value: hotel.id }))}
                className="react_select_container"
                classNamePrefix="react_select"
                value={formik.values.hotel}
                onChange={value => formik.setFieldValue("hotel", value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Nombre de la Solicitud</Form.Label>
              <Form.Control
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Group>
          </Col>
        </Row>
        <h3 className="text-muted mt-5">Vigencia y Monedas</h3>
        <Row>
          <Col md={7}>
            <Form.Group>
              <Form.Label>Moneda base</Form.Label>
              <Select
                options={currencies.results.map((currency) => ({ label: currency.name, value: currency.value }))}
                className="react_select_container"
                classNamePrefix="react_select"
                value={formik.values.currency}
                onChange={value => formik.setFieldValue("currency", value)}
              />
            </Form.Group>
          </Col>
          <Col md={{ span: 4, offset: 1 }}>
            <Form.Group>
              <Form.Label>Vigencia de la tarifa</Form.Label>
              <div className="d-flex">
                <Datepicker
                  className="form-control"
                  placeholderText="Desde"
                />
                <Datepicker
                  placeholderText="Hasta"
                  className="form-control" />
              </div>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={7}>
            <Form.Group>
              <Form.Label>Moneda alternativa</Form.Label>
              <Select
                value={formik.values.alternative_currency}
                onChange={value => formik.setFieldValue("alternative_currency", value)}
                options={currencies.results.map((currency) => ({ label: currency.name, value: currency.value }))}
                className="react_select_container"
                classNamePrefix="react_select" />
            </Form.Group>
          </Col>
          <Col md={1}>
            <Form.Group>
              <Form.Label>Cambio</Form.Label>
              <Form.Control
                name="exchange_rate"
                value={formik.values.exchange_rate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Vigencia de la tarifa</Form.Label>
              <div className="d-flex">
                <Datepicker
                  className="form-control"
                  placeholderText="Desde"
                />
                <Datepicker
                  placeholderText="Hasta"
                  className="form-control" />
              </div>
            </Form.Group>
          </Col>
        </Row>
        <div>
          <h3 className="text-muted mt-5">Categorias de habitaciones y Racks</h3>
          <Table striped hover>
            <thead>
              <tr>
                <th width="70%"><Button variant="outline-info">Configurar Habitaciones</Button></th>
                <th><span className="text-muted">USD</span></th>
                <th><span className="text-muted">ARS</span></th>
              </tr>
            </thead>
            <tbody>
              {
                roomTypes.map((room) => (
                  <tr key={room.id}>
                    <td>{room.name}</td>
                    <td><Form.Control onChange={(event) => console.log(event)} value={room.priceUsd} /></td>
                    <td><Form.Control onChange={(event) => console.log(event)} value={room.priceArs} /></td>
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
                      onChange={handleTypeChange}
                      label={`${clientType.value} (${currency.value})`}
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
                name="corporationRates.base"
                value={formik.values.corporationRates.base}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <span className="ml-2">%</span>
            </Col>
          </Row>
          <p className="text-muted"><strong>Excepciones: </strong> Rango recomendado es entre el 17% y el 21%</p>
          {
            formik.values.corporationRates.exceptions.map((exc, idx) => (
              <Row className="mb-2" key={idx}>
                <Col md={8}>
                  <Select
                    isMulti
                    options={corporationClients.map((client) => ({ label: client.name, value: client.id }))}
                    theme={customSelectTheme}
                  />
                </Col>
                <Col md={4} className="d-flex align-items-center justify-content-end">
                  <i className="fas fa-save mx-3 icon-button"></i>
                  <Form.Control className="flex-1" type="text" value={exc.value} />
                  <span className="ml-1">%</span>
                  <i className="fas fa-trash mx-3 icon-button"></i>
                  <Button onClick={() => setCorpExc([...corpExc, { value: exc.value }])} variant="outline-info mx-1">
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
              <span className="section_title">Agencias Corporativas</span>
            </Col>
            <Col md={{ span: 2, offset: 4 }} className="d-flex align-items-center">
              <Form.Control />
              <span className="ml-2">%</span>
            </Col>
          </Row>
          <p className="text-muted"><strong>Excepciones: </strong> Rango recomendado es entre el 17% y el 21%</p>
          {
            corpAgencyExc.map((exc, idx) => (
              <Row className="mb-2" key={idx}>
                <Col md={8}>
                  <Select isMulti options={corpAgencyClient.map((client) => ({ label: client.name, value: client.id }))} theme={customSelectTheme}></Select>
                </Col>
                <Col md={4} className="d-flex align-items-center justify-content-end">
                  <i className="fas fa-save mx-3 icon-button"></i>
                  <Form.Control className="flex-1" type="text" value={exc.value} />
                  <span className="ml-1">%</span>
                  <i className="fas fa-trash mx-3 icon-button"></i>
                  <Button onClick={() => setCorpAgencyExc([...corpAgencyExc, { value: exc.value }])} variant="outline-info mx-1">
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
              <span className="section_title">Mark-up Operadores</span>
            </Col>
            <Col md={{ span: 2, offset: 4 }} className="d-flex align-items-center">
              <Form.Control
                name="operatorRates.base"
                value={formik.values.operatorRates.base}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <span className="ml-2">%</span>
            </Col>
          </Row>
          <p className="text-muted"><strong>Excepciones: </strong> Rango recomendado es entre el 17% y el 21%</p>
          {
            operatorExc.map((exc, idx) => (
              <Row className="mb-2" key={idx}>
                <Col md={8}>
                  <Select
                    isMulti
                    options={operatorClients.map((client) => ({ label: client.name, value: client.id }))}
                    theme={customSelectTheme} />
                </Col>
                <Col md={4} className="d-flex align-items-center justify-content-end">
                  <i className="fas fa-save mx-3 icon-button"></i>
                  <Form.Control className="flex-1" type="text" value={exc.value} />
                  <span className="ml-1">%</span>
                  <i className="fas fa-trash mx-3 icon-button"></i>
                  <Button onClick={() => setOperatorExc([...operatorExc, { value: exc.value }])} variant="outline-info mx-1">
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
              <span className="section_title">Comisión Agencia T&T</span>
            </Col>
            <Col md={{ span: 2, offset: 4 }} className="d-flex align-items-center">
              <Form.Control />
              <span className="ml-2">%</span>
            </Col>
          </Row>
          <p className="text-muted"><strong>Excepciones: </strong> Rango recomendado es entre el 8% y el 12%</p>
          {
            agencyExc.map((exc, idx) => (
              <Row className="mb-2" key={idx}>
                <Col md={8}>
                  <Select isMulti options={agencyClients.map((client) => ({ label: client.name, value: client.id }))} theme={customSelectTheme}></Select>
                </Col>
                <Col md={4} className="d-flex align-items-center justify-content-end">
                  <i className="fas fa-save mx-3 icon-button"></i>
                  <Form.Control className="flex-1" type="text" value={exc.value} />
                  <span className="ml-1">%</span>
                  <i className="fas fa-trash mx-3 icon-button"></i>
                  <Button onClick={() => setAgencyExc([...agencyExc, { value: exc.value }])} variant="outline-info mx-1">
                    <i className="fas fa-plus"></i>
                  </Button>
                </Col>
              </Row>
            ))
          }
        </div>}


        {/* Observations */}
        <h3 className="text-muted mt-5">Observaciones</h3>
        <Form.Group>
          <Form.Label className="text-muted">Observaciones Convenio</Form.Label>
          <Form.Control rows="5" as="textarea" />
        </Form.Group>
      </Form>
    </Fragment>
  );
};

export default NewPetition;