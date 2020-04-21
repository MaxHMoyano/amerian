import React, { Fragment, useState } from 'react';
import { Button, Table, Badge, Form, Dropdown } from 'react-bootstrap';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { clientActions } from "../../../redux/actions";
import NewClient from "./NewClient";
import ClientDelete from "./ClientDelete";

const Agreements = () => {

  const dispatch = useDispatch();

  // localStates
  const [showNewClientModal, setShowNewClientModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchParams, setSearchParams] = useState({
    search: "",
    status: null,
    type: null,
  });


  useEffect(() => {
    dispatch(clientActions.fetchClients(searchParams));
  }, [dispatch, searchParams]);

  useEffect(() => {
    dispatch(clientActions.fetchClientTypes());
  }, [dispatch]);

  // Selectors
  let clients = useSelector(({ client }) => client);

  // Utility
  const handleSearchChange = (e) => {
    if (e.key === "Enter") {
      setSearchParams({ ...searchParams, search: e.target.value });
    }
  };

  const handleEditClient = (client) => {
    setSelectedClient(client);
    setShowNewClientModal(true);
  };

  const handleDeleteClient = (client) => {
    setSelectedClient(client);
    setShowDeleteModal(true);
  };

  return (
    <Fragment>
      <NewClient selected={selectedClient} show={showNewClientModal} onClose={e => { setShowNewClientModal(false); setSelectedClient({}); }} />
      <ClientDelete selected={selectedClient} show={showDeleteModal} onClose={e => { setShowDeleteModal(false); setSelectedClient({}); }} />
      <div className="d-flex align-items-center">
        <Button variant="secondary" className="is_rounded" onClick={e => setShowNewClientModal(true)}>Agregar Cliente</Button>
        <div className="icon_input search mx-2 w-15">
          <Form.Control placeholder="Buscar..." onKeyPress={handleSearchChange} />
          <i className="fas fa-search"></i>
        </div>
      </div>
      {
        !clients.pending ?
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
                  <td>{clients.types.length ? clients.types.find(e => e.value === client.type).name : ""}</td>
                  <td>{client.phone}</td>
                  <td>{client.email}</td>
                  <td>
                    <Badge className="p-2" variant={client.active ? "success" : "danger"}>{client.active ? "Activo" : "Inactivo"}</Badge>
                  </td>
                  <td>
                    <Dropdown drop="left">
                      <Dropdown.Toggle variant="light">
                        <i className="fas fa-ellipsis-h"></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          as="button"
                          className="d-flex justify-content-between align-items-center"
                          onClick={e => handleEditClient(client)}
                        >
                          <span>Editar</span> <i className="fas fa-edit"></i>
                        </Dropdown.Item>
                        <Dropdown.Item
                          as="button"
                          className="d-flex justify-content-between align-items-center"
                          onClick={e => handleDeleteClient(client)}
                        >
                          <span>Eliminar</span> <i className="fas fa-trash"></i>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table> :
          <div className="d-flex justify-content-center align-items-center">
            <i className="fas fa-spinner fa-spin fa-3x"></i>
          </div>
      }
    </Fragment>
  );
};

export default Agreements;
