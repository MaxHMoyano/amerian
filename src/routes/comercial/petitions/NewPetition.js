import React, { Fragment } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Form, Button, Table, InputGroup, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import { useState } from 'react';
import { customSelectTheme } from '../../../helpers/utilities';

function useQuery() {
  return new URLSearchParams(useLocation().search);
};

const NewPetition = () => {
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

  const [corporationExceptions, setCorporationExceptions] = useState(["21", "22"]);
  const [operatorExceptions, setOperatorExceptions] = useState(["21", "22"]);

  const [roomsTypes, setRoomsTypes] = useState([
    { id: 1, name: "Standard Doble", priceUsd: 50, priceArs: 3333 },
    { id: 2, name: "Standard Triple", priceUsd: 76, priceArs: 5400 },
    { id: 3, name: "Suite Merit Doble", priceUsd: 88, priceArs: 7600 },
  ]);
  const changeCorpExceptionValue = (e, idx) => {
    let currentExceptions = corporationExceptions;
    currentExceptions[idx] = e.target.value;
    setCorporationExceptions(currentExceptions);

  };


  return (
    <Fragment>
      <Form className="w-50">
        <div className="d-flex align-items-center mb-5">
          <Button onClick={() => history.goBack()} variant="light"><i className="fas fa-chevron-left"></i></Button>
          <h3 className="font-weight-bold text-primary mb-0 ml-2">{getTitle()}</h3>
        </div>

        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Nombre Hotel</Form.Label>
              <Select className="react_select_container" classNamePrefix="react_select" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Nombre de la Solicitud</Form.Label>
              <Form.Control />
            </Form.Group>
          </Col>
        </Row>
        <h3 className="text-muted mt-5">Vigencia y Monedas</h3>
        <Row>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Moneda base</Form.Label>
              <Select className="react_select_container" classNamePrefix="react_select" />
            </Form.Group>

          </Col>
          <Col md={{ span: 4, offset: 4 }}>
            <Form.Group>
              <Form.Label>Vigencia de la tarifa</Form.Label>
              <Form.Control />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Moneda alternativa</Form.Label>
              <Select className="react_select_container" classNamePrefix="react_select" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Cambio</Form.Label>
              <Form.Control />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Vigencia de la tarifa</Form.Label>
              <Form.Control />
            </Form.Group>
          </Col>
        </Row>
        <h3 className="text-muted mt-5">Categorias de habitaciones y Racks</h3>
        <Table>
          <thead>
            <tr>
              <th width="70%"><Button variant="outline-info">Configurar Habitaciones</Button></th>
              <th><span className="text-muted">USD</span></th>
              <th><span className="text-muted">ARS</span></th>
            </tr>
          </thead>
          <tbody>
            {
              roomsTypes.map((room) => (
                <tr key={room.id}>
                  <td>{room.name}</td>
                  <td><Form.Control onChange={(event) => console.log(event)} value={room.priceUsd} /></td>
                  <td><Form.Control onChange={(event) => console.log(event)} value={room.priceArs} /></td>
                </tr>
              ))
            }
          </tbody>
        </Table>
        <h3 className="text-muted mt-5">Bases para convenios</h3>
        <p className="text-muted mb-0">Tarifa base convenio</p>
        <Row>
          <Col md={2}>
            <InputGroup>
              <Form.Control />
              <InputGroup.Append>
                <InputGroup.Text>%</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>
        <p className="text-muted mb-0 mt-4">Tipos de tarifas disponibles en el hotel: <span className="text-primary">*</span></p>
        <div className="d-flex">
          <div className="d-flex flex-column my-3 pr-3 mr-4 border-right">
            <Form.Check className="py-2" custom id="checkbox-1" type="checkbox" label="Corporativo (USD)" />
            <Form.Check className="py-2" custom id="checkbox-2" type="checkbox" label="Corporativo (ARS)" />
            <Form.Check className="py-2" custom id="checkbox-3" type="checkbox" label="Agencias Corpo" />
          </div>
          <div className="d-flex flex-column my-3 pr-3 mr-4 border-right">
            <Form.Check className="py-2" custom id="checkbox-4" type="checkbox" label="Operador (USD)" />
            <Form.Check className="py-2" custom id="checkbox-5" type="checkbox" label="Operador (ARS)" />
          </div>
          <div className="d-flex flex-column my-3 pr-3 mr-4">
            <Form.Check className="py-2" custom id="checkbox-7" type="checkbox" label="Agencia T&T (USD)" />
            <Form.Check className="py-2" custom id="checkbox-8" type="checkbox" label="Agencia T&T (ARS)" />
          </div>
        </div>

        {/* Corpos */}
        <Row className="mt-5">
          <Col md={6}>
            <span className="section_title">Descuentos Corporativos</span>
          </Col>
          <Col md={{ span: 2, offset: 4 }} className="d-flex align-items-center">
            <Form.Control />
            <span className="ml-2">%</span>
          </Col>
        </Row>
        <p className="text-muted"><strong>Excepciones: </strong> Rango recomendado es entre el 17% y el 21%</p>
        {
          corporationExceptions.map((exc, idx) => (
            <Row className="mb-2" key={idx}>
              <Col md={9}>
                <Select theme={customSelectTheme}></Select>
              </Col>
              <Col md={3} className="d-flex align-items-center justify-content-end">
                <i className="fas fa-save mr-4 icon-button"></i>
                <Form.Control type="text" onChange={(e) => changeCorpExceptionValue(e, idx)} value={exc} />
                <span className="ml-1">%</span>
                <i className="fas fa-trash mx-3 icon-button"></i>
                <Button onClick={() => setCorporationExceptions([...corporationExceptions, { value: exc.value }])} variant="outline-info mx-1">
                  <i className="fas fa-plus"></i>
                </Button>
              </Col>
            </Row>
          ))
        }

        {/* Operadores */}
        <Row className="mt-5">
          <Col md={6}>
            <span className="section_title">Mark-Up Operadores</span>
          </Col>
          <Col md={{ span: 2, offset: 4 }} className="d-flex align-items-center">
            <Form.Control />
            <span className="ml-2">%</span>
          </Col>
        </Row>
        <p className="text-muted"><strong>Excepciones: </strong> Rango recomendado es entre el 17% y el 21%</p>
        {
          operatorExceptions.map((exc, idx) => (
            <Row className="mb-2" key={idx}>
              <Col md={9}>
                <Select theme={customSelectTheme}></Select>
              </Col>
              <Col md={3} className="d-flex align-items-center justify-content-end">
                <i className="fas fa-save mr-4 icon-button"></i>
                <Form.Control type="text" onChange={(e) => changeCorpExceptionValue(e, idx)} value={exc} />
                <span className="ml-1">%</span>
                <i className="fas fa-trash mx-3 icon-button"></i>
                <Button onClick={() => setOperatorExceptions([...corporationExceptions, { value: exc.value }])} variant="outline-info mx-1">
                  <i className="fas fa-plus"></i>
                </Button>
              </Col>
            </Row>
          ))
        }




        {/* <div className="form_submit_panel">
          <Button variant="outline-secondary" className="mx-2">Cancelar</Button>
          <Button variant="secondary" className="mx-2">Guardar</Button>
        </div> */}
      </Form>
    </Fragment>
  );
};

export default NewPetition;