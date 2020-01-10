import React from "react";
import WelcomePage from "./WelcomePage";
import { useSelector } from "react-redux";
import NavBar from "./NavBar";
import PrimarySidebar from "./PrimarySidebar";
import SecondarySidebar from "./SecondarySidebar";
import MainContent from "./MainContent";

const MainContainer = () => {
  const isUserLoading = useSelector(({ auth }) => auth.isUserLoading);

  return isUserLoading ? (
    <WelcomePage></WelcomePage>
  ) : (
    <div className="main_container">
      <NavBar></NavBar>
      <PrimarySidebar></PrimarySidebar>
      <SecondarySidebar></SecondarySidebar>
      <MainContent></MainContent>
    </div>
  );
};

export default MainContainer;
