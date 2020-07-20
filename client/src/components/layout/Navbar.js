import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = ({ title, icon }) => {
  return (
    <div className='navbar bg-primary'>
      <h2>
        <i
          className={icon}
          style={{ fontSize: '32px', marginRight: '0.5rem' }}
        ></i>
        {title}
      </h2>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
      </ul>
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
