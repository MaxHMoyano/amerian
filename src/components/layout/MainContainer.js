import React from "react";
import WelcomePage from "../login/WelcomePage";
import { useSelector } from "react-redux";
import NavBar from "./NavBar";
import PrimarySidebar from "./PrimarySidebar";
import SecondarySidebar from "./SecondarySidebar";
import MainContent from "./MainContent";

const MainContainer = () => {
  const welcomePage = useSelector(({ auth }) => auth.welcomePage);

  return welcomePage ? (
    <WelcomePage />
  ) : (
      <div className="main_container">
        <NavBar />
        <PrimarySidebar />
        <SecondarySidebar />
        <MainContent />
      </div>
    );
};

export default MainContainer;
