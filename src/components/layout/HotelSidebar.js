import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { menuActions, userActions } from '../../redux/actions';
import { Button } from 'react-bootstrap';
import { Fragment } from 'react';

const HotelSidebar = () => {
  const menu = useSelector(({ menu }) =>
    menu.items.filter((e) => e.showOnHotel)
  );
  const dispatch = useDispatch();

  const isManager = useSelector(({ user }) =>
    user.current.rol.some((e) => e === 1)
  );

  const currentHotelName = useSelector(({ hotel }) =>
    hotel.current ? hotel.current.name : ''
  );

  return (
    <div className='hotel_sidebar'>
      <h4 className='text-white font-weight-bold mb-5 text-center'>
        {currentHotelName}
      </h4>
      <div className='menu'>
        <div className='item_wrapper'>
          <NavLink
            className='hotel_sidebar_item'
            to='/home/'
            onClick={() => dispatch(menuActions.setActiveMenu())}
          >
            <i className={`fas fa-tachometer-alt`}></i>
            <span>Dashboard</span>
          </NavLink>
        </div>
        {menu.map((item, idx) => (
          <div
            key={idx}
            className={`${item.active ? 'active' : ''} item_wrapper`}
          >
            <NavLink
              className='hotel_sidebar_item'
              to={item.path}
              onClick={() => dispatch(menuActions.setActiveMenu(item.id))}
            >
              <i className={`fas fa-${item.icon}`}></i>
              <span>{item.name}</span>
              {!item.active ? (
                <i className='fas fa-caret-down ml-auto'></i>
              ) : (
                <i className='fas fa-caret-up ml-auto'></i>
              )}
            </NavLink>
            {item.routes.length &&
              item.active &&
              item.routes.map((route, idx) => (
                <NavLink
                  key={idx}
                  className='hotel_sidebar_child'
                  to={route.path}
                >
                  <span>{route.name}</span>
                </NavLink>
              ))}
          </div>
        ))}
      </div>
      {!isManager && (
        <div className='menu_actions p-2 mt-auto d-flex align-items-center justify-content-between'>
          {/* <img src="" alt="photo 2" /> */}
          <button
            className='menu_action_button'
            onClick={() => dispatch(userActions.logout())}
          >
            <i className='fas fa-user text-white'></i>
          </button>
          <button
            className='menu_action_button'
            onClick={() => dispatch(userActions.logout())}
          >
            <i className='fas fa-question-circle'></i>
          </button>
          <button
            className='menu_action_button'
            onClick={() => dispatch(userActions.logout())}
          >
            <i className='fas fa-cog'></i>
          </button>
          <button
            className='menu_action_button'
            onClick={() => dispatch(userActions.logout())}
          >
            <i className='fas fa-sign-out-alt'></i>
          </button>
        </div>
      )}
      {isManager && (
        <Button
          onClick={(e) => dispatch(userActions.showContentAsInHotel(false))}
          variant='light'
        >
          Volver a hoteles
        </Button>
      )}
    </div>
  );
};

export default HotelSidebar;
