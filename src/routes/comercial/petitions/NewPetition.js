import React, { Fragment } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Form, Button, Table, InputGroup } from 'react-bootstrap';
import Select from 'react-select';
import { useState } from 'react';

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


  const [roomsTypes, setRoomsTypes] = useState([
    { id: 1, name: "Standard Doble", priceUsd: 50, priceArs: 3333 },
    { id: 2, name: "Standard Triple", priceUsd: 76, priceArs: 5400 },
    { id: 3, name: "Suite Merit Doble", priceUsd: 88, priceArs: 7600 },
  ]);

  return (
    <Fragment>
      <Form className="w-50">
        <div className="d-flex align-items-center mb-5">
          <Button onClick={() => history.goBack()} variant="light"><i className="fas fa-chevron-left"></i></Button>
          <h3 className="font-weight-bold text-primary mb-0 ml-2">{getTitle()}</h3>
        </div>
        <Form.Group>
          <Form.Label>Nombre Hotel</Form.Label>
          <Select className="react_select_container" classNamePrefix="react_select w-25" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Nombre de la Solicitud</Form.Label>
          <Form.Control className="w-25" />
        </Form.Group>
        <h3 className="text-muted mt-5">Vigencia y Monedas</h3>
        <div className="d-flex align-items-center justify-content-between">
          <Form.Group>
            <Form.Label>Moneda base</Form.Label>
            <Select className="react_select_container" classNamePrefix="react_select w-25" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Vigencia de la tarifa</Form.Label>
            <Form.Control />
          </Form.Group>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <Form.Group>
            <Form.Label>Moneda alternativa</Form.Label>
            <Select className="react_select_container" classNamePrefix="react_select w-25" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Cambio</Form.Label>
            <Form.Control />
          </Form.Group>
          <Form.Group>
            <Form.Label>Vigencia de la tarifa</Form.Label>
            <Form.Control />
          </Form.Group>
        </div>
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
                  <td><Form.Control value={room.priceUsd} /></td>
                  <td><Form.Control value={room.priceArs} /></td>
                </tr>
              ))
            }
          </tbody>
        </Table>
        <h3 className="text-muted mt-5">Bases para convenios</h3>
        <p className="text-muted mb-0">Tarifa base convenio</p>
        <InputGroup style={{ width: "10%" }}>
          <Form.Control />
          <InputGroup.Append>
            <InputGroup.Text>%</InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>
        <p className="text-muted mb-0 mt-4">Tipos de tarifas disponibles en el hotel: <span className="text-primary">*</span></p>
        <h1>Aca van los checkboxes [PH]</h1>

        {/* Corpos */}
        <div className="mt-5 d-flex justify-content-between">
          <div className="section_title">Descuentos Corporativos</div>
          <div className="d-flex align-items-center w-15">
            <Form.Control />
            <span className="ml-2">%</span>
          </div>
        </div>


        <div className="mt-5 d-flex justify-content-between">
          <div className="section_title">Mark-Up Operadores</div>
          <div className="d-flex align-items-center w-15">
            <Form.Control />
            <span className="ml-2">%</span>
          </div>
        </div>




        {/* <div className="form_submit_panel">
          <Button variant="outline-secondary" className="mx-2">Cancelar</Button>
          <Button variant="secondary" className="mx-2">Guardar</Button>
        </div> */}
      </Form>
    </Fragment>
  );
};

export default NewPetition;