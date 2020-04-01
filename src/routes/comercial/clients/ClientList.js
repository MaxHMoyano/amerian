import React, { Fragment, useState } from 'react';
import { Button, Table, Badge } from 'react-bootstrap';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { clientActions } from "../../../redux/actions";
import NewClient from "./NewClient";

const Agreements = () => {

  const dispatch = useDispatch();

  // localStates
  const [showNewClientModal, setShowNewClientModal] = useState(false);

  useEffect(() => {
    dispatch(clientActions.fetchClients());
    dispatch(clientActions.fetchClientTypes());
  }, [dispatch]);

  let clients = useSelector(({ client }) => client);



  return (
    <Fragment>
      <NewClient show={showNewClientModal} onClose={e => setShowNewClientModal(false)} />
      <div className="d-flex align-items-center">
        <Button variant="secondary" className="is_rounded" onClick={e => setShowNewClientModal(true)}>Agregar Cliente</Button>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Telefono</th>
            <th>Email</th>
            <th>Estado</th>
            <th>
              <Button variant="light" disabled><i className="fas fa-ellipsis-h"></i></Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {clients.results.map((client) => (
            <tr key={client.id} className="table_link">
              <td>{client.name}</td>
              <td>{clients.types.find(e => e.value === client.type).name}</td>
              <td>{client.phone}</td>
              <td>{client.email}</td>
              <td>
                <Badge className="p-2" variant={client.active ? "success" : "danger"}>{client.active ? "Activo" : "Inactivo"}</Badge>
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
