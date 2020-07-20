import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: null,
    errors: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //Register User

  //Login User

  //Logout User

  //Load User

  //Clear Errors

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        errors: state.errors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
