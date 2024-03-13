import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ContactList from './ContactList/ContactList';
import SearchBox from './SearchBox/SearchBox';
import ContactForm from './ContactForm/ContactForm';
import Loader from './Loader/Loader';
import ErrorMessage from './ErrorMessage/ErrorMessage';

import { fetchContacts } from '../redux/contactsOps';
import {
  selectError,
  selectFilteredContacts,
  selectLoading,
} from '../redux/contactsSlice';

import './App.css';

function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectFilteredContacts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, []);

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      {contacts.length > 0 && <ContactList />}
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
    </div>
  );
}

export default App;
