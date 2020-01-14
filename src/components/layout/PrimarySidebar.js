import React from "react";
import logo from "../../assets/logo.png";
import { Image } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  activeMenu,
  removePreviousActiveMenu
} from "../../redux/actions/menuActions";

const PrimarySidebar = () => {
  const menu = useSelector(({ menu }) => menu.menuItems);
  const dispatch = useDispatch();

  return (
    <div className="primary_sidebar">
      <Link to="/home" onClick={() => dispatch(removePreviousActiveMenu())}>
        <div className="logo">
          <Image src={logo} />
        </div>
      </Link>
      <div className="menu">
        {menu.map(item => (
          <div key={item.title} className="menu_item">
            <NavLink
              to={item.url}
              className="menu_link"
              onClick={() => dispatch(activeMenu(item.url))}
            >
              <i className={`fas fa-${item.icon}`}></i>
            </NavLink>
          </div>
        ))}
      </div>
      <div className="menu_item">
        <Link
          className="menu_link"
          to="notifications"
          onClick={() => dispatch(removePreviousActiveMenu())}
        >
          <i className="fas fa-bell"></i>
        </Link>
      </div>
      <div className="menu_item">
        <Link
          className="menu_link"
          to="notifications"
          onClick={() => dispatch(removePreviousActiveMenu())}
        >
          <i className="fas fa-question-circle"></i>
        </Link>
      </div>
      <div className="menu_item">
        <Link
          className="menu_link"
          to="notifications"
          onClick={() => dispatch(removePreviousActiveMenu())}
        >
          <i className="fas fa-cog"></i>
        </Link>
      </div>
    </div>
  );
};

export default PrimarySidebar;
