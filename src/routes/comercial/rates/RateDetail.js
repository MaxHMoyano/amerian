import React, { Fragment, useEffect, useState } from 'react';
import { rateActions, clientActions } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from 'react-router-dom';
import { Form, Row, Col, Button, Table, Badge } from "react-bootstrap";
import Datepicker from "react-datepicker";
import { parseISO } from "date-fns";

const RateDetail = () => {

  // global hooks
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  // local states
  const [rate, setRate] = useState(null);

  // selectors

  const clientTypes = useSelector(({ client }) => client.types);

  // on mount function
  useEffect(() => {
    dispatch(clientActions.fetchClientTypes());
    Promise.all([
      dispatch(rateActions.fetchRate(params.id)),
      dispatch(rateActions.fetchRateTypes()),
      dispatch(rateActions.fetchRateStates()),
    ]).then(([rate, types, states]) => {
      setRate({
        ...rate,
        type: types.find((e) => e.value === rate.type),
        status: states.find((e) => e.value === rate.status),
      });
    });
  }, [dispatch, params.id]);

  if (!rate) {
    return <div className="d-flex justify-content-center align-items-center h-100">
      <i className="fas fa-spinner fa-spin fa-4x"></i>
    </div>;
  }

  const getPrice = (amount, condition) => {
    let base = condition.list.find((e) => e.clients.length === 0);
    let basePercentage = base.percentage;
    return (parseFloat((basePercentage / 100 * amount.amount)) + parseFloat(amount.amount)).toFixed(2);
  };

  const getPercentage = (condition) => {
    let base = condition.list.find((e) => e.clients.length === 0);
    return parseFloat(base.percentage).toFixed(1);
  };

  const approveRate = () => {
    let approvedRate = {
      status: 2
    };
    rateActions.partialUpdateRate(rate.hotel, rate.id, approvedRate).then((update) => {
    });
  };

  const getClientName = (value) => {
    const client = clientTypes.find(e => e.value === value);
    return client.name;
  };

  return (
    <Fragment>
      <Row className="mb-5">
        <Col md={6}>
          {
            (rate.status.value === 0 || rate.status.value === 3) &&
            <Button className="mr-2" variant="secondary">Editar Tarifa</Button>
          }
          {
            rate.status.value === 1 &&
            <Button onClick={e => approveRate()} className="mx-2" variant="outline-secondary">Observar / Aprobar</Button>
          }
        </Col>
      </Row>
      <Row className="mb-4">
        <Col className="d-flex align-items-center">
          <Button onClick={() => history.goBack()} variant="light"><i className="fas fa-chevron-left"></i></Button>
          <h2 className="text-primary mb-0 ml-2">{rate.type ? rate.type.name : ""}</h2>
          <Badge className="p-2 ml-4 text-white" variant={rate.status ? rate.status.code : "dark"} >{rate.status && rate.status.name}</Badge>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Hotel:</Form.Label>
            <Form.Control disabled value={rate.hotel.name} />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Moneda:</Form.Label>
            <Form.Control disabled value={rate.hotel.name} />
          </Form.Group>
        </Col>
      </Row>
      <h2 className="text-muted mt-4">Vigencias</h2>
      {
        rate.details.map((detail, idx) => (
          <Row className="mb-3" key={idx}>
            {
              detail.name &&
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Ocación:</Form.Label>
                  <Form.Control disabled value={detail.name} />
                </Form.Group>
              </Col>
            }
            <Col md={3}>
              <Form.Group>
                <div className="d-flex">
                  <div className="d-flex flex-column">
                    <Form.Label>Desde:</Form.Label>
                    <Datepicker
                      placeholderText="Desde"
                      className="form-control"
                      disabled
                      selected={parseISO(detail.date_from)}
                    />
                  </div>
                  <div className="d-flex flex-column">
                    <Form.Label>Hasta:</Form.Label>
                    <Datepicker
                      placeholderText="Hasta"
                      className="form-control"
                      disabled
                      selected={parseISO(detail.date_to)}
                    />
                  </div>

                </div>
              </Form.Group>
            </Col>
          </Row>
        ))
      }
      <Row>
        <Col md={6} >
          <div style={{ boxShadow: "1px 0 16px #e0dbdb" }}>
            <Table striped hover bordered>
              <thead>
                <tr>
                  <th>Habitación</th>
                  <th>Rack</th>
                  {
                    rate.conditions.map((condition, idx) => (
                      condition.list.length > 0 && <th key={idx}>{getClientName(condition.name)}</th>
                    ))
                  }
                </tr>
              </thead>
              <tbody>
                <tr className="table-secondary">
                  <td>% Asignado</td>
                  <td></td>
                  {
                    rate.conditions.map((condition, idx) => (
                      condition.list.length > 0 && <td key={idx}>
                        {getPercentage(condition)} %
                          </td>
                    ))
                  }
                </tr>
                {
                  rate.amounts.map((amount, idx) => (
                    <tr key={idx}>
                      <td>{amount.roomCategory.name}</td>
                      <td>${parseFloat(amount.amount).toFixed(2)}</td>
                      {
                        rate.conditions.map((condition, idx) => (
                          condition.list.length > 0 && <td key={idx}>
                            $ {getPrice(amount, condition)}
                          </td>
                        ))
                      }
                    </tr>
                  ))
                }
              </tbody>
            </Table>

          </div>

        </Col>
      </Row>
      <h2 className="text-muted mt-5 mb-2">Excepciones</h2>
      {
        rate.conditions.map((condition, idx) => (
          condition.list.length > 0 &&
          <Row key={idx} className="my-3">
            <Col md={6} style={{ backgroundColor: "#fbfbfb" }}>
              <h4 className="section_title mt-4">{clientTypes.length ? clientTypes.find(e => e.value === condition.name).name : ""}</h4>
              <div className="p-3" style={{ backgroundColor: "#D9EDF7" }}>
                <p>Descuento para {getClientName(condition.name)} {getPercentage(condition)}% salvo las siguientes excepciones:</p>
                {
                  condition.list.map((el, idx) => (
                    el.clients.length > 0 &&
                    <Fragment key={idx}>
                      <Badge variant="dark" className="p-2 mx-2 text-white">{parseFloat(el.percentage).toFixed(1)} % : </Badge>
                      {
                        el.clients.map((client, idx) => (
                          <Fragment key={idx}>
                            <Badge variant="info" className="p-2 mx-2 text-white">{client.name}</Badge>
                          </Fragment>
                        ))
                      }
                    </Fragment>

                  ))
                }
              </div>
              <div style={{ boxShadow: "1px 0 16px #e0dbdb" }}>
                <Table bordered hover striped>
                  <thead>
                    <tr>
                      <th width="30%">Habitación</th>
                      <th width="5%">Rack</th>
                      {
                        condition.list.map((el, idx) => (
                          <th key={idx} width="5%" className={`${!el.clients.length ? "text-info" : ""}`} > {parseInt(el.percentage).toFixed(1)} %</th>
                        ))
                      }
                    </tr>
                  </thead>
                  <tbody>
                    {
                      rate.amounts.map((amount, idx) => (
                        <tr key={idx}>
                          <td>{amount.roomCategory.name}</td>
                          <td>${parseFloat(amount.amount).toFixed(2)}</td>
                          {
                            condition.list.map((el, idx) => (
                              <td key={idx} width="5%" className={`${!el.clients.length ? "text-info" : ""}`}>
                                ${getPrice(amount, condition)}
                              </td>
                            ))
                          }
                        </tr>
                      ))
                    }
                  </tbody>

                </Table>

              </div>
            </Col>
          </Row>
        ))
      }



      <Row>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Observaciones:</Form.Label>
            <Form.Control disabled rows="10" as="textarea" value={rate.observations} />
          </Form.Group>
        </Col>
      </Row>
    </Fragment >
  );
};

export default RateDetail;
