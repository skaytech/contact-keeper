import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = (props) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const alertContext = useContext(AlertContext);

  const authContext = useContext(AuthContext);

  const { register, errors, clearErrors, isAuthenticated } = authContext;

  const { name, email, password, password2 } = user;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (errors === 'The user already exists') {
      alertContext.setAlert(errors, 'danger');
    }
    clearErrors();
    //eslint-disable-next-line
  }, [errors, isAuthenticated, props.history]);

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      alertContext.setAlert('Passwords do not match', 'danger');
    } else {
      register({
        name,
        email,
        password,
      });
    }
  };

  return (
    <div className='form-container'>
      <h2>
        Account <span className='text-primary'>Register</span>
      </h2>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            className='form-control'
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            className='form-control'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            className='form-control'
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password2'>Confirm Password</label>
          <input
            type='password'
            name='password2'
            className='form-control'
            value={password2}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='submit'
            value='Register'
            className='btn btn-primary btn-block'
          />
        </div>
      </form>
    </div>
  );
};

export default Register;
