import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const SecondarySidebar = () => {
  // States trackers
  const currentActiveRouteName = useSelector(
    ({ menu }) => menu.activeMenu.name
  );
  const currentNestedRoutes = useSelector(({ menu }) => menu.activeMenu.routes);

  // Show sidebar only if there are nestes routes
  let isSecondarySidebarActive = currentNestedRoutes.length;
  const [showSecondarySidebar, setShowSecondarySidebar] = useState(false);

  useEffect(() => {
    setShowSecondarySidebar(isSecondarySidebarActive);
  }, [isSecondarySidebarActive, currentNestedRoutes]);

  if (!isSecondarySidebarActive) {
    return "";
  }

  return (
    <div
      className={`secondary_sidebar ${
        showSecondarySidebar ? "active" : "inactive"
      }`}
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
        {currentActiveRouteName}
      </h4>
      {currentNestedRoutes.map(e => (
        <NavLink exact key={e.name} className="link" to={e.path}>
          {e.name}
        </NavLink>
      ))}
    </div>
  );
};

export default SecondarySidebar;
