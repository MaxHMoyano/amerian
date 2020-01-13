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
  }, [activeSubMenu]);

  const [isSidebarActive, setIsSidebarActive] = useState(false);
  return isSidebarActive ? (
    <div className="secondary_sidebar">
      <Redirect to={entry.subMenu ? entry.subMenu[0].url : entry.url} />
      <button type="button" className="btn btn-primary sidebar_toggle">
        <i className="fas fa-chevron-left"></i>
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
  ) : (
    ""
  );
};

export default SecondarySidebar;
