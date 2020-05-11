import React, { Fragment } from 'react';
import WelcomePage from '../login/WelcomePage';
import { useSelector } from 'react-redux';
import NavBar from './NavBar';
import PrimarySidebar from './PrimarySidebar';
import SecondarySidebar from './SecondarySidebar';
import HotelSidebar from './HotelSidebar';
import MainContent from './MainContent';
import ClientSidebar from './ClientSidebar';

const MainContainer = () => {
  const welcomePage = useSelector(({ auth }) => auth.welcomePage);
  const currentGroups = useSelector(({ user }) => user.current.rol);

  const isManager = () => {
    return currentGroups.some((e) => e === 1);
  };

  // const isClient = () => {
  //   return currentGroups.some((e) => e === 2);
  // };

  const isHotel = () => {
    return currentGroups.some((e) => e === 3);
  };

  const getTemplateAreas = () => {
    if (isManager()) {
      if (isHotel()) {
        return "'primarySidebar hotelSidebar navbar' 'primarySidebar hotelSidebar content'";
      }
      return "'primarySidebar secondarySidebar navbar' 'primarySidebar secondarySidebar content'";
    } else if (isHotel()) {
      return "'hotelSidebar navbar' 'hotelSidebar content'";
    } else {
      return "'primarySidebar navbar' 'primarySidebar content'";
    }
  };

  const getMenuStructure = () => {
    if (isManager()) {
      if (isHotel()) {
        return (
          <Fragment>
            <PrimarySidebar />
            <HotelSidebar />
          </Fragment>
        );
      }
      return (
        <Fragment>
          <PrimarySidebar />
          <SecondarySidebar />
        </Fragment>
      );
    } else if (isHotel()) {
      return (
        <Fragment>
          <HotelSidebar />
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <ClientSidebar />
        </Fragment>
      );
    }
  };

  const layout = {
    width: '100vw',
    height: '100vh',
    display: 'grid',
    gridTemplateColumns: `${isManager() ? 'auto auto 1fr' : 'auto 1fr'}`,
    gridTemplateRows: '90px 1fr',
    gridTemplateAreas: getTemplateAreas(),
  };

  return welcomePage ? (
    <WelcomePage />
  ) : (
    <div style={layout}>
      <NavBar />
      {getMenuStructure()}
      <MainContent />
    </div>
  );
};

export default MainContainer;
