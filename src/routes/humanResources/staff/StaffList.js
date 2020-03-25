import React, { Fragment, useState } from "react";
import { Table, Badge, Image } from "react-bootstrap";
// import Select from "react-select";
import StarRatings from "react-star-ratings";
import StaffModal from "./NewStaff";
// import { customValueContainer } from "../../../helpers/utilities";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { staffActions } from "../../../redux/actions/";


const Staff = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(staffActions.fetchStaff());
  }, [dispatch]);

  let staff = useSelector(({ staff }) => staff);

  const [showModal, setshowModal] = useState(false);


  return (
    <Fragment>
      <StaffModal onClose={() => setshowModal(false)} show={showModal} />
      <div className="d-flex mb-4 align-items-center">
        <button
          type="button"
          onClick={() => setshowModal(true)}
          className="btn btn-secondary is_rounded mr-3"
        >
          Agregar Staff
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
          placeholder="Hotel: "
          options={hotels}
        ></Select>
        <Select
          className="react_select_container"
          classNamePrefix="react_select"
          components={{
            ValueContainer: customValueContainer
          }}
          hideSelectedOptions={false}
          isMulti
          placeholder="Posicion: "
          options={positions}
        ></Select>
        <button className="btn btn-link">Más filtros...</button> */}
      </div>
      <Table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Posición</th>
            {/* <th>
              <i className="fas fa-ellipsis-v"></i>
            </th> */}
          </tr>
        </thead>
        <tbody>
          {staff.results.map(e => (
            <tr
              // onClick={() => history.push(`${location.pathname}/${e.id}`)}
              className="table_link"
              key={e.id}
            >
              <td>
                <div className="d-flex align-items-center">
                  <div className="d-flex flex-column">
                    <p className="mb-0">{e.first_name} {e.last_name}</p>
                    <p className="mb-0 text-muted">{e.email}</p>
                  </div>
                </div>
              </td>
              <td>
                <Badge variant="dark" className="p-2">
                  {e.position}
                </Badge>
              </td>

              {/* <td>
                <i className="fas fa-ellipsis-h"></i>
              </td> */}
            </tr>
          ))}
        </tbody>
      </Table>
    </Fragment>
  );
};

export default Staff;
