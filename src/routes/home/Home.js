import React, { Fragment } from "react";
// import { Image } from 'react-bootstrap';
import MenuSelector from '../../components/shared/MenuSelector';
import { useSelector } from "react-redux";

const Home = () => {

  const isClient = useSelector(({ user }) => user.current.groups.some((e) => e === 2));

  return <Fragment>
    {isClient ? <div>

    </div> :
      <div className="home_container">
        {/* <Image height="160" width="160" src="https://source.unsplash.com/featured/?{profile}" /> */}
        <MenuSelector />
        <h1 className="text-light font-weight-bold">Amerian Hoteles</h1>
      </div>}
  </Fragment>;
};

export default Home;
