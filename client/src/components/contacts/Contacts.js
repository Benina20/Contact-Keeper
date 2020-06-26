import React, { Fragment, useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';

export const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { Contacts } = contactContext;
  return (
    <Fragment>
      {Contacts.map((contact) => (
        <h3>{contact.name}</h3>
      ))}
    </Fragment>
  );
};

export default Contacts;
