import React from "react";
import WelcomePage from "../login/WelcomePage";
import { useSelector } from "react-redux";
import NavBar from "./NavBar";
import PrimarySidebar from "./PrimarySidebar";
import SecondarySidebar from "./SecondarySidebar";
import MainContent from "./MainContent";
import { BrowserRouter as Router } from "react-router-dom";

const MainContainer = () => {
  const isUserLoading = useSelector(({ auth }) => auth.isUserLoading);

  return isUserLoading ? (
    <WelcomePage />
  ) : (
    <div className='main_container'>
      <Router>
        <NavBar />
        <PrimarySidebar />
        <SecondarySidebar />
        <MainContent />
      </Router>
    </div>
  );
};

export default MainContainer;
