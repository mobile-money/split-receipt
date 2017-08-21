import Contacts from 'react-native-contacts';
import fakeContacts from '../screens/components/fakecontacts'

/**
 * ACTION TYPES
 */
const READ_CONTACTS = 'READ_CONTACTS';
const REMOVE_CONTACT = 'REMOVE_CONTACT';

/**
 * ACTION CREATORS
 */
const readContacts = contacts => ({ type: READ_CONTACTS, contacts });
const removeContact = contact => ({ type: REMOVE_CONTACT, contact });

/**
 * REDUCER
 */
export default function contactsReducer(myContacts = fakeContacts, action) {
  switch (action.type) {
    case READ_CONTACTS:
      return action.contacts;
    case REMOVE_CONTACT:
      return myContacts.filter(contact => contact.recordID !== action.contact.recordID);
    default:
      return myContacts;
  }
}

/**
 * THUNK CREATORS
 */
export const getContacts = function () {
  return function thunk(dispatch) {
    Contacts.getAllWithoutPhotos((err, contacts) => {
      if (err === 'denied') {
        console.error(err);
      } else {
        dispatch(readContacts(contacts));
      }
    });
  };
};

export const deleteContact = function (contact) {
  return function thunk(dispatch) {
    dispatch(removeContact(contact))
  };
};
