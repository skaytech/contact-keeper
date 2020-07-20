import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  const { current, addContact, updateContact, clearCurrent } = contactContext;

  useEffect(() => {
    if (current) {
      setContact(current);
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal',
      });
    }
  }, [contactContext, current]);

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal',
  });

  const { name, email, phone, type } = contact;

  const onChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (current) {
      updateContact(contact);
    } else {
      addContact(contact);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? 'Edit Contact' : 'Add Contact'}
      </h2>
      <input
        type='text'
        name='name'
        id='name'
        value={name}
        placeholder='Name'
        onChange={onChange}
      />
      <input
        type='email'
        name='email'
        id='email'
        value={email}
        placeholder='Email'
        onChange={onChange}
      />
      <input
        type='text'
        name='phone'
        id='phone'
        value={phone}
        placeholder='Phone'
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type='radio'
        name='type'
        value='personal'
        checked={type === 'personal'}
        onChange={onChange}
      />{' '}
      Personal
      <input
        type='radio'
        name='type'
        value='professional'
        checked={type === 'professional'}
        style={{ marginLeft: '0.5rem' }}
        onChange={onChange}
      />{' '}
      Professional
      <div>
        <input
          type='submit'
          value={current ? 'Update Contact' : 'Add Contact'}
          className='btn btn-primary btn-block'
        ></input>
      </div>
      {current && (
        <div>
          <button className='btn btn-block btn-danger' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
