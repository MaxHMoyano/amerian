import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";

const SecondarySidebar = () => {
  const entry = useSelector(state => {
    const activeUrl = state.menu.menuItems.find(e => {
      return e.active === true;
    });
    return activeUrl;
  });

  let activeSubMenu = entry && entry.subMenu && entry.subMenu.length;
  useEffect(() => {
    setIsSidebarActive(activeSubMenu);
  }, [activeSubMenu, entry]);

  const [isSidebarActive, setIsSidebarActive] = useState(false);
  return (
    <div
      className={`secondary_sidebar ${isSidebarActive ? "active" : "inactive"}`}
    >
      {entry && entry.subMenu && <Redirect to={entry.subMenu[0].url} />}

      <button
        type="button"
        className={`btn btn-primary sidebar_toggle ${
          entry && entry.subMenu && entry.subMenu.length ? "" : "d-none"
        }`}
        onClick={() => setIsSidebarActive(!isSidebarActive)}
      >
        <i
          className={`fas fa-${
            isSidebarActive ? "chevron-left" : "chevron-right"
          }`}
        ></i>
      </button>
      <h4 className="text-muted font-weight-bold mb-5">
        {entry ? entry.title : ""}
      </h4>
      {activeSubMenu
        ? entry.subMenu.map(e => (
            <NavLink exact key={e.title} className="link" to={e.url}>
              {e.title}
            </NavLink>
          ))
        : ""}
    </div>
  );
};

export default SecondarySidebar;
