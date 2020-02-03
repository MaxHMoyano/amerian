import React from "react";
import logo from "../../assets/logo.png";
import { Image } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { menuActions } from "../../redux/actions";

const PrimarySidebar = () => {
  const menu = useSelector(({ menu }) => menu.items);
  const dispatch = useDispatch();

  return (
    <div className="primary_sidebar">
      <Link
        to="/home"
        onClick={() => dispatch(menuActions.setActiveMenu({ name: "home" }))}
      >
        <div className="logo">
          <Image src={logo} />
        </div>
      </Link>
      <div className="menu">
        {menu.map(item => (
          <div
            key={item.name}
            className="menu_item"
            style={item.isBottom ? { marginTop: "auto" } : {}}
          >
            <NavLink
              onClick={() => dispatch(menuActions.setActiveMenu(item))}
              to={item.path}
              className="menu_link"
            >
              <i className={`fas fa-${item.icon}`}></i>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrimarySidebar;
