import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { menuActions } from "../../redux/actions";
import { Image } from "react-bootstrap";
import logo from "../../assets/logo.png";


const ClientSidebar = props => {

  const dispatch = useDispatch();
  return (
    <div className="primary_sidebar">
      <Link
        to="/home"
        onClick={() => dispatch(menuActions.setActiveMenu(null))}
      >
        <div className="logo">
          <Image src={logo} />
        </div>
      </Link>
    </div>
  );
};

ClientSidebar.propTypes = {

};

export default ClientSidebar;
