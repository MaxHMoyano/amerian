import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const SecondarySidebar = () => {
  // States trackers
  const activeMenu = useSelector(({ menu }) => menu.items.find((e) => e.active));


  // // Show sidebar only if there are nestes routes
  const [showSecondarySidebar, setShowSecondarySidebar] = useState(true);
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  useEffect(() => {
    if (activeMenu && activeMenu.routes.length) {
      setIsSidebarActive(true);
    } else {
      setIsSidebarActive(false);
    }
  }, [isSidebarActive, activeMenu]);

  if (!isSidebarActive) {
    return "";
  }

  return (
    <div
      className={`secondary_sidebar ${showSecondarySidebar ? "active" : "inactive"}`}
    >
      <button
        type="button"
        className={`btn btn-primary sidebar_toggle`}
        onClick={() => setShowSecondarySidebar(!showSecondarySidebar)}
      >
        <i
          className={`fas fa-${
            showSecondarySidebar ? "chevron-left" : "chevron-right"
            }`}
        ></i>
      </button>
      <h4 className="text-muted font-weight-bold mb-5">
        {activeMenu ? activeMenu.name : ""}
      </h4>
      {
        activeMenu && activeMenu.routes.length && activeMenu.routes.map(e => (
          <NavLink key={e.name} className="link" to={e.path}>
            {e.name}
          </NavLink>
        ))
      }
    </div>
  );
};

export default SecondarySidebar;
