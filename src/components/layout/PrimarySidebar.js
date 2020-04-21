import React from "react";
import logo from "../../assets/logo.png";
import { Image, Button } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { menuActions, userActions } from "../../redux/actions";

const PrimarySidebar = () => {
  const menu = useSelector(({ menu }) => menu.items);
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
      <div className="menu">
        {menu.map(item => (
          <div
            key={item.name}
            className="menu_item"
            style={item.isBottom ? { marginTop: "auto" } : {}}
          >
            <NavLink
              onClick={() => dispatch(menuActions.setActiveMenu(item.id))}
              to={item.path}
              className="menu_link"
            >
              <i className={`fas fa-${item.icon}`}></i>
            </NavLink>
          </div>
        ))}
        <div className="menu_item mt-auto">
          <Button variant="link"
            to="/home"
            className="menu_link"
            onClick={() => dispatch(userActions.logout())}
          >
            <i className="fas fa-sign-out-alt"></i>
          </Button>

        </div>
      </div>
    </div>
  );
};

export default PrimarySidebar;
