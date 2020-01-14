import React, { Fragment } from "react";
import { Table, Form } from "react-bootstrap";
// import Select from "react-select";

const Staff = () => {
  // const dummyFilter = ["Option1", "Option 2"];

  return (
    <Fragment>
      <div className="d-flex mb-4 align-items-center w-75">
        <button type="button" className="btn btn-secondary is-rounded mr-3">
          Agregar Staff
        </button>
        <Form.Group controlId="formBasicEmail" className="mr-3">
          <Form.Control type="text" placeholder="Buscar" />
        </Form.Group>
        {/* <Select options="dummyFilter"></Select> */}
        <button className="btn btn-link">Más filtros</button>
      </div>
      <Table striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan="2">Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    </Fragment>
  );
};

export default Staff;
