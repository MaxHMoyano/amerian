import React, { useState } from "react";
import WelcomePage from "../login/WelcomePage";
import { useSelector } from "react-redux";
import NavBar from "./NavBar";
import PrimarySidebar from "./PrimarySidebar";
import SecondarySidebar from "./SecondarySidebar";
import HotelSidebar from "./HotelSidebar";
import MainContent from "./MainContent";
import { useEffect } from "react";

const MainContainer = () => {

  const welcomePage = useSelector(({ auth }) => auth.welcomePage);
  const currentGroups = useSelector(({ user }) => user.current.groups);

  const isManager = () => {
    return currentGroups.some((e) => e === 1);
  };

  const isClient = () => {
    return currentGroups.some((e) => e === 2);
  };

  const isHotel = () => {
    return currentGroups.some((e) => e === 3);
  };





  const layout = {
    width: "100vw",
    height: "100vh",
    display: "grid",
    gridTemplateColumns: `${isManager() ? "auto auto 1fr" : "auto 1fr"}`,
    gridTemplateRows: "90px 1fr",
    gridTemplateAreas: `${isManager() ?
      "'primarySidebar secondarySidebar navbar' 'primarySidebar secondarySidebar content'" :
      isHotel ?
        "'hotelSidebar navbar' 'hotelSidebar content'" :
        "'clientSidebar navbar' 'clientSidebar content'"
      }`,
  };








  return welcomePage ? (
    <WelcomePage />
  ) : (
      <div style={layout}>
        <NavBar />
        {isManager() && <PrimarySidebar />}
        {isManager() && <SecondarySidebar />}
        {isHotel() && <HotelSidebar />}
        <MainContent />
      </div>
    );
};

export default MainContainer;
