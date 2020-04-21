import React, { Fragment, useState } from "react";
import { Table, Badge, Button, Dropdown } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import RateDropdown from "../../../components/shared/RateDropdown";

const RatesList = () => {

  const history = useHistory();

  const [tariffsTypes] = useState([
    { name: "Tarifa General", value: 1, path: "/comercial/petitions/new-petition?type=general" },
    { name: "Fechas Especiales", value: 2, path: "/comercial/petitions/new-petition?type=special" },
    { name: "Promociones", value: 3, path: "/comercial/petitions/new-petition?type=promotion" },
  ]);

  const [tariffs] = useState([
    {
      id: 1, hotel: "Mérit San Telmo", province: "Buenos Aires", dateFrom: "01/01/2020", dateTo: "31/05/2020", requests: [
        { name: "Pendientes", code: "info", count: 2 },
        { name: "En revision", code: "warning", count: 3 },
        { name: "Rechazadas", code: "danger", count: 5 },
      ]
    },
    {
      id: 2, hotel: "Mérit San Telmo", province: "Buenos Aires", dateFrom: "01/01/2020", dateTo: "31/05/2020", requests: [
        { name: "Pendientes", code: "info", count: 2 },
        { name: "En revision", code: "warning", count: 3 },
        { name: "Rechazadas", code: "danger", count: 5 },
      ]
    },
  ]);

  return <Fragment>
    <div className="d-flex align-items-center mb-2">
      <RateDropdown />
    </div>
    <Table>
      <thead>
        <tr>
          <th>Hotel</th>
          <th>Provincia</th>
          <th>Tarifas vigentes</th>
          <th>Solicitudes</th>
        </tr>
      </thead>
      <tbody>
        {
          tariffs.map((tariff) => (
            <tr key={tariff.id}>
              <td width="35%">{tariff.hotel}</td>
              <td>{tariff.province}</td>
              <td>
                <div className="d-flex align-items-center">
                  <Button variant="outline-info mx-2">Directos</Button>
                  <Button variant="outline-info mx-2">Convenios</Button>

                </div>
              </td>
              <td>
                {tariff.requests.map((request) => (
                  <Badge onClick={() => history.push("/comercial/petitions/")} key={request.code} className="p-2 petitions_badge mx-1 text-light" variant={request.code}>{request.count}</Badge>
                ))}
              </td>
            </tr>
          ))
        }
      </tbody>
    </Table>
  </Fragment>;
};

export default RatesList;
