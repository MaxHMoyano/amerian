import React, { Fragment, useState } from "react";
import { Table, Form, Badge, Image } from "react-bootstrap";
import Select, { components } from "react-select";
import StarRatings from "react-star-ratings";
import Checkbox from "react-simple-checkbox";

const Staff = () => {
  const customValueContainer = ({ children, getValue, ...props }) => {
    const length = getValue().length;
    return (
      <components.ValueContainer {...props}>
        <components.Placeholder {...props} isFocused={props.isFocused}>
          {props.selectProps.placeholder}
        </components.Placeholder>
        {length !== props.options.length
          ? length
            ? `${length} Seleccion${length !== 1 ? "es" : ""}`
            : ""
          : "Todos"}
        {React.cloneElement(children[1])}
      </components.ValueContainer>
    );
  };

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
    { value: "1", label: "Posición 1" },
    { value: "2", label: "Posición 2" },
    { value: "3", label: "Posición 3" },
    { value: "4", label: "Posición 4" },
    { value: "5", label: "Posición 5" }
  ]);

  const [staff] = useState([
    {
      id: 1,
      name: "Adriana Peralta",
      position: "posicion",
      admissionDate: "14/09/1998",
      rating: 4,
      status: {
        name: "Activo",
        id: 1
      },
      mail: "aperalta@amerian.com",
      image: " https://source.unsplash.com/featured/?{avatar}"
    },
    {
      id: 1,
      name: "Adolfo Marconetti",
      position: "posicion",
      admissionDate: "14/09/1998",
      rating: 1,
      status: {
        name: "Inactivo",
        id: 2
      },
      mail: "amarconetti@amerian.com",
      image: " https://source.unsplash.com/featured/?{nature}"
    }
  ]);

  const getStatusBadgeType = id => {
    switch (id) {
      case 1:
        return "success";
      case 2:
        return "danger";

      default:
        break;
    }
  };

  const selectAll = isChecked => {
    console.log(isChecked);
  };

  return (
    <Fragment>
      <div className="d-flex mb-4 align-items-center w-75">
        <button type="button" className="btn btn-secondary is-rounded mr-3">
          Agregar Staff
        </button>
        <Form.Group controlId="formBasicEmail" className="mr-3">
          <Form.Control type="text" placeholder="Buscar" />
        </Form.Group>
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
        <button className="btn btn-link">Más filtros...</button>
      </div>
      <Table striped hover>
        <thead>
          <tr>
            <th width="2%">
              <Checkbox color="#888" size="2" borderThickness="2" />
            </th>
            <th>Nombre</th>
            <th>Posición</th>
            <th>Ingreso</th>
            <th>Rating</th>
            <th>Status</th>
            <th>
              <i className="fas fa-ellipsis-v"></i>
            </th>
          </tr>
        </thead>
        <tbody>
          {staff.map(e => (
            <tr key={e.id}>
              <td>
                <Checkbox
                  color="#888"
                  size="2"
                  borderThickness="2"
                  onChange={selectAll}
                  id={e.id}
                />
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <Image
                    className="mx-3"
                    src={e.image}
                    roundedCircle
                    width="50"
                    height="50"
                  />
                  <div className="d-flex flex-column">
                    <p className="mb-0">{e.name}</p>
                    <p className="mb-0 text-muted">{e.mail}</p>
                  </div>
                </div>
              </td>
              <td>
                <Badge className="p-2" variant="dark">
                  {e.position}
                </Badge>
              </td>
              <td>{e.admissionDate}</td>
              <td>
                <StarRatings
                  rating={e.rating}
                  numberOfStars={5}
                  starRatedColor="#FFE622"
                  starDimension="15px"
                  starSpacing="3px"
                />
              </td>
              <td>
                <Badge
                  className="p-2"
                  variant={getStatusBadgeType(e.status.id)}
                >
                  {e.status.name}
                </Badge>
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

export default Staff;
