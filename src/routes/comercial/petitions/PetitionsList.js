import React, { useState, Fragment } from "react";
import InfoCard from '../../../components/shared/InfoCard';
import Select from 'react-select';
import { Form, Button, Table, Badge } from 'react-bootstrap';
import { customValueContainer } from '../../../helpers/utilities';
import { useSelector } from 'react-redux';

const PetitionsList = () => {
  const [summary] = useState([
    { name: "Nuevas", quantity: 5, code: "info", description: "Nuevas solicitudes" },
    { name: "En Revision", quantity: 2, code: "warning", description: "Solicitudes en revision" },
    { name: "Devueltas", quantity: 4, code: "danger", description: "Solicitudes devueltas" },
    { name: "Aprobadas", quantity: 12, code: "success", description: "Archivo historico de solicitudes" },
  ]);

  const gridSummary = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    columnGap: "2rem"
  };

  const hotels = useSelector(({ hotels }) => hotels.list);

  const [petitions, setPetitions] = useState([
    {
      id: 1,
      name: "Nombre de la tarifa",
      period: "19/02/2020 - 01/03/2020",
      currency: "USD",
      hotel: "Hotel 1",
      status: {
        name: "En curso",
        code: "info"
      },
    },
    {
      id: 2,
      name: "Nombre de la tarifa",
      period: "19/02/2020 - 01/03/2020",
      currency: "USD",
      hotel: "Hotel 1",
      status: {
        name: "Pendiente",
        code: "warning"
      },
    },
  ]);


  return <Fragment>
    <div className="summary_container mb-3" style={gridSummary}>
      {summary.map((card) => (
        <InfoCard key={card.code} quantity={card.quantity} description={card.description} code={card.code} name={card.name} />
      ))}
    </div>
    <div className="d-flex mb-4 align-items-center w-75">
      <Button variant="secondary" className="is-rounded mr-3">
        Agregar Staff
      </Button>
      <Button variant="outline-secondary" className="is-rounded mr-3">
        Actualizar convenios
      </Button>
      <Form.Control className="w-25" type="text" placeholder="Buscar" />
      <Select
        className="react_select_container"
        classNamePrefix="react_select"
        components={{
          ValueContainer: customValueContainer
        }}
        isClearable
        hideSelectedOptions={false}
        isMulti
        placeholder="Hotel: "
        options={hotels.map((hotel) => ({ label: hotel.name, value: hotel.id }))}
      ></Select>
      <button className="btn btn-link">Más filtros...</button>
    </div>
    <Table>
      <thead>
        <tr>
          <th>Tarifa</th>
          <th>Periodo</th>
          <th>Moneda</th>
          <th>Hotel</th>
          <th>Estado</th>
          <th>
            <Button variant="light">
              <i className="fas fa-ellipsis-v"></i>

            </Button>
          </th>
        </tr>
      </thead>
      <tbody>
        {petitions.map(e => (
          <tr
            className="table_link"
            key={e.id}
          >
            <td>
              {e.name}
            </td>
            <td>
              {e.period}
            </td>
            <td>
              {e.currency}
            </td>
            <td>
              {e.hotel}
            </td>
            <td>
              <Badge className="p-2 text-light" variant={e.status.code}>{e.status.name}</Badge>
            </td>
            <td>
              <i className="fas fa-ellipsis-h"></i>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </Fragment>;
};

export default PetitionsList;
