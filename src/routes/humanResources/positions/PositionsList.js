import React, { Fragment, useState, useEffect } from "react";
import { Table, Button, Dropdown } from "react-bootstrap";
// import Select from "react-select";
// import { customValueContainer } from "../../../helpers/utilities";
import PositionDetail from './PositionDetail';
import { useSelector, useDispatch } from "react-redux";
import { positionActions } from "../../../redux/actions";

const PositionsList = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(positionActions.fetchPositions());
  }, [dispatch]);

  const [showModal, setShowModal] = useState(false);
  let positions = useSelector(({ position }) => position);

  return (
    <Fragment>
      <PositionDetail show={showModal} onCloseDialog={e => setShowModal(false)} />
      <div className="d-flex mb-4 align-items-center">
        <button type="button" onClick={e => setShowModal(true)} className="btn btn-secondary is_rounded mr-3">
          Agregar Posición
        </button>
      </div>
      {
        positions.pending ? <div className="d-flex justify-content-center"><i className="fas fa-spinner fa-spin fa-3x"></i></div> :
          <Table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripcion</th>
                <th>Hotel</th>
                <th>
                  <Button variant="light" disabled>
                    <i className="fas fa-ellipsis-h"></i>

                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>
              {positions.results.map(e => (
                <tr className="table_link" key={e.id}>
                  <td>{e.name}</td>
                  <td>
                    {e.description}
                  </td>
                  <td>
                    {e.hotel}
                  </td>
                  <td>
                    <Dropdown drop="left">
                      <Dropdown.Toggle variant="light">
                        <i className="fas fa-ellipsis-h"></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          as="button"
                          className="d-flex justify-content-between align-items-center">
                          <span>Editar</span> <i className="fas fa-edit"></i>
                        </Dropdown.Item>
                        <Dropdown.Item
                          as="button"
                          className="d-flex justify-content-between align-items-center">
                          <span>Eliminar</span> <i className="fas fa-trash"></i>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

      }
    </Fragment>
  );
};

export default PositionsList;
