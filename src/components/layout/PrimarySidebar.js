import React from "react";
import logo from "../../assets/logo.png";
import { Image } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { activeMenu } from "../../redux/actions/menuActions";

const PrimarySidebar = () => {
  const menu = useSelector(({ menu }) => menu.menuItems);
  const dispatch = useDispatch();
  return (
    <div className="primary_sidebar">
      <Link to="/home">
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
        <a href="/notifications" className="menu_link">
          <i className="fas fa-bell"></i>
        </a>
      </div>
      <div className="menu_item">
        <a href="/help" className="menu_link">
          <i className="fas fa-question-circle"></i>
        </a>
      </div>
      <div className="menu_item">
        <a href="/help" className="menu_link">
          <i className="fas fa-cog"></i>
        </a>
      </div>
    </div>
  );
};

export default PrimarySidebar;
