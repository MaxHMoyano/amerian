import React, { useState, Fragment } from "react";
import InfoCard from '../../../components/shared/InfoCard';

const Channels = () => {
  const [summary, setSummary] = useState([
    { name: "Nuevas", quantity: 5, code: "info", description: "Nuevas solicitudes" },
    { name: "En Revision", quantity: 2, code: "warning", description: "Solicitudes en revision" },
    { name: "Devueltas", quantity: 4, code: "danger", description: "Solicitudes devueltas" },
    { name: "Aprobadas", quantity: 12, code: "success", description: "Archivo historico de solicitudes" },
  ]);

  const gridSummary = {
    display: "grid",
    gridTemplateColumns: "repeat(4, auto)",
    columnGap: "2rem"
  };

  return <Fragment>
    <div className="summary_container" style={gridSummary}>
      {summary.map((card) => (
        <InfoCard key={card.code} quantity={card.quantity} description={card.description} code={card.code} name={card.name} />
      ))}
    </div>
  </Fragment>;
};

export default Channels;
