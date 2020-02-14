import React from "react";
import { Image } from 'react-bootstrap';
import MenuSelector from '../../components/shared/MenuSelector';

const Home = () => {
  return <div className="home_container">
    <Image height="160" width="160" src="https://source.unsplash.com/featured/?{profile}" />
    <MenuSelector />
    <h1 className="text-light font-weight-bold">Amerian Hoteles</h1>
  </div>;
};

export default Home;
