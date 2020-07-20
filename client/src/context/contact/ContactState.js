import React, { useReducer } from 'react';
import { v5 as uuid } from 'uuid';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  SET_CURRENT,
  CLEAR_CURRENT,
  CLEAR_FILTER,
} from '../types';

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        type: 'personal',
        id: 1,
        name: 'Jojo',
        email: 'jojo@gmail.com',
        phone: '222-111-3333',
      },
      {
        type: 'personal',
        id: 2,
        name: 'Momo',
        email: 'Momo@gmail.com',
        phone: '101-208-9990',
      },
      {
        type: 'professional',
        id: 3,
        name: 'Koko',
        email: 'koko@gmail.com',
        phone: '999-888-7777',
      },
    ],
    current: null,
    filtered: null,
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  //Add Contact
  const addContact = (contact) => {
    contact.id = uuid;
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  //Delete Contact
  const deleteContact = (id) => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };

  //Set Current Contact
  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  //Clear Current Contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  //Update Contact
  const updateContact = (contact) => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };

  //Filter Contacts
  const filterContacts = (text) => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };

  //Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        addContact,
        updateContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        filterContacts,
        clearFilter,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
