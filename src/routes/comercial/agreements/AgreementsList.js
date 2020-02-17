import React, { Fragment } from 'react';
import { Button, Table, Badge, Form } from 'react-bootstrap';
import Select from 'react-select';
import { useState } from 'react';
import { customValueContainer } from '../../../helpers/utilities';

const Agreements = () => {
  const [types] = useState([
    { name: "Operador", id: 1 },
    { name: "Corporativo", id: 2 },
    { name: "Operador", id: 3 },
  ]);

  const [states] = useState([
    { name: "Activo", id: 1 },
    { name: "Inactivo", id: 2 },
  ]);

  const [agreements] = useState([
    { id: 1, name: "Martur S.A", type: "Operador", worksIn: "USD - ARS", phone: "+54 351 4814879", status: { code: "success", name: "Activo" } }
  ]);
  return (


    <Fragment>
      <div className="d-flex align-items-center">
        <Button variant="secondary" className="is_rounded">Agregar Cliente</Button>
        <Form.Control className="w-25 mx-2" type="text" placeholder="Buscar" />
        <Select className="react_select_container"
          classNamePrefix="react_select"
          components={{ ValueContainer: customValueContainer }}
          isClearable
          hideSelectedOptions={false}
          isMulti
          placeholder="Tipo: "
          options={types.map((type) => ({ label: type.name, value: type.id }))}></Select>
        <Select className="react_select_container"
          classNamePrefix="react_select"
          components={{ ValueContainer: customValueContainer }}
          isClearable
          hideSelectedOptions={false}
          isMulti
          placeholder="Estado: "
          options={states.map((state) => ({ label: state.name, value: state.id }))}></Select>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Trabaja en</th>
            <th>Telefono</th>
            <th>Estado</th>
            <th>
              <Button variant="light"><i className="fas fa-ellipsis-v"></i></Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {agreements.map((row) => (
            <tr key={row.id} className="table_link">
              <td>{row.name}</td>
              <td>{row.type}</td>
              <td>{row.worksIn}</td>
              <td>{row.phone}</td>
              <td>
                <Badge className="p-2" variant={row.status.code}>{row.status.name}</Badge>
              </td>
              <td>
                <Button variant="light">
                  <i className="fas fa-ellipsis-h"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Fragment>
  );
};

export default Agreements;
