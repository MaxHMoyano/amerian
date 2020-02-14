import React from 'react';
import PropTypes from 'prop-types';

const InfoCard = (props) => {


  return (
    <div className="info_card">
      <div className={`info_card_header bg-${props.code}`}>
        <span className="text-uppercase">Solicitudes</span>
        <h3>{props.name}</h3>
      </div>
      <div className="info_card_content">
        <span className={`text-${props.code}`}>{props.quantity}</span>
        <span>{props.description}</span>
      </div>
    </div>
  );
};

InfoCard.propTypes = {
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
};

export default InfoCard;
