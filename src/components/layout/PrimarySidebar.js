import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { Image } from "react-bootstrap";
const PrimarySidebar = () => {
  const menu = [
    {
      title: "Hoteles",
      icon: "hotel",
      url: "/hotels"
    },
    {
      title: "Staff",
      icon: "users",
      url: "/staff"
    },
    {
      title: "Convenios",
      icon: "hands-helping",
      url: "/agreements"
    },
    {
      title: "Agregar nuevo",
      icon: "plus",
      url: "/create-menu-item"
    }
  ];

  const [menuItems] = useState(menu);
  return (
    <div className="primary_sidebar">
      <div className="logo">
        <Image src={logo} />
      </div>
      <div className="menu">
        {menuItems.map(item => (
          <div key={item.title} className="menu_item">
            <a href={item.url} className="menu_link">
              <i className={`fas fa-${item.icon}`}></i>
            </a>
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
    </div>
  );
};

export default PrimarySidebar;
