import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { menuActions, userActions } from '../../redux/actions';
import { Image, Button } from 'react-bootstrap';
import logo from '../../assets/logo.png';

const ClientSidebar = (props) => {
  const dispatch = useDispatch();
  return (
    <div className='primary_sidebar'>
      <Link
        to='/home'
        onClick={() => dispatch(menuActions.setActiveMenu(null))}
      >
        <div className='logo'>
          <Image src={logo} />
        </div>
      </Link>
      <div className='menu'>
        <div className='menu_item mt-auto'>
          <Button
            variant='link'
            className='menu_link'
            onClick={() => dispatch(userActions.logout())}
          >
            <i className='fas fa-sign-out-alt'></i>
          </Button>
        </div>
      </div>
    </div>
  );
};

ClientSidebar.propTypes = {};

export default ClientSidebar;
