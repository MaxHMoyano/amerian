import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const HotelSidebar = () => {
  const activeMenu = useSelector(({ menu }) => menu.items.find((e) => e.active === true));




  return (
    <div className="hotel_sidebar">
      {/* <h4 className="text-muted font-weight-bold mb-5">
        Hotel nombre
      </h4>
      {activeMenu && activeMenu.routes.length && activeMenu.routes.map(e => (
        <NavLink key={e.name} className="link" to={e.path}>
          {e.name}
        </NavLink>
      ))} */}
    </div>
  );
};

export default HotelSidebar;
