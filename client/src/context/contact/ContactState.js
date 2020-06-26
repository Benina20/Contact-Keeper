import React, { userReducer } from 'react';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'jill johnson',
        email: 'jill@gmail.com',
        phone: '0398278882',
        type: 'professional',
      },
      {
        id: 2,
        name: 'sara putman',
        email: 'putman@gmail.com',
        phone: '0739992823',
        type: 'personal',
      },
      {
        id: 3,
        name: 'harry styles',
        email: 'berry@gmail.com',
        phone: '0213344556',
        type: 'personal',
      },
    ],
  };

  const [state] = userReducer(contactReducer, initialState);

  //add contact

  //delete contact

  //set current contact

  //clear current contact

  //update contact

  // filter contact

  //clear filter

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
