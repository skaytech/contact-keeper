import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, logout, user } = authContext;

  const onClick = () => logout();

  const authLinks = (
    <Fragment>
      {user && <li>Hello {user.name}</li>}
      <li>
        <a onClick={onClick} href='#!'>
          <i className='las la-sign-out-alt'></i>{' '}
          <span className='hide-sm'> Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/login'>Login</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar bg-primary'>
      <h2>
        <i
          className={icon}
          style={{ fontSize: '32px', marginRight: '0.5rem' }}
        ></i>
        {title}
      </h2>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

Navbar.defaultProps = {
  title: 'Contact Keeper',
  icon: 'lar la-address-card',
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Navbar;
