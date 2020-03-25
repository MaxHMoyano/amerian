import React, { Fragment, useState, useEffect } from "react";
import { Table } from "react-bootstrap";
// import Select from "react-select";
// import { customValueContainer } from "../../../helpers/utilities";
import NewPosition from './NewPosition';
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
      <NewPosition show={showModal} onCloseDialog={e => setShowModal(false)} />
      <div className="d-flex mb-4 align-items-center">
        <button type="button" onClick={e => setShowModal(true)} className="btn btn-secondary is_rounded mr-3">
          Agregar Posición
        </button>
        {/* <Form.Control className="w-25" type="text" placeholder="Buscar" />
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
        <button className="btn btn-link">Más filtros...</button> */}
      </div>
      <Table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>
              <i className="fas fa-ellipsis-v"></i>
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
                <i className="fas fa-ellipsis-h"></i>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Fragment>
  );
};

export default PositionsList;
