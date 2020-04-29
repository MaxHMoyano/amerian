import React, { useState, Fragment } from "react";
import InfoCard from "../../../components/shared/InfoCard";
import { Button, Table, Badge, Dropdown, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { rateActions } from "../../../redux/actions";
import { useEffect } from "react";
import RateDropdown from "../../../components/shared/RateDropdown";

const RateUpdatesList = () => {

  // global Hooks
  const history = useHistory();
  const dispatch = useDispatch();

  // localstates
  const [searchParams, setSearchParams] = useState({
    status: null,
    limit: 10,
    offset: 0
  });

  // onMounted function
  useEffect(() => {
    dispatch(rateActions.fetchRates(searchParams));
  }, [dispatch, searchParams]);

  useEffect(() => {
    dispatch(rateActions.fetchRateStates());
  }, [dispatch]);

  // selectors
  const rates = useSelector(({ rate }) => rate);
  const rateStates = useSelector(({ rate }) => rate.states);

  const gridSummary = {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    columnGap: "1rem"
  };


  // utility functions

  const setActiveFilterTo = (state) => {
    setSearchParams({
      ...searchParams,
      status: state.value
    });
  };

  const clearStateFromFilters = () => {
    setSearchParams({
      status: null,
      limit: 10,
      offset: 0
    });
  };

  return (
    <Fragment>
      <div className="summary_container mb-4" style={gridSummary}>
        {rateStates.map((state, idx) => (
          <InfoCard
            onClick={e => setActiveFilterTo(state)}
            key={idx}
            quantity={state.count}
            description={state.name}
            code={state.code}
            name={state.name}
          />
        ))}
      </div>
      <div className="d-flex align-items-center">
        <RateDropdown />
        {/* <Button variant="outline-secondary" className="is_rounded mr-3">
          Actualizar convenios
        </Button> */}
      </div>
      {
        searchParams.status !== null &&
        <Alert className="my-3" variant="info" onClose={clearStateFromFilters} dismissible>
          <strong>Tarifas: </strong>
          <Badge variant="info" className="p-2 text-white">{rates.count}</Badge> <span className="mr-4">Resultados encontrados</span>
          <strong>Filtrando por: </strong>
          <Badge className="p-2 ml-3 text-white" variant={rateStates.find((e) => e.value === searchParams.status).code}>
            {rateStates.find((e) => e.value === searchParams.status).name}
          </Badge>
        </Alert>
      }
      {
        !rates.pending &&
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
      }
      {
        rates.pending &&
        <div className="d-flex justify-content-center align-items-center">
          <i className="fas fa-spinner fa-spin fa-2x"></i>
        </div>
      }
    </Fragment>
  );
};

export default RateUpdatesList;
