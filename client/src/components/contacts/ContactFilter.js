import React, { useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);

  const { filterContacts, clearFilter } = contactContext;

  const onChange = (e) => {
    const filter = e.target.value;
    if (filter !== '') {
      filterContacts(filter);
    } else {
      clearFilter();
    }
  };

  return (
    <div>
      <input
        type='text'
        placeholder='Filter Contacts...'
        onChange={onChange}
      ></input>
    </div>
  );
};

export default ContactFilter;
