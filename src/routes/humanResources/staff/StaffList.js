import React, { Fragment, useState } from "react";
import { Table, Badge, Button, Dropdown } from "react-bootstrap";
// import Select from "react-select";
// import StarRatings from "react-star-ratings";
import StaffModal from "./NewStaff";
// import { customValueContainer } from "../../../helpers/utilities";
// import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { staffActions } from "../../../redux/actions/";


const Staff = () => {
  // const history = useHistory();
  // const location = useLocation();
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
      </div>
      {
        staff.pending ? <div className="d-flex justify-content-center"><i className="fas fa-spinner fa-spin fa-3x"></i></div> :
          <Table>
            <thead>
              <tr>
                <th width="50%">Nombre</th>
                <th>Posición</th>
                <th>Hotel</th>
                <th>
                  <Button variant="light" disabled>
                    <i className="fas fa-ellipsis-h"></i>
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>

              {staff.results.map(e => (
                <tr
                  // onClick={() => history.push(`${location.pathname}/${e.id}`)}
                  className="table_link"
                  key={e.email}
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
                  <td>
                    <Badge variant="primary" className="p-2">
                      {e.hotel}
                    </Badge>
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

export default Staff;
