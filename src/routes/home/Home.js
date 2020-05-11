import React, { Fragment } from 'react';
// import { Image } from 'react-bootstrap';
import MenuSelector from '../../components/shared/MenuSelector';
import { useSelector } from 'react-redux';
import ClientHome from './ClientHome';

const Home = () => {
  const isClient = useSelector(({ user }) =>
    user.current.rol.some((e) => e === 2)
  );

  const currentHotelName = useSelector(({ hotel }) =>
    hotel.current ? hotel.current.name : 'Amerian Hoteles'
  );

  return (
    <Fragment>
      {isClient ? (
        <ClientHome />
      ) : (
        <div className='home_container'>
          {/* <Image height="160" width="160" src="https://source.unsplash.com/featured/?{profile}" /> */}
          <MenuSelector />
          <h1 className='text-light font-weight-bold'>{currentHotelName}</h1>
        </div>
      )}
    </Fragment>
  );
};

export default Home;
