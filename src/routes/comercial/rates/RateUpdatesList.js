import React, { useState, Fragment } from "react";
import InfoCard from "../../../components/shared/InfoCard";
import { Button, Table, Badge, Dropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { rateActions } from "../../../redux/actions";
import { useEffect } from "react";
import RateDropdown from "../../../components/shared/RateDropdown";

const RateUpdatesList = () => {

  // global Hooks
  const history = useHistory();
  const dispatch = useDispatch();

  // onMounted function
  useEffect(() => {
    dispatch(rateActions.fetchRates());
    dispatch(rateActions.fetchRateStates());
  }, [dispatch]);

  // selectors
  const rates = useSelector(({ rate }) => rate);

  // utility functions

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


  return (
    <Fragment>
      {/* <div className="summary_container mb-4" style={gridSummary}>
        {summary.map(card => (
          <InfoCard
            key={card.code}
            quantity={card.quantity}
            description={card.description}
            code={card.code}
            name={card.name}
          />
        ))}
      </div> */}
      {/* <hr className="text-muted" /> */}
      <div className="d-flex align-items-center">
        <RateDropdown />
        {/* <Button variant="outline-secondary" className="is_rounded mr-3">
          Actualizar convenios
        </Button> */}
      </div>
      <Table>
        <thead>
          <tr>
            <th>Tarifa</th>
            <th>Moneda</th>
            <th>Hotel</th>
            <th>Estado</th>
            <th>
              <Button variant="light" disabled>
                <i className="fas fa-ellipsis-h"></i>
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {rates.results.map(rate => (
            <tr key={rate.id}>
              <td>
                <span onClick={e => history.push(`/comercial/rates/${rate.id}`)} className="text-info icon-button">
                  {rate.name}
                </span>
              </td>
              <td>{rate.currency}</td>
              <td>{rate.hotel}</td>
              <td>
                <Badge className="p-2 text-light" variant={rates.states.length ? rates.states.find((state) => rate.status === state.value).code : ""}>
                  {rates.states.length ? rates.states.find((state) => rate.status === state.value).name : ""}
                </Badge>
              </td>
              <td>
                <Dropdown drop="left">
                  <Dropdown.Toggle variant="light">
                    <i className="fas fa-ellipsis-h"></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {
                      (rate.status === 1 || rate.status === 3) &&
                      <Dropdown.Item
                        as="button"
                        className="d-flex justify-content-between align-items-center">
                        <span>Editar</span> <i className="fas fa-edit"></i>
                      </Dropdown.Item>
                    }
                    {
                      rate.status === 2 &&
                      <Dropdown.Item
                        as="button"
                        className="d-flex justify-content-between align-items-center">
                        <span>Enviar solicitud</span> <i className="fas fa-paper-plane"></i>
                      </Dropdown.Item>
                    }
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Fragment>
  );
};

export default RateUpdatesList;
