import React, { Fragment, useState } from "react";
import { Form, Table, Badge } from "react-bootstrap";
import Select from "react-select";
import { customValueContainer } from "../../../helpers/utilities";

const Positions = () => {
  const [hotels] = useState([
    { value: "1", label: "Hotel 1" },
    { value: "2", label: "Hotel 2" },
    {
      value: "3",
      label: "Hotel 3"
    },
    { value: "4", label: "Hotel 4" },
    { value: "5", label: "Hotel 5" }
  ]);

  const [positions] = useState([
    {
      id: 1,
      name: "Front Desk Supervisor",
      answersTo: "Positions",
      securityKeys: ["Active", "active", "active"],
      status: "Active"
    }
  ]);

  return (
    <Fragment>
      <div className="d-flex mb-4 align-items-center w-75">
        <button type="button" className="btn btn-secondary is-rounded mr-3">
          Agregar Posición
        </button>
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
          closeMenuOnSelect={false}
          placeholder="Hotel: "
          options={hotels}
        ></Select>
        <button className="btn btn-link">Más filtros...</button>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Informa A</th>
            <th>Llaves de seguridad</th>
            <th>Estado</th>
            <th>
              <i className="fas fa-ellipsis-v"></i>
            </th>
          </tr>
        </thead>
        <tbody>
          {positions.map(e => (
            <tr className="table-link" key={e.id}>
              <td>{e.name}</td>
              <td>
                <Badge className="p-2" variant="dark">
                  {e.answersTo}
                </Badge>
              </td>
              <td> PH[Llaves de seguridad]</td>
              <td>
                <Badge variant="success">{e.status}</Badge>
              </td>
              <td>
                <i className="fas fa-ellipsis-h"></i>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Fragment>
  );
};

export default Positions;
