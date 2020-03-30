import React, { Fragment, useState } from "react";
import { Table, Badge, Form, Button, Dropdown } from 'react-bootstrap';
import { customValueContainer } from '../../../helpers/utilities';
import Select from 'react-select';
import { useHistory } from 'react-router-dom';

const Tariffs = () => {

  const history = useHistory();

  const [tariffsTypes] = useState([
    { name: "Tarifa General", value: 1, path: "/comercial/petitions/new-petition?type=general" },
    { name: "Fechas Especiales", value: 2, path: "/comercial/petitions/new-petition?type=special" },
    { name: "Promociones", value: 3, path: "/comercial/petitions/new-petition?type=promotion" },
  ]);

  const [tariffs] = useState([
    {
      id: 1, hotel: "Mérit San Telmo", province: "Buenos Aires", dateFrom: "01/01/2020", dateTo: "31/05/2020", requests: [
        { name: "Pendientes", code: "info", count: 2 },
        { name: "En revision", code: "warning", count: 3 },
        { name: "Rechazadas", code: "danger", count: 5 },
      ]
    },
    {
      id: 2, hotel: "Mérit San Telmo", province: "Buenos Aires", dateFrom: "01/01/2020", dateTo: "31/05/2020", requests: [
        { name: "Pendientes", code: "info", count: 2 },
        { name: "En revision", code: "warning", count: 3 },
        { name: "Rechazadas", code: "danger", count: 5 },
      ]
    },
  ]);


  const [chains] = useState([
    { name: "Merit", id: 1 },
    { name: "cadena 2", id: 2 },
  ]);

  const [locations] = useState([
    { name: "Buenos Aires", id: 1 },
    { name: "Cordoba", id: 2 },
  ]);

  return <Fragment>
    <div className="d-flex align-items-center mb-2">
      <Dropdown>
        <Dropdown.Toggle className="is_rounded mr-2" variant="secondary" id="dropdown-basic">
          Agregar Tarifa
          </Dropdown.Toggle>
        <Dropdown.Menu>
          {
            tariffsTypes.map((e) => (
              <Dropdown.Item key={e.value} onClick={() => history.push(`${e.path}`)}>{e.name}</Dropdown.Item>
            ))
          }
        </Dropdown.Menu>
      </Dropdown>
      {/* <div className="icon_input w-15">
        <Form.Control className="" type="text" placeholder="Buscar..." />
        <i className="fas fa-search"></i>
      </div>
      <Select
        className="react_select_container"
        classNamePrefix="react_select"
        components={{
          ValueContainer: customValueContainer
        }}
        isClearable
        hideSelectedOptions={false}
        isMulti
        placeholder="Cadena: "
        options={chains.map((chain) => ({ label: chain.name, value: chain.id }))}
      ></Select>
      <Select
        className="react_select_container"
        classNamePrefix="react_select"
        components={{
          ValueContainer: customValueContainer
        }}
        isClearable
        hideSelectedOptions={false}
        isMulti
        placeholder="Ubicacion: "
        options={locations.map((location) => ({ label: location.name, value: location.id }))}
      ></Select> */}
    </div>
    <Table>
      <thead>
        <tr>
          <th>Hotel</th>
          <th>Provincia</th>
          <th>Tarifa en vigencia</th>
          <th>Solicitudes</th>
        </tr>
      </thead>
      <tbody>
        {
          tariffs.map((tariff) => (
            <tr key={tariff.id}>
              <td width="35%">{tariff.hotel}</td>
              <td>{tariff.province}</td>
              <td>
                <div className="d-flex align-items-center">
                  <span>{`${tariff.dateFrom} a ${tariff.dateTo}`}</span>
                  <Button variant="outline-info mx-2">Directos</Button>
                  <Button variant="outline-info mx-2">Convenios</Button>

                </div>
              </td>
              <td>
                {tariff.requests.map((request) => (
                  <Badge onClick={() => history.push("/comercial/petitions/")} key={request.code} className="p-2 petitions_badge mx-1 text-light" variant={request.code}>{request.count}</Badge>
                ))}
              </td>
            </tr>
          ))
        }
      </tbody>
    </Table>
  </Fragment>;
};

export default Tariffs;
