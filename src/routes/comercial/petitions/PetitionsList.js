import React, { useState, Fragment } from "react";
import InfoCard from "../../../components/shared/InfoCard";
import Select from "react-select";
import { Form, Button, Table, Badge, Dropdown } from "react-bootstrap";
import { customValueContainer } from "../../../helpers/utilities";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useHistory } from 'react-router-dom';
import { hotelActions } from "../../../redux/actions/";
import { useEffect } from "react";


const PetitionsList = () => {

  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hotelActions.fetchHotels());
  }, [dispatch]);

  const hotels = useSelector(({ hotel }) => hotel.payload);


  const [tariffsTypes] = useState([
    { name: "Tarifa General", value: 1, path: "new-petition?type=general" },
    { name: "Fechas Especiales", value: 2, path: "new-petition?type=special" },
    { name: "Promociones", value: 3, path: "new-petition?type=promotion" },
  ]);

  const [summary] = useState([
    {
      name: "Nuevas",
      quantity: 5,
      code: "info",
      description: "Nuevas solicitudes"
    },
    {
      name: "En Revision",
      quantity: 2,
      code: "warning",
      description: "Solicitudes en revision"
    },
    {
      name: "Devueltas",
      quantity: 4,
      code: "danger",
      description: "Solicitudes devueltas"
    },
    {
      name: "Aprobadas",
      quantity: 12,
      code: "success",
      description: "Archivo historico de solicitudes"
    }
  ]);

  const gridSummary = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    columnGap: "2rem"
  };


  const [petitions] = useState([
    {
      id: 1,
      name: "Nombre de la tarifa",
      period: "19/02/2020 - 01/03/2020",
      currency: "USD",
      hotel: "Hotel 1",
      status: {
        name: "En curso",
        code: "info"
      }
    },
    {
      id: 2,
      name: "Nombre de la tarifa",
      period: "19/02/2020 - 01/03/2020",
      currency: "USD",
      hotel: "Hotel 1",
      status: {
        name: "Pendiente",
        code: "warning"
      }
    }
  ]);

  return (
    <Fragment>
      <div className="summary_container mb-4" style={gridSummary}>
        {summary.map(card => (
          <InfoCard
            key={card.code}
            quantity={card.quantity}
            description={card.description}
            code={card.code}
            name={card.name}
          />
        ))}
      </div>
      {/* <hr className="text-muted" /> */}
      <div className="d-flex align-items-center">
        <Dropdown>
          <Dropdown.Toggle className="is_rounded mr-2" variant="secondary" id="dropdown-basic">
            Nueva Tarifa
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {
              tariffsTypes.map((e) => (
                <Dropdown.Item key={e.value} onClick={() => history.push(`${location.pathname}/${e.path}`)}>{e.name}</Dropdown.Item>
              ))
            }
          </Dropdown.Menu>
        </Dropdown>
        <Button variant="outline-secondary" className="is_rounded mr-3">
          Actualizar convenios
        </Button>
        <Form.Control className="w-25" type="text" placeholder="Buscar" />
        <Select
          className="react_select_container mx-2"
          classNamePrefix="react_select"
          components={{
            ValueContainer: customValueContainer
          }}
          isClearable
          hideSelectedOptions={false}
          isMulti
          placeholder="Hotel: "
          options={hotels.map(hotel => ({
            label: hotel.name,
            value: hotel.id
          }))}
        ></Select>
        <button className="btn btn-link">Más filtros...</button>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Tarifa</th>
            <th>Periodo</th>
            <th>Moneda</th>
            <th>Hotel</th>
            <th>Estado</th>
            <th>
              <Button variant="light">
                <i className="fas fa-ellipsis-v"></i>
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {petitions.map(e => (
            <tr className="table_link" key={e.id}>
              <td>{e.name}</td>
              <td>{e.period}</td>
              <td>{e.currency}</td>
              <td>{e.hotel}</td>
              <td>
                <Badge className="p-2 text-light" variant={e.status.code}>
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

export default PetitionsList;
