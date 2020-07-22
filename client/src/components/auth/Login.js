import React, { useState, useEffect, useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Login = (props) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { login, errors, isAuthenticated, clearErrors } = authContext;

  const { setAlert } = alertContext;

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (errors === 'Invalid Credentials') {
      setAlert(errors, 'danger');
      clearErrors();
    }
    //eslint-disable-next-line
  }, [errors, isAuthenticated, props.history]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please enter login details', 'danger');
    } else {
      login({
        email,
        password,
      });
    }
  };

  return (
    <div className='form-container'>
      <h2>
        Account <span className='text-primary'>Login</span>
      </h2>
      <form onSubmit={onSubmit}>
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
          <input
            type='submit'
            value='Login'
            className='btn btn-primary btn-block'
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
